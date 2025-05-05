<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let clients = [];
	let loading = true;
	let error = '';

	const token = localStorage.getItem('token');

	// ✅ Chargement des clients à l'arrivée
	onMount(async () => {
		await chargerClients();
	});

	// 🔁 Fonction réutilisable pour recharger la liste
	async function chargerClients() {
		try {
			loading = true;
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
	async function supprimerClient(id) {
		if (!confirm('❗ Supprimer ce client ?')) return;
		try {
			const res = await fetch(`http://localhost:5001/api/admin/clients/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) throw new Error("Échec de la suppression");
			await chargerClients(); // 🔄 On recharge la liste après suppression
		} catch (err) {
			alert('Erreur lors de la suppression : ' + err.message);
		}
	}

	// ✏️ Redirection vers le formulaire d’édition (à créer ensuite)
	function modifierClient(id) {
		goto(`/admin/clients/${id}`);
	}
</script>

<!-- 🕒 Chargement -->
{#if loading}
	<p>Chargement des clients...</p>

<!-- ❌ Erreur -->
{:else if error}
	<p class="text-red-600">❌ {error}</p>

<!-- ✅ Liste des clients -->
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
