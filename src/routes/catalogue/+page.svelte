<script>
	import TitreChicanos from '$lib/components/TitreChicanos.svelte';
	import MotoCard from '$lib/components/MotoCard.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL2 } from '$env/static/public';

	export let data;
	const baseURL = PUBLIC_API_URL2;

	let motos = data.motos;

	onMount(() => {
		document.body.style.backgroundImage = `url('${baseURL}/uploads/catalogue2.webp')`;
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundPosition = 'center';
		document.body.style.backgroundAttachment = 'fixed';
	});
</script>

 
<!-- ✅ Liste des motos -->
<TitreChicanos text="Catalogue" />

<section class="catalogue-wrap">
  <div class="catalogue">
    {#each motos as moto}
      <MotoCard {moto} />
    {/each}
  </div>
</section>

<style>
  .catalogue-wrap {
    width: 100%;
    max-width: 1250px;
    margin: 0 auto;
    padding: 2rem 1rem 4rem;
  }

  .catalogue {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    align-items: stretch;
    justify-items: center;
  }
</style>

