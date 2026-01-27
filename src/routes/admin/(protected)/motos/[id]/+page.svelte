<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const API_URL = import.meta.env.VITE_PUBLIC_API_URL2;

  let loading = true;
  let saving = false;
  let uploading = false;
  let error = null;

  let imageFile = null;

  let moto = {
    nom: '',
    marque: '',
    modele: '',
    annee: '',
    couleur: '',
    tarifJour: '',
    cylindree: '',
    moteur: '',
    transmission: '',
    image: null // { url, public_id }
  };

  // 🔹 Chargement moto
  onMount(async () => {
    const id = $page.params.id;

    try {
      const res = await fetch(`${API_URL}/api/admin/motos/${id}`, {
        credentials: 'include'
      });

      if (!res.ok) throw new Error('Impossible de charger la moto');

      const data = await res.json();

      moto = {
        nom: data.nom,
        marque: data.marque,
        modele: data.modele,
        annee: data.annee,
        couleur: data.couleur,
        tarifJour: data.tarifs?.unJour ?? '',
        cylindree: data.caracteristiques?.cylindree ?? '',
        moteur: data.caracteristiques?.moteur ?? '',
        transmission: data.caracteristiques?.transmission ?? '',
        image: data.image
          ? {
              url: data.image.url,
              public_id: data.image.public_id
            }
          : null
      };

    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  });

  // 🔹 Upload image Cloudinary
  async function uploadImage() {
    if (!imageFile) return;

    uploading = true;

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const res = await fetch(`${API_URL}/api/admin/image`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (!res.ok) throw new Error('Erreur upload image');

      const data = await res.json();

      moto.image = {
        url: data.secure_url,
        public_id: data.public_id
      };

    } catch (e) {
      error = e.message;
    } finally {
      uploading = false;
    }
  }

  // 🔹 Save moto
  async function submit() {
    error = null;
    saving = true;

    try {
      // 1️⃣ upload image si nouvelle
      if (imageFile) {
        await uploadImage();
      }

      // 2️⃣ update moto
      const res = await fetch(
        `${API_URL}/api/admin/motos/${$page.params.id}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nom: moto.nom,
            marque: moto.marque,
            modele: moto.modele,
            annee: Number(moto.annee),
            couleur: moto.couleur,
            image: moto.image,
            tarifs: {
              unJour: Number(moto.tarifJour)
            },
            caracteristiques: {
              cylindree: moto.cylindree,
              moteur: moto.moteur,
              transmission: moto.transmission
            }
          })
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Erreur mise à jour');
      }

      goto('/admin/motos');

    } catch (e) {
      error = e.message;
    } finally {
      saving = false;
    }
  }

  // 🔹 Delete moto
  async function deleteMoto() {
    if (!confirm('Supprimer définitivement cette moto ?')) return;

    try {
      const res = await fetch(
        `${API_URL}/api/admin/motos/${$page.params.id}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      );

      if (!res.ok) throw new Error('Erreur suppression moto');

      goto('/admin/motos');
    } catch (e) {
      error = e.message;
    }
  }
</script>

{#if loading}
  <p>Chargement…</p>
{:else}

<h1>Modifier la moto</h1>

<form on:submit|preventDefault={submit} class="form">

  {#if moto.image?.url}
    <img src={moto.image.url} alt={moto.nom} class="preview" />
  {/if}

  <input
    type="file"
    accept="image/*"
    on:change={(e) => imageFile = e.target.files[0]}
  />

  {#if uploading}
    <p class="info">Upload image…</p>
  {/if}

  <input placeholder="Nom" bind:value={moto.nom} required />
  <input placeholder="Marque" bind:value={moto.marque} required />
  <input placeholder="Modèle" bind:value={moto.modele} required />
  <input type="number" placeholder="Année" bind:value={moto.annee} required />
  <input placeholder="Couleur" bind:value={moto.couleur} required />

  <input
    type="number"
    placeholder="Tarif 1 jour (€)"
    bind:value={moto.tarifJour}
    required
  />

  <hr />

  <input placeholder="Cylindrée" bind:value={moto.cylindree} />
  <input placeholder="Moteur" bind:value={moto.moteur} />
  <input placeholder="Transmission" bind:value={moto.transmission} />

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <button disabled={saving || uploading}>
    {saving ? 'Sauvegarde…' : 'Enregistrer'}
  </button>

  <button type="button" class="danger" on:click={deleteMoto}>
    Supprimer la moto
  </button>

</form>
{/if}

<style>
  h1 {
    color: #f5c542;
    margin-bottom: 24px;
    text-align: center;
  }

  .form {
    max-width: 440px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  input {
    padding: 10px;
    font-size: 1rem;
  }

  .preview {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid rgba(212,175,55,0.3);
  }

  hr {
    margin: 16px 0;
    opacity: 0.3;
  }

  button {
    padding: 12px;
    font-weight: bold;
    cursor: pointer;
  }

  .error {
    color: crimson;
    text-align: center;
  }

  .info {
    color: #f5c542;
    font-size: 0.9rem;
    text-align: center;
  }

  .danger {
    background: transparent;
    border: 1px solid crimson;
    color: crimson;
    padding: 10px;
    font-weight: bold;
    cursor: pointer;
  }

  .danger:hover {
    background: crimson;
    color: white;
  }
</style>
