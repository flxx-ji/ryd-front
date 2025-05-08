<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getAdminToken } from '$lib/utils/auth';

	let moto = null;
	let loading = true;
	let error = '';

	// 🔍 Récupère l'ID dans l'URL dynamique
	const id = $page.params.id;

	// 🔄 Chargement des infos de la moto à l'arrivée
	onMount(async () => {
		try {
			const token = getAdminToken();
			const res = await fetch(`http://localhost:5001/api/admin/motos/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (!res.ok) throw new Error('Erreur lors du chargement de la moto');
			moto = await res.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	// 🔙 Retour à la liste
	const retour = () => goto('/admin/motos');
</script>

<!-- 🔄 Chargement -->
{#if loading}
	<p>⏳ Chargement des données...</p>

<!-- ❌ Erreur -->
{:else if error}
	<p class="text-danger">❌ {error}</p>

<!-- ✅ Affichage de la moto -->
{:else if moto}
	<div class="container my-4">
		<h2 class="mb-3">🏍️ {moto.nom} ({moto.modele})</h2>
		<ul class="list-group">
			<li class="list-group-item"><strong>Marque :</strong> {moto.marque}</li>
			<li class="list-group-item"><strong>Année :</strong> {moto.annee}</li>
			<li class="list-group-item"><strong>Couleur :</strong> {moto.couleur}</li>
			<li class="list-group-item"><strong>Disponible :</strong> {moto.disponible ? 'Oui' : 'Non'}</li>
			<li class="list-group-item"><strong>Tarifs :</strong>
				<ul>
					<li>1 jour : {moto.tarifs.unJour} €</li>
					<li>3 jours : {moto.tarifs.troisJours} €</li>
					<li>4-5 jours : {moto.tarifs.quatreCinqJours} €</li>
					<li>1 semaine : {moto.tarifs.uneSemaine} €</li>
				</ul>
			</li>
			<li class="list-group-item"><strong>Image :</strong><br>
				<img src={`http://localhost:5001${moto.image}`} alt="moto" width="300" />
			</li>
		</ul>

		<button class="btn btn-secondary mt-4" on:click={retour}>↩️ Retour</button>
	</div>
{/if}
