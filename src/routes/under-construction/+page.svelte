<script>
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.style.backgroundColor = '#000';
		document.body.style.backgroundImage = 'none';
	});
</script>

<svelte:head>
	<title>Ride Your Dream – En construction</title>
</svelte:head>

<style>
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(-50px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.fade-up {
		animation: fadeInUp 1s ease-out forwards;
	}

	.slide-in {
		animation: slideIn 1.2s ease-out forwards;
	}

	/* ✅ Doré mat + relief discret */
	.text-glow {
		color: #D4AF37;
		text-shadow: 0.5px 0.5px 1px #000;
	}

	/* ✅ Glow plus doux au hover */
	.glow-button {
		border: 2px solid #D4AF37;
		color: #D4AF37;
		transition: all 0.3s ease-in-out;
		box-shadow: 0 0 0 transparent;
	}

	.glow-button:hover {
		background-color: #D4AF37;
		color: #000;
		box-shadow: 0 0 6px #D4AF37;
	}
</style>


<section class="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
	<!-- LOGO POSTER -->
	<img src="/images/logos/poster-under-construction.jpg" alt="Poster RYD"
		class="w-full max-w-3xl fade-up rounded-md shadow-xl mb-8" />

	<!-- TEXTE PAR-DESSUS -->
	<div class="space-y-4">
		<h1 class="text-3xl sm:text-5xl font-bold slide-in text-glow">
			Le rêve est en cours de fabrication...
		</h1>

		<p class="text-lg sm:text-xl font-medium slide-in text-glow"
			style="animation-delay: 0.3s; animation-fill-mode: both;">
			Nos bécanes sont presque prêtes à rugir.  
			<br />Reviens bientôt pour découvrir nos modèles custom & services exclusifs.
		</p>

		<a href="tel:0623980730"
			class="inline-block px-6 py-3 rounded-md font-semibold text-xl slide-in glow-button"
			style="animation-delay: 0.6s; animation-fill-mode: both;">
			06 23 98 07 30
		</a>
	</div>
</section>



<!-- <h1 class="text-[clamp(2rem,5vw,4rem)] font-extrabold text-center uppercase"
	style="
		color: #D4AF37;
		text-shadow: 1px 1px 2px black;
	">
	Ride Your Dream
</h1> -->
