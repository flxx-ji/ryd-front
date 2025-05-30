<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAdminToken } from '$lib/utils/auth';
	const baseURL = import.meta.env.VITE_API_URL;

	let reservations = [];
	let loading = true;
	let error = '';

	// ✅ Récupère toutes les réservations dès que la page est montée
	onMount(async () => {
		await fetchReservations();
	});

	// 📦 Fonction de chargement des réservations depuis l’API
	async function fetchReservations() {
		try {
			const token = getAdminToken();
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

	// 🟢 Modifie le statut d'une réservation
	async function updateStatut(id: string, nouveauStatut: string) {
		try {
			const token = getAdminToken();
			await fetch(`${baseURL}/api/admin/reservations/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ statut: nouveauStatut })
			});
			await fetchReservations(); // Recharge les données
		} catch (err) {
			alert("Erreur lors de la mise à jour du statut");
			console.error(err);
		}
	}

	// ❌ Supprime une réservation (avec confirmation)
	async function supprimerReservation(id: string) {
		const confirmation = confirm("Voulez-vous vraiment supprimer cette réservation ?");
		if (!confirmation) return;

		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/reservations/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (!res.ok) throw new Error('Erreur lors de la suppression');
			await fetchReservations(); // Recharge les données
		} catch (err) {
			console.error("❌ Erreur suppression :", err);
			alert("Impossible de supprimer la réservation.");
		}
	}
</script>

{#if loading}
	<!-- ⏳ Indicateur de chargement -->
	<div class="alert alert-info">Chargement des réservations...</div>
{:else if error}
	<!-- ❌ Message d'erreur -->
	<div class="alert alert-danger">{error}</div>
{:else}
	<!-- ✅ Tableau des réservations -->
	<h1 class="mb-4">📋 Réservations</h1>

	<table class="table table-hover table-bordered">
		<thead class="table-light">
			<tr>
				<th>Client</th>
				<th>Moto</th>
				<th>Dates</th>
				<th>Statut</th>
				<th>Prix (€)</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each reservations as r}
				<tr>
					<td>{r.clientId?.prenom} {r.clientId?.nom}</td>
					<td>{r.motoId?.nom} ({r.motoId?.modele})</td>
					<td>{r.dateDebut.slice(0,10)} → {r.dateFin.slice(0,10)}</td>
					<td>
						<select bind:value={r.statut} on:change={() => updateStatut(r._id, r.statut)} class="form-select">
							<option value="en attente">En attente</option>
							<option value="confirmée">Confirmée</option>
							<option value="annulée">Annulée</option>
						</select>
					</td>
					<td>{r.prixTotal}</td>
					<td>
						<button on:click={() => supprimerReservation(r._id)} class="btn btn-danger btn-sm">
							Supprimer
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
