<script>
  import { onMount } from 'svelte';

  const API_URL = import.meta.env.VITE_PUBLIC_API_URL2;

  let motos = [];
  let reservations = [];
  let clients = [];

  let loading = true;
  let error = '';

  onMount(async () => {
    try {
      const [mRes, rRes, cRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/motos`, { credentials: 'include' }),
        fetch(`${API_URL}/api/admin/reservations`, { credentials: 'include' }),
        fetch(`${API_URL}/api/admin/clients`, { credentials: 'include' })
      ]);

      if (!mRes.ok || !rRes.ok || !cRes.ok) {
        throw new Error('Erreur chargement dashboard');
      }

      motos = await mRes.json();
      reservations = await rRes.json();
      clients = await cRes.json();

    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  });

  $: totalMotos = motos.length;
  $: totalReservations = reservations.length;
  $: totalClients = clients.length;
</script>

<h1 class="title">Dashboard Admin</h1>

{#if loading}
  <p class="info">Chargement…</p>
{:else if error}
  <p class="error">{error}</p>
{:else}
  <div class="cards">
    <div class="card">
      <h2>🏍️ Motos</h2>
      <p>{totalMotos}</p>
    </div>

    <div class="card">
      <h2>📅 Réservations</h2>
      <p>{totalReservations}</p>
    </div>

    <div class="card">
      <h2>👤 Clients</h2>
      <p>{totalClients}</p>
    </div>
  </div>

  <p class="welcome">
    Bienvenue dans l’interface d’administration.
  </p>
{/if}

<style>
  .title {
    color: #f5c542;
    font-size: 34px;
    margin-bottom: 32px;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  .card {
    background: #0f0f0f;
    border: 1px solid #333;
    border-radius: 14px;
    padding: 20px;
  }

  .card h2 {
    font-size: 18px;
    margin-bottom: 8px;
    color: #f5c542;
  }

  .card p {
    font-size: 36px;
    font-weight: bold;
    color: white;
  }

  .welcome {
    color: #aaa;
    font-size: 14px;
  }

  .info {
    color: #ccc;
  }

  .error {
    color: red;
  }
</style>
