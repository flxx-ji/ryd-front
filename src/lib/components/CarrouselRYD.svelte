<script>
	import { onMount } from 'svelte';
	import * as basicLightbox from 'basiclightbox';
	import Splide from '@splidejs/splide';
	import '@splidejs/splide/dist/css/splide.min.css';

	export let images = [];

	onMount(() => {
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

	.zoomed-img {
		max-width: 90vw;
		max-height: 90vh;
		border-radius: 1rem;
		box-shadow: 0 0 25px rgba(0, 0, 0, 0.8);
	}
</style>
