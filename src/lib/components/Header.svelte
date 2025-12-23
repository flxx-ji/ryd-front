<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let menuOpen = false;
  let scrolled = false;

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Catalogue', href: '/catalogue' },
    { name: 'Custom', href: '/custom' },
    { name: 'Evenements', href: '/events' },
    { name: 'À propos', href: '/apropos' }
  ];

  $: current = $page.url.pathname;

  function handleScroll() {
    scrolled = window.scrollY > 10;
  }

  onMount(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<header class="main-header" class:scrolled>
  <div class="left">
    <a class="logo" href="/">Free Torque</a>
  </div>

  {#if !menuOpen}
    <button class="menu-toggle" on:click={() => (menuOpen = true)} aria-label="Menu mobile">
      &#9776;
    </button>
  {/if}

  <nav class="nav-desktop" aria-label="Navigation principale">
    {#each links as link}
      <a class:selected={current === link.href} href={link.href}>{link.name}</a>
    {/each}
    <a class="cta-reserver" href="/catalogue">Réserver</a>
  </nav>

  <div class="mobile-nav" class:open={menuOpen} aria-hidden={!menuOpen}>
    <button class="close-button" on:click={() => (menuOpen = false)} aria-label="Fermer le menu">
      &times;
    </button>

    <nav aria-label="Navigation mobile">
      {#each links as link}
        <a
          class:selected={current === link.href}
          href={link.href}
          on:click={() => (menuOpen = false)}
        >
          {link.name}
        </a>
      {/each}

      <a class="cta-reserver mobile" href="/catalogue" on:click={() => (menuOpen = false)}>
        Réserver
      </a>
    </nav>
  </div>
</header>

<style>
  .main-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.4rem;
    color: white;
    z-index: 1000;

    background: rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid transparent;
    transition: background 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s ease;
    backdrop-filter: none;
  }

  .main-header.scrolled {
    background: rgba(10, 25, 60, 0.70); /* bleu sombre au scroll */
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(212, 175, 55, 0.18);
  }

  .logo {
    font-size: 1.2rem;
    font-weight: 800;
    color: #D4AF37;
    text-decoration: none;
    letter-spacing: 0.04em;
  }

  .nav-desktop {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .nav-desktop a {
    color: rgba(255, 255, 255, 0.88);
    text-decoration: none;
    font-weight: 700;
    transition: color 0.2s, border-bottom 0.2s;
    padding-bottom: 6px;
    border-bottom: 2px solid transparent;
  }

  .nav-desktop a:hover,
  .nav-desktop a.selected {
    color: #D4AF37;
    border-bottom: 2px solid #D4AF37;
  }

  .cta-reserver {
    margin-left: 0.6rem;
    background: #D4AF37;
    color: #000 !important;
    border-radius: 10px;
    padding: 10px 14px;
    border: 1px solid rgba(212, 175, 55, 0.35);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.85rem;
  }

  .cta-reserver:hover {
    box-shadow: 0 0 14px rgba(212, 175, 55, 0.35);
    filter: brightness(1.02);
  }

  .menu-toggle {
    display: none;
    font-size: 2rem;
    cursor: pointer;
    color: #D4AF37;
    background: transparent;
    border: none;
    z-index: 99999;
  }

  .mobile-nav {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateX(100%);
    transition: transform 0.35s ease-in-out;
    z-index: 10000;
  }

  .mobile-nav.open {
    transform: translateX(0);
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    font-size: 2rem;
    color: #D4AF37;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .mobile-nav nav {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    align-items: center;
  }

  .mobile-nav a {
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 800;
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;
    padding-bottom: 6px;
  }

  .mobile-nav a:hover,
  .mobile-nav a.selected {
    color: #D4AF37;
    border-bottom: 2px solid #D4AF37;
  }

  .cta-reserver.mobile {
    margin-top: 0.8rem;
    font-size: 1.1rem;
    padding: 12px 18px;
  }

  @media (max-width: 768px) {
    .nav-desktop {
      display: none;
    }
    .menu-toggle {
      display: block;
    }
  }
</style>
