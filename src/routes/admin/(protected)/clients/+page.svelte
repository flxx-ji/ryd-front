<script>
  import { onMount } from 'svelte';

  const API_URL = import.meta.env.VITE_PUBLIC_API_URL2;

  let clients = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/clients`, {
        credentials: 'include'
      });

      if (!res.ok) throw new Error("Impossible de charger les clients");

      clients = await res.json();

    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });

  async function deleteClient(id) {
    if (!confirm("Supprimer ce client ?")) return;

    try {
      const res = await fetch(`${API_URL}/api/admin/clients/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!res.ok) throw new Error();

      clients = clients.filter(c => c._id !== id);

    } catch {
      alert("Erreur suppression client");
    }
  }
</script>

<h1 class="title">Gestion des clients</h1>

{#if loading}
  <p class="info">Chargement des clients…</p>

{:else if error}
  <p class="error">{error}</p>

{:else if clients.length === 0}
  <p class="info">Aucun client enregistré</p>

{:else}
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Permis</th>
          <th>Créé le</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {#each clients as client}
          <tr>
            <td>{client.prenom} {client.nom}</td>
            <td>{client.email}</td>
            <td>{client.telephone || '—'}</td>
            <td>
              <span class="badge">{client.permis}</span>
            </td>
            <td>
              {new Date(client.createdAt).toLocaleDateString()}
            </td>
            <td class="actions">
              <button
                class="delete"
                on:click={() => deleteClient(client._id)}
              >
                🗑
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<style>
  .title {
    color: #f5c542;
    font-size: 28px;
    margin-bottom: 25px;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(212,175,55,0.15);
    border-radius: 10px;
    overflow: hidden;
    color: white;
  }

  .table th,
  .table td {
    padding: 14px 16px;
    text-align: left;
  }

  .table thead {
    background: rgba(255,255,255,0.05);
  }

  .table th {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #bbb;
  }

  .table tbody tr {
    border-top: 1px solid rgba(255,255,255,0.05);
  }

  .table tbody tr:hover {
    background: rgba(255,255,255,0.05);
  }

  .badge {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    background: #1f7a3f;
    color: white;
  }

  .actions {
    display: flex;
    gap: 10px;
  }

  .delete {
    background: transparent;
    border: none;
    cursor: pointer;
    color: crimson;
    font-size: 16px;
  }

  .info {
    color: #ccc;
  }

  .error {
    color: crimson;
  }
</style>
