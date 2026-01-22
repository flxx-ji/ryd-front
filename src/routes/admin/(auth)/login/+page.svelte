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
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      // 🔥 reload total pour que le server lise le cookie
      window.location.href = '/admin';

    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>
