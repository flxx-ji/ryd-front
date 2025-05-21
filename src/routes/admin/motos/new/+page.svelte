<script lang="ts">
	import { goto } from '$app/navigation';
	import { getAdminToken } from '$lib/utils/auth';
	import { page } from '$app/stores';
    import { onMount } from 'svelte';


	const baseURL = import.meta.env.VITE_API_URL;

	let success = '';
	let error = '';
	let image: File | null = null;
	let imagePreview = '';

	// Champs simples
	let nom = '';
	let marque = '';
	let modele = '';
	let annee = '';
	let couleur = '';
	let disponible = true;

	// Champs tarifs (1 jour manuel, les autres auto)
	let unJour = 0;
	let deuxTroisJours = '';
	let quatreCinqJours = '';
	let uneSemaine = 0;

	// Caractéristiques techniques
	let moteur = '';
	let cylindree = '';
	let transmission = '';
	let poids = '';
	let autonomie = '';
	let reservoir = '';

	// 🧬 Duplication si ?copieDe=ID dans l'URL
onMount(async () => {
	const idToCopy = $page.url.searchParams.get('copieDe');
	if (!idToCopy) return;

	try {
		const token = getAdminToken();
		const res = await fetch(`${baseURL}/api/admin/motos/${idToCopy}`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		if (!res.ok) throw new Error('❌ Impossible de copier la moto');

		const m = await res.json();
		nom = m.nom + ' (copie)';
		marque = m.marque;
		modele = m.modele;
		annee = m.annee;
		couleur = m.couleur;
		disponible = m.disponible;

		unJour = m.tarifs?.unJour || 0;
		deuxTroisJours = m.tarifs?.deuxTroisJours || '';
		quatreCinqJours = m.tarifs?.quatreCinqJours || '';
		uneSemaine = m.tarifs?.uneSemaine || 0;

		moteur = m.caracteristiques?.moteur || '';
		cylindree = m.caracteristiques?.cylindree || '';
		transmission = m.caracteristiques?.transmission || '';
		poids = m.caracteristiques?.poids || '';
		autonomie = m.caracteristiques?.autonomie || '';
		reservoir = m.caracteristiques?.reservoir || '';
	} catch (e) {
		error = '❌ Erreur pendant la duplication';
	}
});


	// 🔁 Calcul auto des tarifs dès que le prix 1 jour est saisi
	$: if (unJour > 0) {
		const prix = (j: number, remise: number) => ((unJour * j) * (1 - remise)).toFixed(2);
		deuxTroisJours = `${prix(2, 0.05)} € (-5%) / ${prix(3, 0.05)} € (-5%)`;
		quatreCinqJours = `${prix(4, 0.10)} € (-10%) / ${prix(5, 0.15)} € (-15%)`;
		uneSemaine = parseFloat(prix(6, 0.20));
	}

	// 📤 Envoi du formulaire au backend
	const ajouterMoto = async () => {
		const formData = new FormData();
		formData.append('nom', nom);
		formData.append('marque', marque);
		formData.append('modele', modele);
		formData.append('annee', annee);
		formData.append('couleur', couleur);
		formData.append('disponible', disponible.toString());

		formData.append('tarifs', JSON.stringify({
			unJour,
			deuxTroisJours,
			quatreCinqJours,
			uneSemaine
		}));

		formData.append('caracteristiques', JSON.stringify({
			moteur,
			cylindree,
			transmission,
			poids,
			autonomie,
			reservoir
		}));

		if (image) formData.append('image', image);

		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/motos`, {
				method: 'POST',
				headers: { Authorization: `Bearer ${token}` },
				body: formData
			});

			if (!res.ok) throw new Error('Erreur serveur');
			success = '✅ Moto ajoutée avec succès';
			setTimeout(() => goto('/admin/motos'), 1500);
		} catch (err) {
			error = '❌ Une erreur est survenue';
		}
	};
</script>

<div class="container my-5">
	<h2 class="mb-4">➕ Ajouter une moto</h2>

	{#if success}<p class="text-success mt-3">{success}</p>{/if}
	{#if error}<p class="text-danger mt-3">{error}</p>{/if}

	<form on:submit|preventDefault={ajouterMoto} class="row g-3">
		<!-- Champs classiques -->
		<div class="col-md-6">
			<label>Nom</label>
			<input class="form-control" bind:value={nom} required />
		</div>
		<div class="col-md-6">
			<label>Marque</label>
			<input class="form-control" bind:value={marque} required />
		</div>
		<div class="col-md-6">
			<label>Modèle</label>
			<input class="form-control" bind:value={modele} required />
		</div>
		<div class="col-md-4">
			<label>Année</label>
			<input type="number" class="form-control" bind:value={annee} required />
		</div>
		<div class="col-md-4">
			<label>Couleur</label>
			<input class="form-control" bind:value={couleur} required />
		</div>
		<div class="col-md-4">
			<label>Disponible</label>
			<select class="form-select" bind:value={disponible}>
				<option value={true}>Oui</option>
				<option value={false}>Non</option>
			</select>
		</div>

		<!-- 💰 Tarifs -->
		<h5 class="mt-4">Tarifs</h5>
		<div class="col-md-3">
			<label>Prix 1 jour (€)</label>
			<input class="form-control" type="number" bind:value={unJour} required />
		</div>
		<div class="col-md-9">
			<label>2-3 jours (calculé)</label>
			<input class="form-control" bind:value={deuxTroisJours} readonly />
		</div>
		<div class="col-md-9">
			<label>4-5 jours (calculé)</label>
			<input class="form-control" bind:value={quatreCinqJours} readonly />
		</div>
		<div class="col-md-3">
			<label>1 semaine (€ calculé)</label>
			<input class="form-control" type="number" bind:value={uneSemaine} readonly />
		</div>

		<!-- ⚙️ Caractéristiques techniques -->
		<h5 class="mt-4">Caractéristiques</h5>
		<div class="col-md-4">
			<label>Moteur</label>
			<input class="form-control" bind:value={moteur} />
		</div>
		<div class="col-md-4">
			<label>Cylindrée</label>
			<input class="form-control" bind:value={cylindree} />
		</div>
		<div class="col-md-4">
			<label>Transmission</label>
			<input class="form-control" bind:value={transmission} />
		</div>
		<div class="col-md-4">
			<label>Poids</label>
			<input class="form-control" bind:value={poids} />
		</div>
		<div class="col-md-4">
			<label>Autonomie</label>
			<input class="form-control" bind:value={autonomie} />
		</div>
		<div class="col-md-4">
			<label>Réservoir</label>
			<input class="form-control" bind:value={reservoir} />
		</div>

		<!-- 📸 Image avec preview -->
		<div class="col-12">
			<label>Image</label>
			<input type="file" class="form-control" accept="image/*" on:change={(e) => {
				image = (e.target as HTMLInputElement).files[0];
				imagePreview = URL.createObjectURL(image);
			}} />
			{#if imagePreview}
				<div class="mt-2">
					<p class="mb-1">Aperçu :</p>
					<img src={imagePreview} alt="Preview" style="max-width: 300px;" />
				</div>
			{/if}
		</div>

		<!-- Boutons d'action -->
		<div class="col-12 mt-4">
			<button type="submit" class="btn btn-success">💾 Enregistrer</button>
			<a class="btn btn-secondary ms-2" on:click={() => goto('/admin/motos')}>Annuler</a>
		</div>
	</form>
</div>
