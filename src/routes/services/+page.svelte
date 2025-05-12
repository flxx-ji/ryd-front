 
<script>
	import { onMount } from 'svelte';
	let titreImage = "http://localhost:5001/uploads/ServicesF.webp";

	onMount(() => {
		document.body.style.backgroundImage = "url('http://localhost:5001/uploads/services2.webp')";
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundPosition = 'center';
		document.body.style.backgroundAttachment = 'fixed';
	});
</script>

<div class="titre-section">
	<img src={titreImage} alt="Services" class="titre" />
</div>
<div class="text-blur">
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>