 
<script>
	// import TitreChicanos from '$lib/components/TitreChicanos.svelte';
	import { onMount } from 'svelte';

	const baseURL = import.meta.env.VITE_API_URL;

	 

	let titreImage = `${baseURL}/uploads/Services2X.webp`;

	onMount(() => {
		// document.body.style.backgroundImage = "url('http://localhost:5001/uploads/services2.webp')";

		document.body.style.backgroundImage = `url('${baseURL}/uploads/services2.webp')`;
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundPosition = 'center';
		document.body.style.backgroundAttachment = 'fixed';
	});
</script>

<div class="titre-wrapper">
	<h1 class="titre-stroke">Services</h1>
	<h1 class="titre-fill">Services</h1>
</div>

<!-- <TitreChicanos text="Services" /> -->

<!-- <div class="content-blur-texte">
	<h2>Nos Services</h2>
	<p class="slogan">Entretien, custom & expérience deux-roues</p>
</div> -->


<!-- Bloc service 1 : Vidange -->
<div class="service-blur">
	<!-- <img src="http://localhost:5001/uploads/motorbike-407186_1280.webp" alt="Vidange moto" class="service-img" /> -->
	<img src={`${baseURL}/uploads/motorbike-407186_1280.webp`} alt="Vidange moto" class="service-img" />
	<div class="service-text">
		<h2>Vidange moto</h2>
		<p>
			Un moteur sain est un moteur entretenu.<br />
			Nous réalisons la vidange complète de votre moto avec des huiles haut de gamme adaptées à votre machine.
			<br />Sur place, sans rendez-vous ou sur réservation.
		</p>
	</div>
</div>

<!-- Bloc service 2 : Pneus -->
<div class="service-blur">
	<!-- <img src="http://localhost:5001/uploads/duc-van-2EeVtfFi4G8-unsplash.webp" alt="Changement pneus" class="service-img" /> -->

	<img src={`${baseURL}/uploads/duc-van-2EeVtfFi4G8-unsplash.webp`} alt="Changement pneus" class="service-img" />
	<div class="service-text">
		<h2>Changement de pneus</h2>
		<p>
			Que ce soit pour une Harley, une Vespa ou une Triumph, nous montons vos pneus avec soin et équilibre.<br />
			Pneus homologués route, adaptés à votre style de conduite.
		</p>
	</div>
</div>

<style>
    	 .content-blur-texte {
	max-width: 950px;
	margin: 0 auto 5rem auto;
	padding: 2rem;
	backdrop-filter: blur(10px);
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: 16px;
	color: #D4AF37;
	box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
	text-align: center;
}
h1, h2, h3 {
		text-shadow: 1px 1px 3px #000;
		font-weight: bold;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}
.slogan {
	font-size: 1.2rem;
	margin-bottom: 2rem;
	color: #FFD700;
	text-shadow: 1px 1px 2px #000;
}

 
	.service-blur {
		max-width: 1100px;
		margin: 2rem auto;
		display: flex;
		flex-direction: row;
		gap: 2rem;
		padding: 2rem;
		backdrop-filter: blur(12px);
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		align-items: center;
		flex-wrap: wrap;
	}

	.service-img {
		width: 300px;
		height: 200px;
		object-fit: cover;
		border-radius: 0.5rem;
		box-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
		flex-shrink: 0;
	}

	.service-text {
		flex: 1;
		color: #FFD700;
		text-shadow: 1px 1px 2px #000;
	}

	.service-text h2 {
		font-size: 1.8rem;
		margin-bottom: 0.5rem;
	}

	.service-text p {
		font-size: 1.1rem;
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.service-blur {
			flex-direction: column;
			text-align: center;
		}

		.service-img {
			width: 100%;
			height: auto;
		}
	}
</style>