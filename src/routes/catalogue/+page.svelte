<script>
	import TitreChicanos from '$lib/components/TitreChicanos.svelte';
	import MotoCard from '$lib/components/MotoCard.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL } from '$env/static/public';


	export let data;
	const baseURL = PUBLIC_API_URL;

	let motos = data.motos;

	onMount(() => {
		document.body.style.backgroundImage = `url('${baseURL}/uploads/catalogue2.webp')`;
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundPosition = 'center';
		document.body.style.backgroundAttachment = 'fixed';
	});
</script>

<!-- ✅ Titre stylisé identique à Home -->
<TitreChicanos text="Catalogue" />

<!-- ✅ Liste des motos -->
<div class="catalogue">
	{#each motos as moto}
		<MotoCard {moto} />
	{/each}
</div>

<style>
	.catalogue {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		justify-items: center;
		gap: 2rem;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
