<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAdminToken } from '$lib/utils/auth'; // ✅ récupération du token proprement

	let clients = [];
	let loading = true;
	let error = '';

	// ✅ Chargement automatique à l'ouverture de la page
	onMount(async () => {
		await chargerClients();
	});

	// 🔁 Fonction pour charger tous les clients depuis l’API
	async function chargerClients() {
		try {
			loading = true;
			const token = getAdminToken();
			const res = await fetch('https://ryd-backend2-iryz.onrender.com/api/admin/clients', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) throw new Error('Erreur lors du chargement');
			clients = await res.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	// 🗑️ Suppression avec confirmation
	async function supprimerClient(id: string) {
		if (!confirm('❗ Supprimer ce client ?')) return;
		try {
			const token = getAdminToken();
			const res = await fetch(`https://ryd-backend2-production.up.railway.app/api/admin/clients/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) throw new Error("Erreur lors de la suppression");
			await chargerClients();
		} catch (err) {
			alert('❌ Erreur : ' + err.message);
		}
	}

	// ✏️ Redirige vers la fiche du client pour édition
	function modifierClient(id: string) {
		goto(`/admin/clients/${id}`);
	}
</script>

<!-- 🎨 Bootstrap UI -->
{#if loading}
	<div class="alert alert-info">Chargement des clients...</div>
{:else if error}
	<div class="alert alert-danger">{error}</div>
{:else}
	<h1 class="mb-4">👥 Gestion des clients</h1>
	<table class="table table-bordered table-striped">
		<thead class="table-light">
			<tr>
				<th>Nom</th>
				<th>Prénom</th>
				<th>Email</th>
				<th>Téléphone</th>
				<th>Permis</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each clients as c}
				<tr>
					<td>{c.nom}</td>
					<td>{c.prenom}</td>
					<td>{c.email}</td>
					<td>{c.telephone}</td>
					<td>{c.permis}</td>
					<td>
						<button on:click={() => modifierClient(c._id)} class="btn btn-sm btn-primary me-2">Modifier</button>
						<button on:click={() => supprimerClient(c._id)} class="btn btn-sm btn-danger">Supprimer</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
