<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAdminToken } from '$lib/utils/auth';

	let motos = [];
	let loading = true;
	let error = '';

	onMount(async () => {
		try {
			const token = getAdminToken();
			const res = await fetch('http://localhost:5001/api/admin/motos', {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (!res.ok) throw new Error("Erreur récupération motos");
			motos = await res.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	const allerAJouter = () => goto('/admin/motos/new');
	const voirMoto = (id: string) => goto(`/admin/motos/${id}`);
	const modifierMoto = (id: string) => goto(`/admin/motos/${id}/edit`);

    const supprimerMoto = async (id: string) => {
	if (!confirm('Confirmer la suppression ?')) return;

	try {
		const token = getAdminToken();
		const res = await fetch(`http://localhost:5001/api/admin/motos/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` }
		});

		if (!res.ok) throw new Error('Échec suppression');

		// Retire la moto de la liste sans recharger
		motos = motos.filter((m) => m._id !== id);
	} catch (err) {
		error = '❌ Erreur lors de la suppression';
	}
};

</script>

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
				{#each motos as moto}
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

	<button class="btn btn-success mt-4" on:click={allerAJouter}>➕ Ajouter une moto</button>
</div>
