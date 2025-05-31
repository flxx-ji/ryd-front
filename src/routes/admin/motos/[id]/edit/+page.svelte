<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { getAdminToken } from '$lib/utils/auth';

  let moto: any = null;
  let error = '';
  let loading = true;
  let success = '';
  let imagePreview = '';
  let newImage: File | null = null;
  let equipementsTexte = '';

  const id = $page.params.id;
  const baseURL = import.meta.env.VITE_API_URL;

  // 🔄 Charger les données moto à l'ouverture
  onMount(async () => {
    try {
      const token = getAdminToken();
      const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Erreur chargement moto');
      moto = await res.json();
      imagePreview = moto.image;
      equipementsTexte = (moto.equipements || []).join(', ');
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });

  // 🔹 Sauvegarder toutes les modifications (PUT)
  async function sauvegarderTout() {
    try {
      const token = getAdminToken();
      moto.equipements = equipementsTexte.split(',').map(e => e.trim()).filter(Boolean);

      const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(moto)
      });
      if (!res.ok) throw new Error('Erreur sauvegarde');
      success = 'Modifications sauvegardées';
    } catch (err) {
      error = err.message;
    }
  }

  // 📸 Mise à jour de l'image séparée
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
      const data = await res.json();
      moto.image = data.image;
      imagePreview = data.image;
      success = 'Image mise à jour';
    } catch (err) {
      error = err.message;
    }
  }

  // 🚮 Supprimer la moto
  async function supprimerMoto() {
    if (!confirm('Confirmer la suppression ?')) return;
    try {
      const token = getAdminToken();
      const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Erreur suppression');
      goto('/admin/motos');
    } catch (err) {
      error = err.message;
    }
  }
</script>

{#if loading}
  <p class="text-center my-5">Chargement...</p>
{:else if error}
  <div class="alert alert-danger mt-4">❌ {error}</div>
{:else if moto}
  <div class="container py-5">
    <h2 class="mb-4">✏️ Modifier la moto</h2>

    <!-- Aperçu image -->
    {#if imagePreview}
      <img src={imagePreview} alt="Aperçu" class="img-fluid mb-3" style="max-width: 300px;" />
    {/if}

    <div class="mb-3">
      <label for="image" class="form-label">Changer l'image</label>
      <input type="file" id="image" class="form-control" accept="image/*"
        on:change={(e: Event) => {
          const target = e.target as HTMLInputElement;
          if (target.files?.length) {
            newImage = target.files[0];
            imagePreview = URL.createObjectURL(newImage);
          }
        }} />
      <button type="button" class="btn btn-outline-primary mt-2" on:click={updateImage}>📸 Mettre à jour l'image</button>
    </div>

    <form on:submit|preventDefault={sauvegarderTout} class="row g-3">
      <!-- Champs simples -->
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
      <h5 class="mt-4">Tarifs</h5>
      <div class="col-md-3">
        <label class="form-label">1 jour (€)</label>
        <input type="number" class="form-control" bind:value={moto.tarifs.unJour} />
      </div>
      <div class="col-md-3">
        <label class="form-label">2-3 jours</label>
        <input class="form-control" bind:value={moto.tarifs.deuxTroisJours} />
      </div>
      <div class="col-md-3">
        <label class="form-label">4-5 jours</label>
        <input class="form-control" bind:value={moto.tarifs.quatreCinqJours} />
      </div>
      <div class="col-md-3">
        <label class="form-label">1 semaine</label>
        <input type="number" class="form-control" bind:value={moto.tarifs.uneSemaine} />
      </div>

      <!-- Caractéristiques -->
      <h5 class="mt-4">Caractéristiques</h5>
      {#each Object.entries(moto.caracteristiques || {}) as [key, val] (key)}
        <div class="col-md-4">
          <label class="form-label text-capitalize">{key}</label>
          <input class="form-control" bind:value={moto.caracteristiques[key]} />
        </div>
      {/each}

      <!-- Équipements -->
      <div class="col-12">
        <label class="form-label">Équipements (séparés par virgule)</label>
        <textarea class="form-control" rows="3" bind:value={equipementsTexte}></textarea>
      </div>

      <!-- Actions -->
      <div class="col-12 d-flex justify-content-between mt-4">
        <button type="submit" class="btn btn-success">💾 Sauvegarder</button>
        <button type="button" class="btn btn-danger" on:click={supprimerMoto}>🗑️ Supprimer</button>
      </div>

      {#if success}
        <p class="text-success mt-3">✅ {success}</p>
      {/if}
    </form>
  </div>
{/if}
