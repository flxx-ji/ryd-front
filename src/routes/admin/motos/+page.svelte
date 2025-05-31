<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAdminToken } from '$lib/utils/auth';

	let motos = [];            // 🏍️ Liste des motos
	let loading = true;        // ⏳ Indicateur de chargement
	let error = '';            // ❌ Message d’erreur

	const baseURL = import.meta.env.VITE_API_URL; // 🌐 Base URL de ton API

	// 📦 Récupération des motos au chargement
	onMount(async () => {
		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/motos`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (!res.ok) throw new Error("Erreur récupération motos");
			motos = await res.json();
		} catch (err) {
			error = err.message; // ✅ On affiche l’erreur réelle
		} finally {
			loading = false;
		}
	});

	// ➕ Navigue vers la page d’ajout
	const allerAJouter = () => goto('/admin/motos/new');

	// 👁️ Voir détails d’une moto
	const voirMoto = (id: string) => goto(`/admin/motos/${id}/edit`);

	// ✏️ Modifier une moto
	const modifierMoto = (id: string) => goto(`/admin/motos/${id}/edit`);

	// 🗑️ Supprimer une moto
	const supprimerMoto = async (id: string) => {
		if (!confirm('Confirmer la suppression ?')) return;
		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` }
			});
			if (!res.ok) throw new Error('Suppression échouée');
			motos = motos.filter((m) => m._id !== id); // 🧼 Mise à jour locale après suppression
		} catch (err) {
			error = err.message; // ✅ Affiche l’erreur réelle
		}
	};
</script>

<!-- 🎨 Interface admin des motos -->
<div class="container my-5">
	<h2 class="mb-4">🛠️ Gestion des motos</h2>

	{#if loading}
		<p>⏳ Chargement...</p>
	{:else if error}
		<p class="text-danger">❌ {error}</p>
	{:else if motos.length === 0}
		<p>Aucune moto enregistrée pour le moment.</p>
	{:else}
		<table class="table table-striped">
			<thead>
				<tr>
					<th>Nom</th>
					<th>Modèle</th>
					<th>Année</th>
					<th>Couleur</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each motos as moto (moto._id)} <!-- ✅ Meilleure perf avec clé unique -->
					<tr>
						<td>{moto.nom}</td>
						<td>{moto.modele}</td>
						<td>{moto.annee}</td>
						<td>{moto.couleur}</td>
						<td>
							<button class="btn btn-outline-primary btn-sm" on:click={() => voirMoto(moto._id)}>👁️ Voir</button>
							<button class="btn btn-outline-warning btn-sm mx-2" on:click={() => modifierMoto(moto._id)}>✏️ Modifier</button>
							<button class="btn btn-sm btn-danger ms-2" on:click={() => supprimerMoto(moto._id)}>🗑️ Supprimer</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}

	<!-- 🆕 Bouton pour ajouter une moto -->
	<button class="btn btn-success mt-4" on:click={allerAJouter}>➕ Ajouter une moto</button>
</div>
