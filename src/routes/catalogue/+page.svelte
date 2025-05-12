<script>
	import MotoCard from '$lib/components/MotoCard.svelte';
	import { onMount } from 'svelte';

	let titreImage = "http://localhost:5001/uploads/CatalogueF.webp";
	let motos = [];

	onMount(() => {
		document.body.style.backgroundImage = "url('http://localhost:5001/uploads/catalogue2.webp')";
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundPosition = 'center';
		document.body.style.backgroundAttachment = 'fixed';

		fetchMotos();
	});

	const fetchMotos = async () => {
		const res = await fetch('http://localhost:5001/api/motos');
		motos = await res.json();
	};
</script>

 
<div class="page-section">
	<div class="titre-section">
		<img src={titreImage} alt="Catalogue" class="titre" />
	</div>

	<div class="catalogue">
		{#each motos as moto}
			<MotoCard {moto} />
		{/each}
	</div>
</div>


<style>
   :global(body) {
	margin: 0;
	padding: 0;
}

.page-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0;
	margin-top: 0;
}

.titre-section {
  display: flex;
  justify-content: center;
  align-items: center; /* centrer verticalement */
  height: 160px; /* comme sur ta maquette */
  margin-bottom: 1rem; /* ou ce que tu veux */
  width: 100%;
}

.titre {
  height: auto;
  max-height: 120px; /* Ajuste ici selon ton besoin visuel */
  width: auto;
  object-fit: contain;
}




.catalogue {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	justify-items: center;
	gap: 2rem;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding-top: 0;
    border: 1px dashed blue;
}



</style>