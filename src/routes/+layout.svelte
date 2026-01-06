<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  import '../assets/app.css';
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  export const prerender = false;

  let unsubscribe;
  let showLayout = true;

  let headerEl;
  let ro;

  const BG = {
    '/': '/backgrounds/home.webp',
    '/services': '/backgrounds/services.webp',
    '/catalogue': '/backgrounds/catalogue.webp',
    '/custom': '/backgrounds/custom.webp',
    '/apropos': '/backgrounds/apropos.webp'
  };

  function setHeaderHeight() {
    if (!browser || !headerEl) return;
    const h = Math.ceil(headerEl.getBoundingClientRect().height);
    if (h > 0) document.documentElement.style.setProperty('--header-height', `${h}px`);
  }

  function applyBg(path) {
    if (!browser) return;

    const src = BG[path];

    if (src) {
      document.body.style.backgroundImage = `url('${src}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundColor = 'transparent';
    } else {
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = '#000';
    }
  }

  onMount(() => {
    if (!browser) return;

    requestAnimationFrame(() => {
      setHeaderHeight();
      ro = new ResizeObserver(setHeaderHeight);
      if (headerEl) ro.observe(headerEl);
    });

    // Précharge des backgrounds (simple, efficace)
    Object.values(BG).forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    unsubscribe = page.subscribe(($page) => {
      const path = $page.url.pathname;
      showLayout = path !== '/under-construction';

      if (showLayout) applyBg(path);
      else {
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
    width: 100%;
  }

  main{
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    color: #D4AF37;
    text-align: center;
    padding-top: calc(var(--header-height) + var(--page-top));
  }
</style>
