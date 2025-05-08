<script lang="ts">
	// 🧠 Import de SvelteKit
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// 🔐 Gestion du token admin centralisé
	import { getAdminToken } from '$lib/utils/auth';

	let moto = null;
	let error = '';
	let loading = true;

	// Champs modifiables (exemple simplifié)
	let nom = '';
	let couleur = '';
	let disponible = true;

	// 🆔 ID extrait de l’URL
	const id = $page.params.id;

	// ✅ Charger les données de la moto à éditer
	onMount(async () => {
		try {
			const token = getAdminToken(); // 📥 Récupération du token
			const res = await fetch(`http://localhost:5001/api/admin/motos/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) throw new Error('Erreur lors du chargement');

			moto = await res.json();

			// 📥 Pré-remplir les champs
			nom = moto.nom;
			couleur = moto.couleur;
			disponible = moto.disponible;
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	// ✅ Enregistrer les modifications
	const updateMoto = async () => {
		try {
			const token = getAdminToken();
			const res = await fetch(`http://localhost:5001/api/admin/motos/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ nom, couleur, disponible })
			});
			if (!res.ok) throw new Error("Échec de la mise à jour");
			goto('/admin/motos');
		} catch (err) {
			error = err.message;
		}
	};
</script>

<!-- 💻 Affichage -->
{#if loading}
	<p>Chargement...</p>
{:else if error}
	<p class="text-danger">❌ {error}</p>
{:else}
	<div class="container">
		<h2>✏️ Modifier la moto</h2>

		<form on:submit|preventDefault={updateMoto}>
			<div class="mb-3">
				<label class="form-label">Nom</label>
				<input class="form-control" bind:value={nom} />
			</div>

			<div class="mb-3">
				<label class="form-label">Couleur</label>
				<input class="form-control" bind:value={couleur} />
			</div>

			<div class="mb-3">
				<label class="form-label">Disponible</label>
				<select class="form-select" bind:value={disponible}>
					<option value={true}>Oui</option>
					<option value={false}>Non</option>
				</select>
			</div>

			<button class="btn btn-primary" type="submit">💾 Enregistrer</button>
		</form>
	</div>
{/if}
