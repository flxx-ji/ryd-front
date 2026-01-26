<script>
  let email = '';
  let password = '';
  let error = '';
  let loading = false;

  const API_URL = import.meta.env.VITE_PUBLIC_API_URL2;

  async function login() {
    error = '';
    loading = true;

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 🔑 indispensable
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      // 🔥 on laisse le serveur gérer la suite
      window.location.href = '/admin';

    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
</script>

<h1>LOGIN ADMIN</h1>

<form on:submit|preventDefault={login}>
  <input type="email" bind:value={email} required />
  <input type="password" bind:value={password} required />
  <button disabled={loading}>Connexion</button>
  {#if error}<p>{error}</p>{/if}
</form>
