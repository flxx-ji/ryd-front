<script>
  import { adminToken } from '../../stores/auth';
  import { goto } from '$app/navigation';

  $: if (!$adminToken) {
    goto('/admin/login');
  }
</script>

<div class="admin-layout">
  <aside>
    <h2>Admin</h2>
    <nav>
      <a href="/admin">Dashboard</a>
      <a href="/admin/motos">Motos</a>
      <a href="/admin/clients">Clients</a>
      <a href="/admin/reservations">Réservations</a>
    </nav>
  </aside>

  <main>
    <slot />
  </main>
</div>

<style>
  .admin-layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    min-height: 100vh;
    background: #0a0a0a;
    color: white;
  }

  aside {
    border-right: 1px solid #222;
    padding: 20px;
  }

  nav a {
    display: block;
    margin: 10px 0;
    color: #d4af37;
    text-decoration: none;
  }
</style>
