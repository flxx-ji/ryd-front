<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getAdminToken } from '$lib/utils/auth';

	let moto = null;
	let loading = true;
	let error = '';

	const id = $page.params.id;
	const baseURL = import.meta.env.VITE_API_URL; // 🌍 PROD
	// const baseURL = 'http://localhost:5001'; // 🖥️ LOCAL

	onMount(async () => {
		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) throw new Error("Impossible de charger la moto");
			moto = await res.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	const supprimer = async () => {
		const confirmation = confirm("❗ Supprimer cette moto ? Action irréversible.");
		if (!confirmation) return;

		try {
			const token = getAdminToken();
			const res = await fetch(`${baseURL}/api/admin/motos/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) throw new Error("Erreur lors de la suppression");
			alert("🗑️ Moto supprimée !");
			goto('/admin/motos');
		} catch (err) {
			error = err.message;
		}
	};
</script>

{#if loading}
	<p>⏳ Chargement...</p>
{:else if error}
	<p class="text-danger">❌ {error}</p>
{:else}
	<div class="container my-5">
		<h2>🗑️ Supprimer la moto</h2>
		<p class="mb-3">Es-tu sûr de vouloir supprimer <strong>{moto.nom} ({moto.modele})</strong> ?</p>
		
		<button class="btn btn-danger me-2" on:click={supprimer}>Oui, supprimer</button>
		<button class="btn btn-secondary" on:click={() => goto('/admin/motos')}>Annuler</button>
	</div>
{/if}
