<script>
	import { onMount } from 'svelte';
	import '@splidejs/splide/dist/css/splide.min.css';
	import Splide from '@splidejs/splide';

	let titreImage = "http://localhost:5001/uploads/EvénementsF.webp";
	let images = [
		"http://localhost:5001/uploads/event1.webp",
		"http://localhost:5001/uploads/event2.webp",
		"http://localhost:5001/uploads/event2-1.webp"
	];

	onMount(() => {
		document.body.style.backgroundImage = "url('http://localhost:5001/uploads/eventBackground.webp')";
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
</script>

<div class="titre-section">
	<img src={titreImage} alt="Événements" class="titre" />
</div>

<div class="text-blur">
	<h2 class="text-xl md:text-2xl font-bold text-gold text-center mb-4">Les événements Ride Your Dreams</h2>
	<p class="text-center mb-4">Rassemblements, tattoos, balades, festivals... Chaque moment est une fête et une occasion de vibrer ensemble.</p>
</div>

<!-- Carrousel -->
<div class="splide mt-8 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
	<div class="splide__track">
		<ul class="splide__list">
			{#each images as img}
				<li class="splide__slide">
					<img src={img} alt="Événement RYD" class="w-full h-auto object-cover" />
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>

	.titre-section {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 2rem auto;
		width: fit-content;
		max-width: 90vw;
	}
	.titre {
		max-width: 1000px;
		width: 90%;
		height: auto;
	}

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

    .splide__slide img {
	max-height: 650px; /* agrandi un peu plus */
	width: auto;
	margin: 0 auto;
	border-radius: 0.75rem;
	box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
	object-fit: contain;
}


.splide__track {
	background-color: rgba(0, 0, 0, 0.65); /* fond noir transparent */
	padding: 2rem;
	border-radius: 1rem;
}

</style>
