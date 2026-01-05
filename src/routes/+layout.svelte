<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  import '../assets/app.css';
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { PUBLIC_API_URL2 } from '$env/static/public';
  import { browser } from '$app/environment';

  export const prerender = false;

  const baseURL = PUBLIC_API_URL2;

  let unsubscribe;
  let showLayout = true;

  let headerEl;
  let ro;

  function setHeaderHeight() {
    if (!browser || !headerEl) return;
    const h = Math.ceil(headerEl.getBoundingClientRect().height);
    if (h > 0) document.documentElement.style.setProperty('--header-height', `${h}px`);
  }

  onMount(() => {
    if (!browser) return;

    requestAnimationFrame(() => {
      setHeaderHeight();
      ro = new ResizeObserver(setHeaderHeight);
      ro.observe(headerEl);
    });

    unsubscribe = page.subscribe(($page) => {
      const path = $page.url.pathname;
      showLayout = path !== '/under-construction';

      if (showLayout) {
        let backgroundUrl;

        switch (path) {
          case '/': backgroundUrl = `url('${baseURL}/uploads/home.webp')`; break;
          case '/services': backgroundUrl = `url('${baseURL}/uploads/services.webp')`; break;
          case '/catalogue': backgroundUrl = `url('${baseURL}/uploads/catalogue.webp')`; break;
          case '/custom': backgroundUrl = `url('${baseURL}/uploads/custom.webp')`; break;
          case '/apropos': backgroundUrl = `url('${baseURL}/uploads/apropos.webp')`; break;
          default: backgroundUrl = 'none';
        }

        document.body.style.backgroundImage = backgroundUrl;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundColor = 'transparent';
      } else {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = '#000';
      }

      requestAnimationFrame(setHeaderHeight);
    });
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
    if (ro) ro.disconnect();
  });
</script>

<div class="app">
  {#if showLayout}
    <div class="header-wrap" bind:this={headerEl}>
      <Header />
    </div>
  {/if}

  <main>
    <slot />
  </main>

  {#if showLayout}
    <Footer />
  {/if}
</div>

<style>
  .app{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .header-wrap{
    /* ton Header est déjà fixed, donc pas besoin sticky ici */
    width: 100%;
  }

  main{
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    color: #D4AF37;
    text-align: center;

    /* ✅ UN SEUL offset global */
    padding-top: calc(var(--header-height) + var(--page-top));
  }
</style>
