<script>
  import TitreChicanos from '$lib/components/TitreChicanos.svelte';
  import MotoCard from '$lib/components/MotoCard.svelte';
  import { onMount } from 'svelte';
  import { PUBLIC_API_URL2 } from '$env/static/public';

  export let data;
  const baseURL = PUBLIC_API_URL2;

  let motos = data.motos ?? [];

  let loading = true;
  let slow = false;
  let error = null;

  onMount(async () => {
    // ⚠️ Si tes backgrounds sont gérés dans +layout.svelte, supprime ce bloc.
    // Sinon tu peux le garder :
    document.body.style.backgroundImage = `url('${baseURL}/uploads/catalogue2.webp')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';

    // ✅ cache mémoire (retour catalogue instant)
    const cache = globalThis.__CATALOGUE_CACHE__;
    if (cache?.length) {
      motos = cache;
      loading = false;
      return;
    }

    loading = true;
    error = null;

    const slowTimer = setTimeout(() => {
      slow = true;
    }, 2500);

    try {
      // ✅ adapte l’endpoint si besoin
      const res = await fetch(`${baseURL}/api/motos`);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      motos = await res.json();
      globalThis.__CATALOGUE_CACHE__ = motos; // save cache
    } catch (e) {
      error = e?.message ?? 'Erreur pendant le chargement du catalogue';
    } finally {
      clearTimeout(slowTimer);
      slow = false;
      loading = false;
    }
  });
</script>

<TitreChicanos text="Catalogue" />

<section class="catalogue-wrap">
  {#if loading}
    <p class="status">Chargement du catalogue…</p>
    {#if slow}
      <p class="status soft">Le serveur répond lentement, on continue…</p>
    {/if}

    <!-- mini skeleton simple -->
    <div class="catalogue">
      {#each Array.from({ length: 6 }) as _}

        <div class="skeleton-card"></div>
      {/each}
    </div>

  {:else if error}
    <p class="status error">Erreur : {error}</p>

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
  .status.soft { opacity: 0.8; }
  .status.error { color: #ffb3b3; }

  .skeleton-card{
    width: 100%;
    max-width: 360px;
    height: 320px;
    border-radius: 16px;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.08);
    animation: pulse 1.2s ease-in-out infinite;
  }

  @keyframes pulse{
    0% { opacity: .55; }
    50% { opacity: .9; }
    100% { opacity: .55; }
  }
</style>
