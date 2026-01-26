<script>
  import { goto } from '$app/navigation';

  const API_URL = import.meta.env.VITE_PUBLIC_API_URL2;

  async function logout() {
    try {
      await fetch(`${API_URL}/api/admin/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (e) {
      console.error(e);
    }

    window.location.href = '/admin/login';
  }
</script>

<div class="admin-layout">
  <aside class="sidebar">
    <h2>Admin</h2>

    <nav>
      <a href="/admin/motos">Motos</a>
    </nav>

    <button on:click={logout}>Déconnexion</button>
  </aside>

  <main class="content">
    <slot />
  </main>
</div>
