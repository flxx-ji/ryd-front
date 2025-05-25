<script>
	import { onMount } from 'svelte';

	const baseURL = import.meta.env.VITE_API_URL;

	// let titreImage = "http://localhost:5001/uploads/AproposF.webp";

	let titreImage = `${baseURL}/uploads/A propos2X.webp`;


	onMount(() => {
		// document.body.style.backgroundImage = "url('http://localhost:5001/uploads/apropos2.webp')";

		document.body.style.backgroundImage = `url('${baseURL}/uploads/apropos2.webp')`;
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundPosition = 'center';
		document.body.style.backgroundAttachment = 'fixed';
	});
</script>

<div class="titre-section">
	<img src={titreImage} alt="À propos" class="titre" />
</div>
<div class="text-blur">
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>

<style>
	.titre {
	width: clamp(320px, 70vw, 590px);
	height: auto;
	object-fit: contain;
	display: block;
}



	.text-blur {
		margin: 2rem auto;
		max-width: 800px;
		padding: 2rem;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(6px);
		border-radius: 10px;
		color: white;
		font-size: 1.1rem;
		line-height: 1.6;
		text-align: center;
		box-shadow: 0 0 10px rgba(0,0,0,0.5);
	}
</style>
