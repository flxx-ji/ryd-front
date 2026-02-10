<script>
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
    <div class="brand">
      <h2>Admin</h2>
      <span class="subtitle">Ride Your Dream</span>
    </div>

    <nav class="nav">
      <a href="/admin">Dashboard</a>
      <a href="/admin/motos">Motos</a>
      <a href="/admin/clients">Clients</a>
      <a href="/admin/reservations">Réservations</a>
    </nav>

    <button class="logout" on:click={logout}>
      Déconnexion
    </button>
  </aside>

  <main class="content">
    <slot />
  </main>
</div>

<style>
  .admin-layout {
    display: flex;
    min-height: 100vh;
    background: #0b0b0b;
    color: #fff;
  }

  .sidebar {
    width: 240px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, #111, #000);
    border-right: 1px solid rgba(212,175,55,0.15);
  }

  .brand {
    margin-bottom: 32px;
  }

  .brand h2 {
    margin: 0;
    color: #D4AF37;
    font-weight: 900;
  }

  .subtitle {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.6);
  }

  .nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
  }

  .nav a {
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    font-weight: 600;
    padding: 8px 10px;
    border-radius: 8px;
  }

  .nav a:hover {
    background: rgba(212,175,55,0.15);
    color: #D4AF37;
  }

  .logout {
    margin-top: auto;
    padding: 10px;
    background: transparent;
    border: 1px solid rgba(255,0,0,0.4);
    color: rgba(255,255,255,0.8);
    border-radius: 8px;
    cursor: pointer;
    font-weight: 700;
  }

  .logout:hover {
    background: rgba(255,0,0,0.15);
    color: #fff;
  }

  .content {
    flex: 1;
    padding: 32px;
  }
</style>
