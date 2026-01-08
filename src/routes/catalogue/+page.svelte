<script>
  import TitreChicanos from '$lib/components/TitreChicanos.svelte';
  import MotoCard from '$lib/components/MotoCard.svelte';
  export let data;

  let motos = data.motos ?? [];
</script>

<TitreChicanos text="Catalogue" />

<section class="catalogue-wrap">
  {#if motos.length === 0}
    <p class="status">Aucune moto disponible.</p>
  {:else}
    <div class="catalogue">
      {#each motos as moto}
        <MotoCard {moto} />
      {/each}
    </div>
  {/if}
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

  .status {
    margin: 1rem 0 1.5rem;
    text-align: center;
    color: #D4AF37;
  }
</style>
