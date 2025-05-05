<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let client = null;
	let loading = true;
	let error = '';

	const id = $page.params.id;
	const token = localStorage.getItem('token');

	// ✅ Charger les infos du client lors du montage
	onMount(async () => {
		try {
			const res = await fetch(`http://localhost:5001/api/admin/clients/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (!res.ok) throw new Error("Erreur lors du chargement du client");
			client = await res.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	// ✅ Fonction de mise à jour
	async function updateClient() {
		try {
			const res = await fetch(`http://localhost:5001/api/admin/clients/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(client)
			});

			if (!res.ok) throw new Error("Échec de la mise à jour");
			alert("✅ Client mis à jour avec succès !");
		} catch (err) {
			error = err.message;
		}
	}

	// ✅ Fonction de suppression
	async function supprimerClient() {
		const confirmation = confirm("❗ Es-tu sûr de vouloir supprimer ce client ?");
		if (!confirmation) return;

		try {
			const res = await fetch(`http://localhost:5001/api/admin/clients/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (!res.ok) throw new Error("Erreur lors de la suppression");
			alert("🗑️ Client supprimé avec succès !");
			goto('/admin/clients');
		} catch (err) {
			error = err.message;
		}
	}
</script>

{#if loading}
	<p>⏳ Chargement...</p>
{:else if error}
	<p class="text-danger">❌ {error}</p>
{:else if client}
	<h1 class="mb-4">👤 Modifier le client</h1>

	<form on:submit|preventDefault={updateClient} class="mb-4">
		<div class="mb-3">
			<label class="form-label" for="nom">Nom</label>
			<input id ="nom" class="form-control" bind:value={client.nom} required />
		</div>
		<div class="mb-3">
			<label class="form-label" for="prenom">Prénom</label>
			<input id ="prenom" class="form-control" bind:value={client.prenom} required />
		</div>
		<div class="mb-3">
			<label class="form-label" for="email">Email</label>
			<input id ="email" type="email" class="form-control" bind:value={client.email} required />
		</div>
		<div class="mb-3">
			<label class="form-label" for="telephone">Téléphone</label>
			<input id ="telephone" class="form-control" bind:value={client.telephone} required />
		</div>
		<div class="mb-3">
			<label class="form-label" for="permis">Permis</label>
			<input id ="permis" class="form-control" bind:value={client.permis} required />
		</div>

		<button type="submit" class="btn btn-primary">💾 Enregistrer</button>
	</form>

	<!-- 🔴 Bouton de suppression -->
	<button type="button" class="btn btn-danger" on:click={supprimerClient}>
		🗑️ Supprimer ce client
	</button>
{/if}
