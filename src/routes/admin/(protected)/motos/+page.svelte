<script>
  import { onMount } from 'svelte';

  const API_URL = import.meta.env.VITE_PUBLIC_API_URL2;

  let motos = [];
  let loading = true;
  let error = null;

  // 🔄 Chargement des motos
  onMount(async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/motos`, {
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error('Impossible de charger les motos');
      }

      motos = await res.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });

  // 🔁 Toggle disponibilité
  async function toggleDispo(moto) {
    const previous = moto.disponible;
    moto.disponible = !previous; // optimistic UI

    try {
      const res = await fetch(
        `${API_URL}/api/admin/motos/${moto._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            disponible: moto.disponible
          })
        }
      );

      if (!res.ok) {
        throw new Error('Erreur serveur');
      }

    } catch (err) {
      moto.disponible = previous; // rollback
      alert('Impossible de modifier la disponibilité');
    }
  }


  async function deleteMoto(id) {
  if (!confirm('Supprimer définitivement cette moto ?')) return;

  try {
    const res = await fetch(
      `${API_URL}/api/admin/motos/${id}`,
      {
        method: 'DELETE',
        credentials: 'include'
      }
    );

    if (!res.ok) throw new Error();

    motos = motos.filter(m => m._id !== id);
  } catch {
    alert('Erreur suppression moto');
  }
}

</script>

<h1 class="title">Gestion des motos</h1>

<a class="add-btn" href="/admin/motos/new">➕ Ajouter une moto</a>

{#if loading}
  <p class="info">Chargement des motos…</p>

{:else if error}
  <p class="error">{error}</p>

{:else}
  <ul class="list">
    {#each motos as moto}
      <li class="row {moto.disponible ? '' : 'disabled'}">
        <div class="left">
          <strong>{moto.nom}</strong>
          <span class="price">{moto.tarifs.unJour}€ / jour</span>
        </div>

        <div class="right">
          <button
            class="toggle {moto.disponible ? 'on' : 'off'}"
            on:click={() => toggleDispo(moto)}
          >
            {moto.disponible ? '🟢 Disponible' : '🔴 Indispo'}
          </button>

          <button 
           class="delete"
           on:click={() => deleteMoto(moto._id)}
           >
  
</button>


          <a class="edit" href={`/admin/motos/${moto._id}`}>✏️</a>
        </div>
      </li>
    {/each}
  </ul>
{/if}

<style>
  .title {
    color: #f5c542;
    font-size: 28px;
    margin-bottom: 20px;
  }

  .add-btn {
    display: inline-block;
    margin-bottom: 20px;
    color: #f5c542;
    font-weight: bold;
    text-decoration: none;
  }

  .list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    margin-bottom: 10px;
    border-radius: 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(212,175,55,0.15);
    color: white;
  }

  .row.disabled {
    opacity: 0.45;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .price {
    font-size: 13px;
    color: #bbb;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .toggle {
    padding: 6px 12px;
    border-radius: 20px;
    border: 1px solid #444;
    background: #111;
    color: #ccc;
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
  }

  .toggle.on {
    background: #1f7a3f;
    border-color: #4caf50;
    color: white;
  }

  .toggle.off {
    background: #5a1d1d;
    border-color: #c0392b;
    color: white;
  }

  .edit {
    color: #f5c542;
    text-decoration: none;
    font-size: 18px;
  }

  .info {
    color: #ccc;
  }

  .error {
    color: crimson;
  }

  .delete {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: crimson;
}

</style>
