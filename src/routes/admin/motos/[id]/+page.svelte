<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { getAdminToken } from '$lib/utils/auth';
  
    let moto = null;
    let loading = true;
    let error = '';
    let success = '';
  
    // ✅ Textareas pour objets complexes
    let caracteristiquesTexte = '';
    let equipementsTexte = '';
  
    const id = $page.params.id;
  const baseURL = 'https://ryd-backend2-iryz.onrender.com'; // 🌍 PROD
	// const baseURL = 'http://localhost:5001'; // 🖥️ LOCAL
    
    // 📥 Récupérer les données de la moto
    onMount(async () => {
      try {
        const token = getAdminToken();
        const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        if (!res.ok) throw new Error('Erreur lors du chargement de la moto');
  
        moto = await res.json();
  
        // ✏️ Préparation des champs textarea
        caracteristiquesTexte = JSON.stringify(moto.caracteristiques, null, 2);
        equipementsTexte = JSON.stringify(moto.equipements, null, 2);
      } catch (err) {
        error = err.message;
      } finally {
        loading = false;
      }
    });
  
    // 🔄 Enregistrer la modification
    async function updateMoto() {
      try {
        // 🧠 Mise à jour des champs JSON
        moto.caracteristiques = JSON.parse(caracteristiquesTexte);
        moto.equipements = JSON.parse(equipementsTexte);
  
        const token = localStorage.getItem('token');
        const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(moto)
        });
  
        if (!res.ok) throw new Error('Erreur lors de la mise à jour');
        success = '✅ Modifications enregistrées';
      } catch (err) {
        error = err.message;
      }
    }
  </script>
  
  {#if loading}
    <p>⏳ Chargement des données...</p>
  {:else if error}
    <p class="text-danger">❌ {error}</p>
  {:else if moto}
    <div class="container my-4">
      <form on:submit|preventDefault={updateMoto} class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Nom</label>
          <input class="form-control" bind:value={moto.nom} />
        </div>
        <div class="col-md-6">
          <label class="form-label">Modèle</label>
          <input class="form-control" bind:value={moto.modele} />
        </div>
        <div class="col-md-4">
          <label class="form-label">Année</label>
          <input type="number" class="form-control" bind:value={moto.annee} />
        </div>
        <div class="col-md-4">
          <label class="form-label">Couleur</label>
          <input class="form-control" bind:value={moto.couleur} />
        </div>
        <div class="col-md-4">
          <label class="form-label">Disponible</label>
          <select class="form-select" bind:value={moto.disponible}>
            <option value={true}>Oui</option>
            <option value={false}>Non</option>
          </select>
        </div>
  
        <!-- Tarifs -->
        <h5>Tarifs</h5>
        <div class="col-md-3">
          <label class="form-label">1 jour (€)</label>
          <input type="number" class="form-control" bind:value={moto.tarifs.unJour} />
        </div>
        <div class="col-md-3">
          <label class="form-label">3 jours (€)</label>
          <input type="number" class="form-control" bind:value={moto.tarifs.troisJours} />
        </div>
        <div class="col-md-3">
          <label class="form-label">4–5 jours (€)</label>
          <input type="number" class="form-control" bind:value={moto.tarifs.quatreCinqJours} />
        </div>
        <div class="col-md-3">
          <label class="form-label">1 semaine (€)</label>
          <input type="number" class="form-control" bind:value={moto.tarifs.uneSemaine} />
        </div>
  
        <!-- Caractéristiques -->
        <div class="col-12">
          <label class="form-label mt-3">Caractéristiques (JSON)</label>
          <textarea bind:value={caracteristiquesTexte} class="form-control" rows="4"></textarea>
        </div>
  
        <!-- Équipements -->
        <div class="col-12">
          <label class="form-label mt-3">Équipements (JSON)</label>
          <textarea bind:value={equipementsTexte} class="form-control" rows="3"></textarea>
        </div>
  
        <div class="col-12">
          <button type="submit" class="btn btn-primary mt-3">💾 Enregistrer les modifications</button>
          <a on:click={() => goto('/admin/motos')} class="btn btn-secondary mt-3 ms-2">↩️ Annuler</a>
        </div>
  
        {#if success}
          <p class="text-success mt-3">{success}</p>


          <!-- Affichage des caractéristiques enregistrées -->
<!-- Affichage des caractéristiques enregistrées -->
<div class="col-12 mt-4">
    <h5>🔍 Aperçu des caractéristiques enregistrées</h5>
    <ul class="list-group">
      {#each Object.entries(moto.caracteristiques || {}) as [cle, valeur]}
        <li class="list-group-item">{cle} : {valeur}</li>
      {/each}
    </ul>
  </div>
  
  
        {/if}
      </form>
    </div>
  {/if}
  