<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
    import { getAdminToken } from '$lib/utils/auth';

	const baseURL = import.meta.env.VITE_API_URL;


	let success = '';
	let error = '';
	let image: File | null = null;

	let nom = '';
	let marque = '';
	let modele = '';
	let annee = '';
	let couleur = '';
	let disponible = true;

	let tarifsTexte = JSON.stringify(
		{ unJour: 0, troisJours: 0, quatreCinqJours: 0, uneSemaine: 0 },
		null,
		2
	);

	let caracteristiquesTexte = JSON.stringify({}, null, 2);
	let equipementsTexte = JSON.stringify([], null, 2);

	const ajouterMoto = async () => {
		const formData = new FormData();
		formData.append('nom', nom);
		formData.append('marque', marque);
		formData.append('modele', modele);
		formData.append('annee', annee);
		formData.append('couleur', couleur);
		formData.append('disponible', disponible.toString());
		formData.append('tarifs', tarifsTexte);
		formData.append('caracteristiques', caracteristiquesTexte);
		formData.append('equipements', equipementsTexte);
		if (image) formData.append('image', image);

		try {
			const token = getAdminToken();
 			// const res = await fetch('http://localhost:5001/api/admin/motos', {
			// 	method: 'POST',
			// 	headers: { Authorization: `Bearer ${token}` },
			// 	body: formData
			// });

			const res = await fetch(`${baseURL}/api/admin/motos`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
});

			if (!res.ok) throw new Error('Échec ajout moto');
			success = '✅ Moto ajoutée avec succès !';
			setTimeout(() => goto('/admin/motos'), 1500);
		} catch (err) {
			error = '❌ Erreur lors de l’ajout';
		}
	};
</script>

<div class="container my-5">
	<h2 class="mb-4">➕ Ajouter une moto</h2>

    <!-- ✅ Affichage des messages de succès/erreur ici, avant le form -->
	{#if success}
    <p class="text-success mt-3">{success}</p>
{/if}
{#if error}
    <p class="text-danger mt-3">{error}</p>
{/if}

	<form on:submit|preventDefault={ajouterMoto} class="row g-3">
		<div class="col-md-6">
			<label class="form-label">Nom</label>
			<input class="form-control" bind:value={nom} required />
		</div>
		<div class="col-md-6">
			<label class="form-label">Marque</label>
			<input class="form-control" bind:value={marque} required />
		</div>

		<div class="col-md-6">
			<label class="form-label">Modèle</label>
			<input class="form-control" bind:value={modele} required />
		</div>

		<div class="col-md-4">
			<label class="form-label">Année</label>
			<input type="number" class="form-control" bind:value={annee} required />
		</div>

		<div class="col-md-4">
			<label class="form-label">Couleur</label>
			<input class="form-control" bind:value={couleur} required />
		</div>

		<div class="col-md-4">
			<label class="form-label">Disponible</label>
			<select class="form-select" bind:value={disponible}>
				<option value={true}>Oui</option>
				<option value={false}>Non</option>
			</select>
		</div>

		<div class="col-12">
			<h5 class="mt-4">💰 Tarifs (JSON)</h5>
			<textarea bind:value={tarifsTexte} class="form-control" rows="4" required></textarea>
		</div>

		<div class="col-12">
			<h5 class="mt-4">⚙️ Caractéristiques (JSON)</h5>
			<textarea bind:value={caracteristiquesTexte} class="form-control" rows="3"></textarea>
		</div>

		<div class="col-12">
			<h5 class="mt-4">🧰 Équipements (JSON)</h5>
			<textarea bind:value={equipementsTexte} class="form-control" rows="3"></textarea>
		</div>

		<div class="col-12">
			<label class="form-label">📸 Image</label>
			<input type="file" class="form-control" accept="image/*" on:change={(e) => image = (e.target as HTMLInputElement).files[0]} />
		</div>

		<div class="col-12 mt-4">
			<button type="submit" class="btn btn-success">💾 Enregistrer</button>
			<a class="btn btn-secondary ms-2" on:click={() => goto('/admin/motos')}>Annuler</a>
		</div>

		 
	</form>
</div>
