<script>
	import MotoCard from '$lib/components/MotoCard.svelte';
	import { onMount } from 'svelte';

	export let data;

	// 🌐 URL API
	const baseURL = import.meta.env.VITE_API_URL;

	// 📦 Les motos sont injectées depuis +page.js
	let motos = data.motos;

	// 🖼️ Gestion de l'image de fond (client-side uniquement)
	onMount(() => {
		// 🎯 Pour retour dev local si besoin :
		// document.body.style.backgroundImage = "url('http://localhost:5001/uploads/catalogue2.webp')";

		document.body.style.backgroundImage = `url('${baseURL}/uploads/catalogue2.webp')`;
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundPosition = 'center';
		document.body.style.backgroundAttachment = 'fixed';
	});
</script>

<div class="page-section">
	<div class="titre-section">
		<!-- 🖼️ Pour retour dev local : -->
		<!-- <img src="http://localhost:5001/uploads/CatalogueF.webp" alt="Catalogue" class="titre" /> -->

		<img src={`${baseURL}/uploads/Catalogue2X.webp`} alt="Catalogue" class="titre" />
	</div>

	<div class="catalogue">
		{#each motos as moto}
			<MotoCard {moto} />
		{/each}
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	.page-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0;
		margin-top: 0;
	}

	.titre-section {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 160px;
		margin-bottom: 1rem;
		width: 100%;
	}

	.titre {
		height: auto;
		max-height: 120px;
		width: auto;
		object-fit: contain;
	}

	.catalogue {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		justify-items: center;
		gap: 2rem;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding-top: 0;
		 
	}
</style>
