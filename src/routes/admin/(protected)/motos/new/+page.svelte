<script>
  import { goto } from '$app/navigation';

  const API_URL = import.meta.env.VITE_PUBLIC_API_URL2;

  let loading = false;
  let error = null;
  let success = false;

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

  async function submit() {
    error = null;
    loading = true;

    try {
      const res = await fetch(`${API_URL}/api/admin/motos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          nom: moto.nom,
          marque: moto.marque,
          modele: moto.modele,
          annee: Number(moto.annee),
          couleur: moto.couleur,
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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur création moto');
      }

      success = true;

      // redirection vers la liste
      setTimeout(() => {
        goto('/admin/motos');
      }, 800);

    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
</script>

<h1>Ajouter une moto</h1>

<form on:submit|preventDefault={submit} class="form">

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

  {#if success}
    <p class="success">Moto créée ✔</p>
  {/if}

  <button disabled={loading}>
    {loading ? 'Création…' : 'Créer la moto'}
  </button>
</form>

<style>
  h1 {
    color: #f5c542;
    margin-bottom: 24px;
  }

  .form {
    max-width: 420px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  input {
    padding: 10px;
    font-size: 1rem;
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
  }

  .success {
    color: #4caf50;
  }
</style>
