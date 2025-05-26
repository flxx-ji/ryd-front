<!-- Titre -->
<TitreChicanos text="events" />

<!-- Intro floutée -->
<div class="text-blur">
	<h2 class="text-xl md:text-2xl font-bold text-gold text-center mb-4">Les événements Ride Your Dreams</h2>
	<p class="text-center mb-4">
		Rassemblements, tattoos, balades, festivals... Chaque moment est une fête et une occasion de vibrer ensemble.
	</p>
</div>

<!-- Carrousel Splide -->
<div class="splide carousel-responsive">
	<div class="splide__track">
		<ul class="splide__list">
			{#each images as img}
				<li class="splide__slide">
					<img src={img} alt="Événement RYD" on:click={() => window.open(img, '_blank')} />
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

/* Carrousel principal */
.carousel-responsive {
	max-width: 1200px;
	margin: 3rem auto;
	border-radius: 1rem;
	overflow: hidden;
	box-shadow: 0 0 25px rgba(0, 0, 0, 0.7);
}

.splide__track {
	background-color: rgba(0, 0, 0, 0.65);
	padding: 2rem;
	border-radius: 1rem;
}

/* Image dans le carrousel */
.splide__slide img {
	display: block;
	margin: 0 auto;
	max-width: 100%;
	width: auto;
	height: auto;
	max-height: 80vh;
	object-fit: contain;
	object-position: center;
	border-radius: 0.75rem;
	box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	cursor: zoom-in;
}

/* Hover (uniquement sur grands écrans) */
@media (hover: hover) and (pointer: fine) {
	.splide__slide img:hover {
		transform: scale(1.08);
		box-shadow: 0 0 25px rgba(255, 215, 0, 0.7);
	}
}

/* Responsive mobile */
@media (max-width: 768px) {
	.text-blur {
		padding: 1rem;
		font-size: 0.95rem;
	}

	.splide__track {
		padding: 1rem;
	}

	.splide__slide img {
		max-height: 60vh;
	}
}
</style>
