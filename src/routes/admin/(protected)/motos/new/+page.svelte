<script>
  import { goto } from '$app/navigation';

  const API_URL = import.meta.env.VITE_PUBLIC_API_URL2;

  let loading = false;
  let uploading = false;
  let error = null;

  let imageFile = null;
  let uploadedImage = null; // { url, public_id }

  let moto = {
    nom: '',
    marque: '',
    modele: '',
    annee: '',
    couleur: '',
    tarifJour: '',
    cylindree: '',
    moteur: '',
    transmission: ''
  };

  // 🔼 Upload image vers Cloudinary
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

      if (!res.ok) {
        throw new Error('Erreur upload image');
      }

      const data = await res.json();

      uploadedImage = {
        url: data.secure_url,
        public_id: data.public_id
      };

    } catch (e) {
      error = e.message;
    } finally {
      uploading = false;
    }
  }

  // ✅ Création moto
  async function submit() {
    error = null;
    loading = true;

    try {
      // 1️⃣ upload image si présente
      if (imageFile) {
        await uploadImage();
      }

      // 2️⃣ création moto
      const res = await fetch(`${API_URL}/api/admin/motos`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nom: moto.nom,
          marque: moto.marque,
          modele: moto.modele,
          annee: Number(moto.annee),
          couleur: moto.couleur,
          image: uploadedImage,
          tarifs: {
            unJour: Number(moto.tarifJour)
          },
          caracteristiques: {
            cylindree: moto.cylindree,
            moteur: moto.moteur,
            transmission: moto.transmission
          }
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Erreur création moto');
      }

      goto('/admin/motos');

    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
</script>

<h1>Ajouter une moto</h1>

<form on:submit|preventDefault={submit} class="form">

  <!-- IMAGE -->
  {#if uploadedImage}
    <img src={uploadedImage.url} alt="preview" class="preview" />
  {/if}

  <input
    type="file"
    accept="image/*"
    on:change={(e) => imageFile = e.target.files[0]}
  />

  {#if uploading}
    <p class="info">Upload image…</p>
  {/if}

  <!-- INFOS -->
  <input placeholder="Nom" bind:value={moto.nom} required />
  <input placeholder="Marque" bind:value={moto.marque} required />
  <input placeholder="Modèle" bind:value={moto.modele} required />
  <input type="number" placeholder="Année" bind:value={moto.annee} required />
  <input placeholder="Couleur" bind:value={moto.couleur} required />
  <input type="number" placeholder="Tarif 1 jour (€)" bind:value={moto.tarifJour} required />

  <hr />

  <input placeholder="Cylindrée" bind:value={moto.cylindree} />
  <input placeholder="Moteur" bind:value={moto.moteur} />
  <input placeholder="Transmission" bind:value={moto.transmission} />

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <button disabled={loading || uploading}>
    {loading ? 'Création…' : 'Créer la moto'}
  </button>
</form>

<style>
  h1 {
    color: #f5c542;
    text-align: center;
    margin-bottom: 24px;
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

  .info {
    color: #f5c542;
    text-align: center;
  }

  .error {
    color: crimson;
    text-align: center;
  }

  button {
    padding: 12px;
    font-weight: bold;
    cursor: pointer;
  }
</style>
