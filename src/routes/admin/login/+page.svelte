<script>
   


  let email = '';
  let password = '';
  let error = '';
  let loading = false;

  async function login() {
  error = '';
  loading = true;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_PUBLIC_API_URL2}/api/admin/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Erreur de connexion');
    }

    // reload total → cookie lu par le serveur
    window.location.href = '/admin';

  } catch (err) {
    error = err.message;
  } finally {
    loading = false;
  }
}

</script>

<h1>Admin – Connexion</h1>

<form on:submit|preventDefault={login}>
  <input
    type="email"
    placeholder="Email admin"
    bind:value={email}
    required
  />

  <input
    type="password"
    placeholder="Mot de passe"
    bind:value={password}
    required
  />

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <button disabled={loading}>
    {loading ? 'Connexion…' : 'Se connecter'}
  </button>
</form>

<style>
  form {
    max-width: 360px;
    margin: 80px auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  input {
    padding: 10px;
    font-size: 1rem;
  }

  button {
    padding: 10px;
    font-weight: 700;
  }

  .error {
    color: crimson;
  }
</style>
