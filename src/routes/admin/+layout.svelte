<script>
  async function logout() {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include'
    });

    window.location.href = '/admin/login';
  }
</script>


<div class="admin-layout">
  <aside class="sidebar">
    <h2>Admin</h2>

    <nav>
      <a href="/admin">Dashboard</a>
      <a href="/admin/motos">Motos</a>
    </nav>

    <button on:click={logout}>Déconnexion</button>
  </aside>

  <main class="content">
    <slot />
  </main>
</div>
