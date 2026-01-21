<script>
  import { adminToken } from '../../stores/auth';
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';  

  let token;

  const unsubscribe = adminToken.subscribe(value => {
    token = value;
    if (!token) {
      goto('/admin/login');
    }
  });

  // nettoyage
  onDestroy(() => unsubscribe());
</script>

<h1>Dashboard</h1>

<ul>
  <li>✔ Motos en base</li>
  <li>✔ Réservations</li>
  <li>✔ Clients</li>
</ul>

<p>Bienvenue dans l’interface d’administration.</p>

<p>Connexion réussie.</p>
