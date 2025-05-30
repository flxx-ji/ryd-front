<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getAdminToken } from '$lib/utils/auth';

	let client = null;
	let loading = true;
	let error = '';

	const id = $page.params.id;

	// 📦 Chargement des infos à l’arrivée
	onMount(async () => {
		try {
			const token = getAdminToken();
			const res = await fetch(`https://ryd-backend2-production.up.railway.app/api/admin/clients/${id}`, {
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

	// 📝 Met à jour les infos du client
	async function updateClient() {
		try {
			const token = getAdminToken();
			const res = await fetch(`https://ryd-backend2-iryz.onrender.com/api/admin/clients/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(client)
			});
			if (!res.ok) throw new Error("Échec de la mise à jour");
			alert("✅ Client mis à jour !");
		} catch (err) {
			error = err.message;
		}
	}

	// 🗑️ Suppression directe
	async function supprimerClient() {
		if (!confirm("❗ Supprimer ce client ?")) return;
		try {
			const token = getAdminToken();
			const res = await fetch(`https://ryd-backend2-iryz.onrender.com/api/admin/clients/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) throw new Error("Erreur lors de la suppression");
			alert("🗑️ Client supprimé !");
			goto('/admin/clients');
		} catch (err) {
			error = err.message;
		}
	}
</script>

<!-- 🎨 UI Bootstrap -->
{#if loading}
	<div class="alert alert-info">Chargement...</div>
{:else if error}
	<div class="alert alert-danger">{error}</div>
{:else if client}
	<h2 class="mb-4">🛠️ Éditer le client</h2>
	<form on:submit|preventDefault={updateClient}>
		<div class="mb-3">
			<label class="form-label">Nom</label>
			<input type="text" class="form-control" bind:value={client.nom} />
		</div>
		<div class="mb-3">
			<label class="form-label">Prénom</label>
			<input type="text" class="form-control" bind:value={client.prenom} />
		</div>
		<div class="mb-3">
			<label class="form-label">Email</label>
			<input type="email" class="form-control" bind:value={client.email} />
		</div>
		<div class="mb-3">
			<label class="form-label">Téléphone</label>
			<input type="text" class="form-control" bind:value={client.telephone} />
		</div>
		<div class="mb-3">
			<label class="form-label">Permis</label>
			<input type="text" class="form-control" bind:value={client.permis} />
		</div>

		<div class="d-flex gap-2">
			<button type="submit" class="btn btn-success">💾 Enregistrer</button>
			<button type="button" class="btn btn-danger" on:click={supprimerClient}>🗑️ Supprimer</button>
		</div>
	</form>
{/if}
