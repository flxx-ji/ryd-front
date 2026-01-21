<script>
  import { onMount } from 'svelte';

  let motos = [];

  onMount(async () => {
    const res = await fetch(
      `${import.meta.env.VITE_PUBLIC_API_URL}/api/admin/motos`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      }
    );
    motos = await res.json();
  });
</script>

<h1>Motos</h1>

<a href="/admin/motos/new">➕ Ajouter une moto</a>

<ul>
  {#each motos as moto}
    <li>
      {moto.nom} – {moto.tarifs.unJour}€/jour
      <a href={`/admin/motos/${moto._id}`}>✏️</a>
    </li>
  {/each}
</ul>
