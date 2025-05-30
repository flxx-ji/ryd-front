<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { getAdminToken } from '$lib/utils/auth';

  const baseURL = import.meta.env.VITE_API_URL;

  let id: string;
  let moto = null;
  let error = '';
  let imagePreview = '';
  let newImage: File | null = null;

  // ✅ Champs textarea pour objets complexes
  let equipementsTexte = '';
  let caracteristiquesTexte = '';

  // 🔁 Charger la moto
  $: id = $page.params.id;

  onMount(async () => {
    try {
      const token = getAdminToken();
      const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Erreur de chargement');
      moto = await res.json();
      imagePreview = moto.image;

      // Textareas JSON
      equipementsTexte = JSON.stringify(moto.equipements || [], null, 2);
      caracteristiquesTexte = JSON.stringify(moto.caracteristiques || {}, null, 2);
    } catch (err) {
      error = err.message;
    }
  });

  // ✅ PATCH infos moto
  async function updateMoto() {
    try {
      moto.equipements = JSON.parse(equipementsTexte);
      moto.caracteristiques = JSON.parse(caracteristiquesTexte);

      const token = getAdminToken();
      const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(moto)
      });
      if (!res.ok) throw new Error('Erreur lors de la mise à jour');
      alert('✅ Moto mise à jour');
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  }

  // ✅ PATCH image 
  async function updateImage() {
    if (!newImage) return;
    const formData = new FormData();
    formData.append('image', newImage);

    try {
      const token = getAdminToken();
      const res = await fetch(`${baseURL}/api/admin/motos/${id}/image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error('Erreur upload image');
      const updated = await res.json();
      imagePreview = updated.image;
      alert('✅ Image mise à jour');
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  }

  // 🗑️ DELETE
  async function deleteMoto() {
    if (!confirm("❗ Supprimer cette moto ?")) return;
    try {
      const token = getAdminToken();
      const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Suppression échouée');
      alert('🗑️ Moto supprimée');
      goto('/admin/motos');
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  }
</script>

{#if moto}
  <div class="container py-4">
    <h2 class="mb-4">✏️ Modifier la moto</h2>

    <!-- Aperçu de l'image -->
    {#if imagePreview}
      <img src={imagePreview} alt="Image moto" class="img-fluid mb-3" style="max-width: 300px;" />
    {/if}

    <div class="mb-3">
      <label class="form-label">Changer l'image</label>
      <input type="file" class="form-control" accept="image/*"
        on:change={(e) => { newImage = e.target.files[0]; updateImage(); }} />
    </div>

    <!-- Champs simples -->
    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Nom</label>
        <input class="form-control" bind:value={moto.nom} />
      </div>
      <div class="col-md-6">
        <label class="form-label">Modèle</label>
        <input class="form-control" bind:value={moto.modele} />
      </div>
      <div class="col-md-4">
        <label class="form-label">Marque</label>
        <input class="form-control" bind:value={moto.marque} />
      </div>
      <div class="col-md-4">
        <label class="form-label">Année</label>
        <input type="number" class="form-control" bind:value={moto.annee} />
      </div>
      <div class="col-md-4">
        <label class="form-label">Couleur</label>
        <input class="form-control" bind:value={moto.couleur} />
      </div>
      <div class="col-md-6">
        <label class="form-label">Disponible</label>
        <select class="form-select" bind:value={moto.disponible}>
          <option value={true}>Oui</option>
          <option value={false}>Non</option>
        </select>
      </div>
    </div>

    <!-- Tarifs -->
    <h5 class="mt-4">Tarifs</h5>
    <div class="row g-3">
      <div class="col-md-3">
        <label>1 jour</label>
        <input class="form-control" type="number" bind:value={moto.tarifs.unJour} />
      </div>
      <div class="col-md-3">
        <label>2-3 jours</label>
        <input class="form-control" bind:value={moto.tarifs.deuxTroisJours} />
      </div>
      <div class="col-md-3">
        <label>4-5 jours</label>
        <input class="form-control" bind:value={moto.tarifs.quatreCinqJours} />
      </div>
      <div class="col-md-3">
        <label>1 semaine</label>
        <input class="form-control" type="number" bind:value={moto.tarifs.uneSemaine} />
      </div>
    </div>

    <!-- Caractéristiques -->
    <div class="mt-4">
      <label class="form-label">Caractéristiques (JSON)</label>
      <textarea class="form-control" rows="4" bind:value={caracteristiquesTexte}></textarea>
    </div>

    <!-- Équipements -->
    <div class="mt-3">
      <label class="form-label">Équipements (JSON)</label>
      <textarea class="form-control" rows="3" bind:value={equipementsTexte}></textarea>
    </div>

    <!-- Boutons -->
    <div class="d-flex gap-2 mt-4">
      <button class="btn btn-success" on:click={updateMoto}>💾 Sauvegarder</button>
      <button class="btn btn-outline-danger ms-auto" on:click={deleteMoto}>🗑️ Supprimer</button>
    </div>
  </div>
{:else if error}
  <div class="alert alert-danger mt-4">❌ {error}</div>
{:else}
  <div class="text-center mt-5">⏳ Chargement...</div>
{/if}
