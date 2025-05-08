<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// 🔐 Centralisation de l'accès au token
	import { getAdminToken } from '$lib/utils/auth';

	let clients = [];
	let loading = true;
	let error = '';

	// ✅ Chargement des clients dès le montage de la page
	onMount(async () => {
		await chargerClients();
	});

	// 🔄 Fonction de récupération des clients
	async function chargerClients() {
		try {
			loading = true;
			const token = getAdminToken(); // 💡 récupération du token proprement
			const res = await fetch('http://localhost:5001/api/admin/clients', {
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

	// 🗑️ Supprimer un client
	async function supprimerClient(id: string) {
		if (!confirm('❗ Supprimer ce client ?')) return;
		try {
			const token = getAdminToken();
			const res = await fetch(`http://localhost:5001/api/admin/clients/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) throw new Error("Échec de la suppression");
			await chargerClients();
		} catch (err) {
			alert('Erreur lors de la suppression : ' + err.message);
		}
	}

	// ✏️ Redirection vers le formulaire d'édition
	function modifierClient(id: string) {
		goto(`/admin/clients/${id}`);
	}
</script>

{#if loading}
	<p>Chargement des clients...</p>

{:else if error}
	<p class="text-danger">❌ {error}</p>

{:else}
	<h1 class="text-xl font-bold mb-4">👥 Clients</h1>
	<table class="w-full table-auto border">
		<thead class="bg-gray-100">
			<tr>
				<th class="p-2">Nom</th>
				<th class="p-2">Prénom</th>
				<th class="p-2">Email</th>
				<th class="p-2">Téléphone</th>
				<th class="p-2">Permis</th>
				<th class="p-2">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each clients as c}
				<tr class="border-t">
					<td class="p-2">{c.nom}</td>
					<td class="p-2">{c.prenom}</td>
					<td class="p-2">{c.email}</td>
					<td class="p-2">{c.telephone}</td>
					<td class="p-2">{c.permis}</td>
					<td class="p-2 space-x-2">
						<button on:click={() => modifierClient(c._id)} class="bg-blue-500 text-white px-2 py-1 rounded">Modifier</button>
						<button on:click={() => supprimerClient(c._id)} class="bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
