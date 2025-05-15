<script>
	import { page } from '$app/stores';
	let menuOpen = false;

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'Services', href: '/services' },
		{ name: 'Catalogue', href: '/catalogue' },
		{ name: 'Custom', href: '/custom' },
		{ name: 'Evenements', href: '/events' },
		{ name: 'À propos', href: '/apropos' }
	];

	$: current = $page.url.pathname;
</script>

<header class="main-header">
	<div class="logo">Ride Your Dream</div>

	{#if !menuOpen}
		<!-- Burger -->
		<button class="menu-toggle" on:click={() => (menuOpen = true)} aria-label="Menu mobile">
			&#9776;
		</button>
	{/if}

	<!-- Desktop Navigation -->
	<nav class="nav-desktop">
		{#each links as link}
			<a class:selected={current === link.href} href={link.href}>{link.name}</a>
		{/each}
	</nav>

	<!-- NAVIGATION MOBILE FULLSCREEN -->
	<div class="mobile-nav" class:open={menuOpen}>
		<!-- CROIX -->
		<button class="close-button" on:click={() => (menuOpen = false)} aria-label="Fermer le menu">
			&times;
		</button>

		<nav>
			{#each links as link}
				<a class:selected={current === link.href} href={link.href} on:click={() => (menuOpen = false)}>
					{link.name}
				</a>
			{/each}
		</nav>
	</div>
</header>

<style>
	/* Header de base */
	.main-header {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background: black;
		color: white;
		z-index: 1000;
	}

	.logo {
		font-size: 1.3rem;
		font-weight: bold;
		color: #D4AF37;
	}

	/* Desktop */
	.nav-desktop {
		display: flex;
		gap: 1.5rem;
	}

	.nav-desktop a {
		color: white;
		text-decoration: none;
		font-weight: bold;
		transition: color 0.3s, border-bottom 0.3s;
	}

	.nav-desktop a:hover,
	.nav-desktop a.selected {
		color: #D4AF37;
		border-bottom: 2px solid #D4AF37;
	}

	/* Burger */
	.menu-toggle {
		display: none;
		font-size: 2rem;
		cursor: pointer;
		color: #D4AF37;
		background: transparent;
		border: none;
		z-index: 99999;
	}

	/* Mobile NAVIGATION */
	.mobile-nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.95);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transform: translateX(100%);
		transition: transform 0.4s ease-in-out;
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
		gap: 2rem;
		align-items: center;
	}

	.mobile-nav a {
		color: white;
		text-decoration: none;
		font-size: 1.6rem;
		font-weight: bold;
		transition: all 0.3s ease;
		border-bottom: 2px solid transparent;
	}

	.mobile-nav a:hover,
	.mobile-nav a.selected {
		color: #D4AF37;
		border-bottom: 2px solid #D4AF37;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.nav-desktop {
			display: none;
		}
		.menu-toggle {
			display: block;
		}
	}
</style>
