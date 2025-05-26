<script>
	import { onMount } from 'svelte';
	import TitreChicanos from '$lib/components/TitreChicanos.svelte';
	import '@splidejs/splide/dist/css/splide.min.css';
	import Splide from '@splidejs/splide';
	import * as basicLightbox from 'basiclightbox';

	const baseURL = import.meta.env.VITE_API_URL;

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

		new Splide('.splide', {
			type: 'loop',
			perPage: 1,
			autoplay: true,
			interval: 3000,
			pagination: false,
			arrows: true
		}).mount();
	});

	function zoomImage(src) {
		basicLightbox.create(`
			<img src="${src}" alt="Zoom événement" class="zoomed-img"/>
		`).show();
	}
</script>

<TitreChicanos text="events" />

<div class="text-blur">
	<h2 class="text-xl md:text-2xl font-bold text-gold text-center mb-4">Les événements Ride Your Dreams</h2>
	<p class="text-center mb-4">Rassemblements, tattoos, balades, festivals... Chaque moment est une fête et une occasion de vibrer ensemble.</p>
</div>

<!-- ✅ Carrousel -->
<div class="splide mt-8 max-w-6xl mx-auto rounded-xl overflow-hidden shadow-xl">
	<div class="splide__track">
		<ul class="splide__list">
			{#each images as img}
				<li class="splide__slide cursor-pointer">
					<img
						src={img}
						alt="Événement RYD"
						class="carousel-img"
						loading="lazy"
						on:click={() => zoomImage(img)}
					/>
				</li>
			{/each}
		</ul>
	</div>
</div>

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

	.carousel-img {
		display: block;
		margin: 0 auto;
		max-width: 100%;
		max-height: 85vh;
		object-fit: contain;
		object-position: center;
		border-radius: 0.75rem;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
		transition: transform 0.3s ease;
		cursor: zoom-in;
	}

	.carousel-img:hover {
		transform: scale(1.05);
	}

	/* ✅ Image dans la lightbox */
	.zoomed-img {
		max-width: 90vw;
		max-height: 90vh;
		border-radius: 1rem;
		box-shadow: 0 0 25px rgba(0,0,0,0.8);
	}
</style>
