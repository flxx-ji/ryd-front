<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getAdminToken } from '$lib/utils/auth';

	let moto = null;
	let error = '';
	let loading = true;
	let imagePreview = '';
	let image: File | null = null;

	const id = $page.params.id;
	const baseURL = 'https://ryd-backend2-iryz.onrender.com';

	// 🔁 Calcul automatique des tarifs si unJour est modifié
	$: if (moto?.tarifs?.unJour > 0) {
		const prix = (j: number, remise: number) => ((moto.tarifs.unJour * j) * (1 - remise)).toFixed(2);
		moto.tarifs.deuxTroisJours = `${prix(2, 0.05)} € / ${prix(3, 0.05)} €`;
		moto.tarifs.quatreCinqJours = `${prix(4, 0.10)} € / ${prix(5, 0.15)} €`;
		moto.tarifs.uneSemaine = parseFloat(prix(6, 0.20));
	}

	// ✅ Envoie tous les champs modifiés à l'enregistrement global
	const sauvegarderTout = async () => {
		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(moto)
			});
			if (!res.ok) throw new Error("Erreur lors de la sauvegarde générale");
			alert("✅ Modifications enregistrées avec succès");
		} catch (err) {
			error = err.message;
		}
	};

	// ✅ Envoie uniquement un champ modifié
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

	// ✅ Upload d'une nouvelle image
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

	// ✅ Récupération des données moto à l'ouverture de la page
	onMount(async () => {
		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (!res.ok) throw new Error('Erreur de chargement');
			moto = await res.json();
			imagePreview = moto.image;
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});
</script>

{#if loading} <p>Chargement...</p>
{:else if error} <p class="text-danger">❌ {error}</p>
{:else} <div class="container"> <h2>✏️ Modifier la moto</h2>
<form on:submit|preventDefault> <!-- 🏍️ Infos de base --> <div class="mb-3"> <label class="form-label">Nom</label> <input class="form-control" bind:value={moto.nom} /> </div> <div class="mb-3"> <label class="form-label">Couleur</label> <input class="form-control" bind:value={moto.couleur} /> </div> <div class="mb-3"> <label class="form-label">Disponible</label> <select class="form-select" bind:value={moto.disponible}> <option value={true}>Oui</option> <option value={false}>Non</option> </select> </div>

```
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

		<!-- 💰 Tarifs -->
		<h4 class="mt-4">Tarifs</h4>
		<div class="mb-3">
			<label>1 jour</label>
			<input class="form-control" type="number" bind:value={moto.tarifs.unJour} />
		</div>
		<div class="mb-3">
			<label>2-3 jours</label>
			<input class="form-control" bind:value={moto.tarifs.deuxTroisJours} />
		</div>
		<div class="mb-3">
			<label>4-5 jours</label>
			<input class="form-control" bind:value={moto.tarifs.quatreCinqJours} />
		</div>
		<div class="mb-3">
			<label>1 semaine</label>
			<input class="form-control" type="number" bind:value={moto.tarifs.uneSemaine} />
		</div>

		<!-- ⚙️ Caractéristiques -->
		<h4 class="mt-4">Caractéristiques</h4>
		<div class="mb-3"><label>Moteur</label><input class="form-control" bind:value={moto.caracteristiques.moteur} /></div>
		<div class="mb-3"><label>Cylindrée</label><input class="form-control" bind:value={moto.caracteristiques.cylindree} /></div>
		<div class="mb-3"><label>Transmission</label><input class="form-control" bind:value={moto.caracteristiques.transmission} /></div>
		<div class="mb-3"><label>Poids</label><input class="form-control" bind:value={moto.caracteristiques.poids} /></div>
		<div class="mb-3"><label>Autonomie</label><input class="form-control" bind:value={moto.caracteristiques.autonomie} /></div>
		<div class="mb-3"><label>Réservoir</label><input class="form-control" bind:value={moto.caracteristiques.reservoir} /></div>

		<!-- 📦 Équipements -->
		<h4 class="mt-4">Équipements inclus</h4>
		<ul>
			{#each moto.equipements as equipement}
				<li>{equipement}</li>
			{/each}
		</ul>

		<!-- ✅ Bouton global de sauvegarde -->
		<div class="mt-4">
			<button type="button" class="btn btn-success" on:click={sauvegarderTout}>💾 Sauvegarder toutes les modifications</button>
		</div>
	</form>
</div>
```

{/if}
