<script>
  import { onMount } from 'svelte';

  let motos = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL2}/api/admin/motos`,
        {
          credentials: 'include' // 🍪 cookie adminToken
        }
      );

      if (!res.ok) {
        throw new Error('Impossible de charger les motos');
      }

      motos = await res.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });
</script>

<h1>Motos</h1>

<a href="/admin/motos/new">➕ Ajouter une moto</a>

{#if loading}
  <p>Chargement des motos…</p>
{:else if error}
  <p class="error">{error}</p>
{:else}
  <ul>
    {#each motos as moto}
      <li>
        <strong>{moto.nom}</strong> – {moto.tarifs.unJour}€/jour
        <a href={`/admin/motos/${moto._id}`}>✏️</a>
      </li>
    {/each}
  </ul>
{/if}

<style>
  h1 {
    color: #f5c542;
    margin-bottom: 16px;
  }

  a {
    color: #f5c542;
    text-decoration: none;
    margin-left: 8px;
  }

  .error {
    color: crimson;
    margin-top: 20px;
  }
</style>
