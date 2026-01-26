<script>
  import { goto } from '$app/navigation';

  let nom = '';
  let marque = '';
  let unJour = '';

  let loading = false;
  let error = null;

  async function submit() {
    loading = true;
    error = null;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL2}/api/admin/motos`,
        {
          method: 'POST',
          credentials: 'include', // 🍪 cookie adminToken
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nom,
            marque,
            tarifs: {
              unJour: Number(unJour)
            }
          })
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Erreur création moto');
      }

      // ✅ succès → retour liste
      goto('/admin/motos');
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<h1>Ajouter une moto</h1>

<form on:submit|preventDefault={submit}>
  <label>
    Nom
    <input type="text" bind:value={nom} required />
  </label>

  <label>
    Marque
    <input type="text" bind:value={marque} required />
  </label>

  <label>
    Tarif / jour (€)
    <input type="number" bind:value={unJour} required />
  </label>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <button disabled={loading}>
    {loading ? 'Création...' : 'Créer la moto'}
  </button>
</form>

<style>
  h1 {
    color: #f5c542;
    margin-bottom: 20px;
  }

  form {
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  label {
    display: flex;
    flex-direction: column;
    color: white;
  }

  input {
    padding: 8px;
    font-size: 14px;
  }

  button {
    padding: 10px;
    background: #f5c542;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }

  .error {
    color: crimson;
  }
</style>
