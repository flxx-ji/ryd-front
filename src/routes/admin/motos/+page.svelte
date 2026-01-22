<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { adminToken } from '../../../stores/auth';
  import { goto } from '$app/navigation';

  let motos = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    const token = get(adminToken);

    // 🔒 Sécurité : pas de token → login
    if (!token) {
      goto('/admin/login');
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/admin/motos`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // 🔒 Token invalide ou expiré
      if (res.status === 401) {
        adminToken.set(null);
        goto('/admin/login');
        return;
      }

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
        {moto.nom} – {moto.tarifs.unJour}€/jour
        <a href={`/admin/motos/${moto._id}`}>✏️</a>
      </li>
    {/each}
  </ul>
{/if}

<style>
  .error {
    color: crimson;
    margin-top: 20px;
  }
</style>
