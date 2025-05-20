<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getAdminToken } from '$lib/utils/auth';

	let moto = null;
	let error = '';
	let loading = true;
	let equipementsText = '';
	let imagePreview = '';
	let image: File | null = null;

	const id = $page.params.id;
	const baseURL = 'https://ryd-backend2-iryz.onrender.com';

	const updateChamp = async (key: string, value: any) => {
		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ key, value })
			});
			if (!res.ok) throw new Error("Erreur de mise à jour");
		} catch (err) {
			error = err.message;
		}
	};

	const updateImage = async () => {
		if (!image) return;
		const formData = new FormData();
		formData.append('image', image);
		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/motos/${id}/image`, {
				method: 'POST',
				headers: { Authorization: `Bearer ${token}` },
				body: formData
			});
			if (!res.ok) throw new Error("Erreur upload image");
			const data = await res.json();
			moto.image = data.image;
			imagePreview = data.image;
		} catch (err) {
			error = err.message;
		}
	};

	onMount(async () => {
		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (!res.ok) throw new Error('Erreur de chargement');
			moto = await res.json();
			equipementsText = moto.equipements.join(', ');
			imagePreview = moto.image;
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<p>Chargement...</p>
{:else if error}
	<p class="text-danger">❌ {error}</p>
{:else}
	<div class="container">
		<h2>✏️ Modifier la moto</h2>

		<form on:submit|preventDefault>
			<!-- 🏍️ Nom -->
			<div class="mb-3">
				<label class="form-label">Nom</label>
				<input class="form-control" bind:value={moto.nom} on:blur={() => updateChamp('nom', moto.nom)} />
			</div>

			<!-- 🎨 Couleur -->
			<div class="mb-3">
				<label class="form-label">Couleur</label>
				<input class="form-control" bind:value={moto.couleur} on:blur={() => updateChamp('couleur', moto.couleur)} />
			</div>

			<!-- ✅ Disponible -->
			<div class="mb-3">
				<label class="form-label">Disponible</label>
				<select class="form-select" bind:value={moto.disponible} on:change={() => updateChamp('disponible', moto.disponible)}>
					<option value={true}>Oui</option>
					<option value={false}>Non</option>
				</select>
			</div>

			<!-- 🖼️ Image -->
			<div class="mb-3">
				<label class="form-label">Image</label>
				<input class="form-control" type="file" accept="image/*" on:change={(e) => {
					image = (e.target as HTMLInputElement).files[0];
					imagePreview = URL.createObjectURL(image);
				}} />
				{#if imagePreview}
					<img src={imagePreview} alt="Preview" class="mt-2" style="max-width: 300px;" />
				{/if}
				<button type="button" class="btn btn-sm btn-outline-primary mt-2" on:click={updateImage}>Mettre à jour l'image</button>
			</div>

			<!-- 💸 Tarifs -->
			<h4 class="mt-4">Tarifs</h4>
			<div class="mb-3">
				<label>1 jour</label>
				<input class="form-control" type="number" bind:value={moto.tarifs.unJour} on:blur={() => updateChamp('tarifs.unJour', moto.tarifs.unJour)} />
			</div>
			<div class="mb-3">
				<label>2-3 jours</label>
				<input class="form-control" bind:value={moto.tarifs.deuxTroisJours} on:blur={() => updateChamp('tarifs.deuxTroisJours', moto.tarifs.deuxTroisJours)} />
			</div>
			<div class="mb-3">
				<label>4-5 jours</label>
				<input class="form-control" bind:value={moto.tarifs.quatreCinqJours} on:blur={() => updateChamp('tarifs.quatreCinqJours', moto.tarifs.quatreCinqJours)} />
			</div>
			<div class="mb-3">
				<label>1 semaine</label>
				<input class="form-control" type="number" bind:value={moto.tarifs.uneSemaine} on:blur={() => updateChamp('tarifs.uneSemaine', moto.tarifs.uneSemaine)} />
			</div>

			<!-- ⚙️ Caractéristiques -->
			<h4 class="mt-4">Caractéristiques</h4>
			<div class="mb-3">
				<label>Moteur</label>
				<input class="form-control" bind:value={moto.caracteristiques.moteur} on:blur={() => updateChamp('caracteristiques.moteur', moto.caracteristiques.moteur)} />
			</div>
			<div class="mb-3">
				<label>Cylindrée</label>
				<input class="form-control" bind:value={moto.caracteristiques.cylindree} on:blur={() => updateChamp('caracteristiques.cylindree', moto.caracteristiques.cylindree)} />
			</div>
			<div class="mb-3">
				<label>Transmission</label>
				<input class="form-control" bind:value={moto.caracteristiques.transmission} on:blur={() => updateChamp('caracteristiques.transmission', moto.caracteristiques.transmission)} />
			</div>
			<div class="mb-3">
				<label>Poids</label>
				<input class="form-control" bind:value={moto.caracteristiques.poids} on:blur={() => updateChamp('caracteristiques.poids', moto.caracteristiques.poids)} />
			</div>
			<div class="mb-3">
				<label>Autonomie</label>
				<input class="form-control" bind:value={moto.caracteristiques.autonomie} on:blur={() => updateChamp('caracteristiques.autonomie', moto.caracteristiques.autonomie)} />
			</div>
			<div class="mb-3">
				<label>Réservoir</label>
				<input class="form-control" bind:value={moto.caracteristiques.reservoir} on:blur={() => updateChamp('caracteristiques.reservoir', moto.caracteristiques.reservoir)} />
			</div>

			<!-- 🔒 Equipements (lecture seule) -->
			<h4 class="mt-4">Équipements inclus</h4>
			<ul>
				{#each moto.equipements as equipement}
					<li>{equipement}</li>
				{/each}
			</ul>
		</form>
	</div>
{/if}
