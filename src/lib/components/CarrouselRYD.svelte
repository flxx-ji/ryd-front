<!-- src/lib/components/CarrouselRYD.svelte -->
<script>
  import { onMount } from 'svelte';
  import Splide from '@splidejs/splide';
  import * as basicLightbox from 'basiclightbox';

  // ✅ Liste des images à afficher
  export let images = [];

  // ✅ Optionnel plus tard (autoplay, perPage, etc.)
  export let autoplay = true;
  export let interval = 3000;

  onMount(() => {
    new Splide('.splide', {
      type: 'loop',
      perPage: 1,
      autoplay,
      interval,
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

<div class="splide max-w-6xl mx-auto mt-8 rounded-xl overflow-hidden shadow-xl">
  <div class="splide__track">
    <ul class="splide__list">
      {#each images as img}
        <li class="splide__slide cursor-pointer">
          <img
            src={img}
            alt="Image événement"
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
    box-shadow: 0 0 25px rgba(0,0,0,0.8);
  }

  .splide__track {
    background-color: rgba(0, 0, 0, 0.65);
    padding: 2rem;
    border-radius: 1rem;
  }
</style>
