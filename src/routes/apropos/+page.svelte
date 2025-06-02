<script>
	import { onMount } from 'svelte';
	import TitreChicanos from '$lib/components/TitreChicanos.svelte';
	 


	const baseURL = import.meta.env.PUBLIC_API_URL;

	onMount(() => {
		document.body.style.backgroundImage = `url('${baseURL}/uploads/apropos2.webp')`;
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundPosition = 'center';
		document.body.style.backgroundAttachment = 'fixed';
	});
</script>

<!-- ✅ Titre Chicanos unifié -->
<TitreChicanos text="À propos" />

<!-- ✅ Bloc de présentation -->
<div class="text-blur">
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
	</p>
</div>

<style>
	.text-blur {
		margin: 2rem auto;
		max-width: 800px;
		padding: 2rem;
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(8px);
		border-radius: 10px;
		color: #FFD700;
		font-size: 1.1rem;
		line-height: 1.6;
		text-align: center;
		text-shadow: 1px 1px 2px black;
		box-shadow: 0 0 12px rgba(0,0,0,0.5);
	}
</style>
