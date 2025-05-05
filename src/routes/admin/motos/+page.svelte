<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let motos = [];
	let loading = true;
	let error = '';

	// ✅ Appel API pour récupérer toutes les motos à l'ouverture
	onMount(async () => {
		try {
			const token = localStorage.getItem('token');
			const res = await fetch('http://localhost:5001/api/admin/motos', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) throw new Error('Erreur lors du chargement');
			motos = await res.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	// 🗑️ Supprimer une moto
	async function supprimerMoto(id: string) {
		if (!confirm('Voulez-vous vraiment supprimer cette moto ?')) return;
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`http://localhost:5001/api/admin/motos/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) throw new Error('Erreur lors de la suppression');
			motos = motos.filter((m) => m._id !== id); // mise à jour locale
		} catch (err) {
			alert('Erreur : ' + err.message);
		}
	}
</script>

<!-- 🔄 Affichage conditionnel -->
{#if loading}
	<p>⏳ Chargement des motos...</p>
{:else if error}
	<p class="text-danger">❌ {error}</p>
{:else}
	<h2 class="mb-3">🏍️ Liste des Motos</h2>
	<table class="table table-striped">
		<thead>
			<tr>
				<th>Nom</th>
				<th>Modèle</th>
				<th>Marque</th>
				<th>Année</th>
				<th>Disponible</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each motos as m}
				<tr>
					<td>{m.nom}</td>
					<td>{m.modele}</td>
					<td>{m.marque}</td>
					<td>{m.annee}</td>
					<td>{m.disponible ? '✅' : '❌'}</td>
					<td>
						<button class="btn btn-sm btn-primary me-1" on:click={() => goto(`/admin/motos/${m._id}`)}>Voir</button>
						<button class="btn btn-sm btn-warning me-1" on:click={() => goto(`/admin/motos/${m._id}/edit`)}>Modifier</button>
						<button class="btn btn-sm btn-danger" on:click={() => supprimerMoto(m._id)}>Supprimer</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
