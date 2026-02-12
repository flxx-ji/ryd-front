<script>
  import { onMount } from 'svelte';

  const API_URL = import.meta.env.VITE_PUBLIC_API_URL2;

  let reservations = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/reservations`, {
        credentials: 'include'
      });

      if (!res.ok) throw new Error("Impossible de charger");

      reservations = await res.json();

    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });

  async function updateStatus(id, statut) {
    try {
      const res = await fetch(
        `${API_URL}/api/admin/reservations/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ statut })
        }
      );

      if (!res.ok) throw new Error();

      reservations = reservations.map(r =>
        r._id === id ? { ...r, statut } : r
      );

    } catch {
      alert("Erreur mise à jour statut");
    }
  }

  async function deleteReservation(id) {
    if (!confirm("Supprimer cette réservation ?")) return;

    try {
      const res = await fetch(
        `${API_URL}/api/admin/reservations/${id}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      );

      if (!res.ok) throw new Error();

      reservations = reservations.filter(r => r._id !== id);

    } catch {
      alert("Erreur suppression");
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }
</script>

<h1 class="title">Gestion des réservations</h1>

{#if loading}
  <p class="info">Chargement…</p>

{:else if error}
  <p class="error">{error}</p>

{:else}

  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Client</th>
          <th>Moto</th>
          <th>Dates</th>
          <th>Prix</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {#each reservations as r}
          <tr>
            <td>
              {r.email}
              <br />
              <small>{r.telephone}</small>
            </td>

            <td>{r.nomMoto}</td>

            <td>
              {formatDate(r.dateDebut)}
              →
              {formatDate(r.dateFin)}
            </td>

            <td class="price">{r.prixTotal} €</td>

            <td>
              <span class="badge {r.statut}">
                {r.statut}
              </span>
            </td>

            <td class="actions">
              {#if r.statut === 'en attente'}
                <button class="confirm"
                  on:click={() => updateStatus(r._id, 'confirmée')}>
                  ✔
                </button>
              {/if}

              {#if r.statut !== 'annulée'}
                <button class="cancel"
                  on:click={() => updateStatus(r._id, 'annulée')}>
                  ✖
                </button>
              {/if}

              <button class="delete"
                on:click={() => deleteReservation(r._id)}>
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
    margin-bottom: 24px;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(212,175,55,0.15);
  }

  th {
    text-align: left;
    padding: 14px;
    background: rgba(0,0,0,0.4);
    color: #f5c542;
    font-size: 14px;
  }

  td {
    padding: 14px;
    border-top: 1px solid rgba(255,255,255,0.06);
    color: white;
  }

  tr:hover {
    background: rgba(255,255,255,0.05);
  }

  .price {
    font-weight: bold;
    color: #f5c542;
  }

  .badge {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
  }

  .badge.en\ attente {
    background: #8a6d1a;
    color: white;
  }

  .badge.confirmée {
    background: #1f7a3f;
    color: white;
  }

  .badge.annulée {
    background: #7a1f1f;
    color: white;
  }

  .actions button {
    margin-right: 6px;
    border: none;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 6px;
  }

  .confirm {
    background: #2ecc71;
  }

  .cancel {
    background: #e67e22;
  }

  .delete {
    background: crimson;
    color: white;
  }

  .info { color: #ccc; }
  .error { color: crimson; }
</style>
