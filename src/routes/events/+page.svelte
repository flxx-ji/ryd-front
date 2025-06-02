<script>
	import { onMount } from 'svelte';
	import TitreChicanos from '$lib/components/TitreChicanos.svelte';
	import CarrouselRYD from '$lib/components/CarrouselRYD.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	 


	const baseURL = PUBLIC_API_URL;

	let images = [
		`${baseURL}/uploads/event1.webp`,
		`${baseURL}/uploads/event2.webp`,
		`${baseURL}/uploads/event2-1.webp`
	];

	onMount(() => {
		document.body.style.backgroundImage = `url('${baseURL}/uploads/services2.webp')`;
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundPosition = 'center';
		document.body.style.backgroundAttachment = 'fixed';
	});
</script>

<TitreChicanos text="Événements" />

<div class="text-blur">
	<h2 class="text-xl md:text-2xl font-bold text-gold text-center mb-4">Les événements Ride Your Dreams</h2>
	<p class="text-center mb-4">Rassemblements, tattoos, balades, festivals... Chaque moment est une fête et une occasion de vibrer ensemble.</p>
</div>

<CarrouselRYD {images} />

<style>
	.text-blur {
		max-width: 900px;
		margin: 2rem auto;
		padding: 2rem;
		backdrop-filter: blur(12px);
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 1rem;
		color: #FFD700;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
		text-shadow: 1px 1px 2px black;
	}
</style>
