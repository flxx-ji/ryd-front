<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getAdminToken } from '$lib/utils/auth';

	const baseURL = import.meta.env.VITE_API_URL;
	const id = $page.params.id;

	// Champs de la moto
	let nom = '';
	let modele = '';
	let annee = '';
	let couleur = '';
	let prix = '';
	let image = '';
	let description = '';
	let autonomie = '';

	let error = '';
	let success = '';

	// 🔽 Charger la moto existante
	onMount(async () => {
		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (!res.ok) throw new Error(await res.text());
			const data = await res.json();

			// Remplissage des champs
			({ nom, modele, annee, couleur, prix, image, description, autonomie } = data);
		} catch (err) {
			error = err.message;
		}
	});

	// ✏️ Modifier la moto (PATCH)
	const modifierMoto = async () => {
		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ nom, modele, annee, couleur, prix, image, description, autonomie })
			});
			if (!res.ok) throw new Error(await res.text());
			success = '✅ Moto mise à jour !';
		} catch (err) {
			error = err.message;
		}
	};

	// 🗑️ Supprimer la moto (DELETE)
	const supprimerMoto = async () => {
		if (!confirm('⚠️ Tu confirmes la suppression de cette moto ?')) return;
		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) throw new Error(await res.text());
			success = '✅ Moto supprimée';
			setTimeout(() => goto('/admin/motos'), 1500); // Redirection douce
		} catch (err) {
			error = err.message;
		}
	};
</script>

<!-- 🧾 Formulaire de modification -->
<div class="container my-5">
	<h3 class="mb-4">✏️ Modifier une moto</h3>

	<!-- ✅ / ❌ Feedback -->
	{#if error}<p class="text-danger">{error}</p>{/if}
	{#if success}<p class="text-success">{success}</p>{/if}

	<form on:submit|preventDefault={modifierMoto} class="row g-3">

		<!-- 📛 Nom -->
		<div class="col-md-6">
			<label class="form-label">Nom</label>
			<input type="text" class="form-control" bind:value={nom} required />
		</div>

		<!-- 🏷️ Modèle -->
		<div class="col-md-6">
			<label class="form-label">Modèle</label>
			<input type="text" class="form-control" bind:value={modele} required />
		</div>

		<!-- 📆 Année -->
		<div class="col-md-4">
			<label class="form-label">Année</label>
			<input type="number" class="form-control" bind:value={annee} required />
		</div>

		<!-- 🎨 Couleur -->
		<div class="col-md-4">
			<label class="form-label">Couleur</label>
			<input type="text" class="form-control" bind:value={couleur} required />
		</div>

		<!-- 💶 Prix -->
		<div class="col-md-4">
			<label class="form-label">Prix (€)</label>
			<input type="number" class="form-control" bind:value={prix} required />
		</div>

		<!-- 🌐 Lien image -->
		<div class="col-md-6">
			<label class="form-label">Lien image</label>
			<input type="url" class="form-control" bind:value={image} />
		</div>

		<!-- 🔋 Autonomie -->
		<div class="col-md-6">
			<label class="form-label">Autonomie (km)</label>
			<input type="text" class="form-control" bind:value={autonomie} />
		</div>

		<!-- 📝 Description -->
		<div class="col-12">
			<label class="form-label">Description</label>
			<textarea rows="4" class="form-control" bind:value={description}></textarea>
		</div>

		<!-- 🔘 Boutons -->
		<div class="col-12 mt-4">
			<button type="submit" class="btn btn-primary me-3">💾 Sauvegarder</button>
			<button type="button" class="btn btn-danger" on:click={supprimerMoto}>🗑️ Supprimer</button>
			<a href="/admin/motos" class="btn btn-secondary ms-3">⬅️ Retour</a>
		</div>
	</form>
</div>
