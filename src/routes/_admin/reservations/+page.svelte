<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	const baseURL = import.meta.env.VITE_API_URL;


	// 🔐 Utilisation centralisée du token
	import { getAdminToken } from '$lib/utils/auth';

	let reservations = [];
	let loading = true;
	let error = '';

	// ✅ Fonction pour charger les réservations depuis l'API
	onMount(async () => {
		await fetchReservations();
	});

	// 🔄 Recharge les réservations (appelée aussi après suppression ou update)
	async function fetchReservations() {
		try {
			const token = getAdminToken(); // 🔐 Utilise le token de manière propre

			// const res = await fetch('http://localhost:5001/api/admin/reservations', {

			const res = await fetch(`${baseURL}/api/admin/reservations`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (!res.ok) throw new Error('Erreur lors du chargement');

			reservations = await res.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	// 🟢 Met à jour le statut d'une réservation
	async function updateStatut(id: string, nouveauStatut: string) {
		try {
			const token = getAdminToken();
			// await fetch(`http://localhost:5001/api/admin/reservations/${id}`, {

			await fetch(`${baseURL}/api/admin/reservations/${id}`, {

				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ statut: nouveauStatut })
			});
			await fetchReservations();
		} catch (err) {
			alert("Erreur lors de la mise à jour du statut");
			console.error(err);
		}
	}

	// 🗑️ Supprime une réservation après confirmation
	async function supprimerReservation(id: string) {
		const confirmation = confirm("Voulez-vous vraiment supprimer cette réservation ?");
		if (!confirmation) return;

		try {
			const token = getAdminToken();
			// const res = await fetch(`http://localhost:5001/api/admin/reservations/${id}`, {

			const res = await fetch(`${baseURL}/api/admin/reservations/${id}`, {

				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) throw new Error('Erreur lors de la suppression');
			await fetchReservations();
		} catch (err) {
			console.error("❌ Erreur suppression :", err);
			alert("Impossible de supprimer la réservation.");
		}
	}
</script>
{#if loading}
	<p>⏳ Chargement des réservations...</p>

{:else if error}
	<p class="text-danger">❌ {error}</p>

{:else}
	<h1 class="text-xl font-bold mb-4">📋 Réservations</h1>
	<table class="w-full table-auto border">
		<thead>
			<tr class="bg-gray-100">
				<th class="p-2">Client</th>
				<th class="p-2">Moto</th>
				<th class="p-2">Dates</th>
				<th class="p-2">Statut</th>
				<th class="p-2">Prix (€)</th>
				<th class="p-2">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each reservations as r}
				<tr class="border-t">
					<td class="p-2">{r.clientId?.prenom} {r.clientId?.nom}</td>
					<td class="p-2">{r.motoId?.nom} ({r.motoId?.modele})</td>
					<td class="p-2">{r.dateDebut.slice(0,10)} → {r.dateFin.slice(0,10)}</td>
					<td class="p-2">
						<select bind:value={r.statut} on:change={() => updateStatut(r._id, r.statut)} class="border px-2 py-1 rounded">
							<option value="en attente">En attente</option>
							<option value="confirmée">Confirmée</option>
							<option value="annulée">Annulée</option>
						</select>
					</td>
					<td class="p-2">{r.prixTotal}</td>
					<td class="p-2 text-center">
						<button on:click={() => supprimerReservation(r._id)} class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">
							Supprimer
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
