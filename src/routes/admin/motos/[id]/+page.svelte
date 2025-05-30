<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getAdminToken } from '$lib/utils/auth';

	let moto: any = {};
	let loading = true;
	let error = '';

	const id = $page.params.id;

	// 🟢 Récupère les infos de la moto au chargement de la page
	onMount(async () => {
		try {
			const token = getAdminToken();
			const res = await fetch(`https://ryd-backend2-iryz.onrender.com/api/admin/motos/${id}`, {
				headers: { Authorization: `Bearer ${token}` }
			});

			if (!res.ok) throw new Error('Erreur lors du chargement de la moto');
			moto = await res.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	// ✏️ Mise à jour partielle avec PATCH (plus souple que PUT)
	async function updateMoto() {
		try {
			const token = getAdminToken();
			const res = await fetch(`https://ryd-backend2-iryz.onrender.com/api/admin/motos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(moto)
			});

			if (!res.ok) throw new Error("Erreur lors de la mise à jour");
			alert("✅ Moto mise à jour avec succès !");
			goto('/admin/motos');
		} catch (err) {
			error = err.message;
		}
	}

	// 🗑️ Supprime la moto actuelle
	async function supprimerMoto() {
		if (!confirm('❗ Supprimer cette moto ?')) return;
		try {
			const token = getAdminToken();
			const res = await fetch(`https://ryd-backend2-iryz.onrender.com/api/admin/motos/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` }
			});

			if (!res.ok) throw new Error("Erreur lors de la suppression");
			alert("🗑️ Moto supprimée avec succès");
			goto('/admin/motos');
		} catch (err) {
			error = err.message;
		}
	}
</script>

{#if loading}
	<p>Chargement...</p>
{:else if error}
	<p class="text-danger">❌ {error}</p>
{:else}
	<div class="container mt-4">
		<h2 class="mb-4">✏️ Modifier la moto</h2>
		<form on:submit|preventDefault={updateMoto} class="row g-3">
			<div class="col-md-6">
				<label class="form-label">Nom</label>
				<input bind:value={moto.nom} class="form-control" type="text" required />
			</div>
			<div class="col-md-6">
				<label class="form-label">Marque</label>
				<input bind:value={moto.marque} class="form-control" type="text" />
			</div>
			<div class="col-md-4">
				<label class="form-label">Prix par jour</label>
				<input bind:value={moto.prix} class="form-control" type="number" />
			</div>
			<div class="col-md-4">
				<label class="form-label">Image (URL)</label>
				<input bind:value={moto.image} class="form-control" type="text" />
			</div>
			<div class="col-12">
				<label class="form-label">Description</label>
				<textarea bind:value={moto.description} class="form-control"></textarea>
			</div>

			<div class="col-12 mt-3">
				<button type="submit" class="btn btn-primary me-2">💾 Enregistrer</button>
				<button on:click={supprimerMoto} type="button" class="btn btn-danger">🗑️ Supprimer</button>
			</div>
		</form>
	</div>
{/if}
