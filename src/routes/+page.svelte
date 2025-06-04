
 <script>
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	 


	const baseURL =  PUBLIC_API_URL;

	// let titreImage = "http://localhost:5001/uploads/Ride-Your-Dream-Custom-Motorcyle-F.webp";

	let titreImage = `${baseURL}/uploads/Ride your Dreams Custom MotorcycleQ.png`;
	let title = '';
	let description = '';

	onMount(async () => {
		try {
			// const res = await fetch('http://localhost:5001/api/pages/home');
			const res = await fetch(`${baseURL}/api/pages/home`);
			const data = await res.json();
			title = data.title;
			description = data.description;

			// document.body.style.backgroundImage = "url('http://localhost:5001/uploads/home2.webp')";

			document.body.style.backgroundImage = `url('${baseURL}/uploads/home2.webp')`;
			document.body.style.backgroundSize = 'cover';
			document.body.style.backgroundRepeat = 'no-repeat';
			document.body.style.backgroundPosition = 'center';
			document.body.style.backgroundAttachment = 'fixed';

			document.body.style.backgroundColor = 'transparent';
		} catch (err) {
			console.error("Erreur chargement page home :", err);
		}
	});
</script>

<!-- TITRE IMAGE -->
<!-- TITRE CHICANOS SUPERPOSÉ -->
<div class="titre-wrapper">
	<h1 class="titre-stroke">Ride Your Dreams Custom Motorcycle</h1>
	<h1 class="titre-fill">Ride Your Dreams Custom Motorcycle</h1>
</div>


<!-- CONTENU ENCADRÉ + BLUR -->
<div class="content-blur-texte">
	{#if title}
		<h1>{title}</h1>
	{/if}
	{#if description}
		<p>{description}</p>
	{/if}

	<button on:click={() => window.location.href = '/catalogue'}>
		Explorer notre catalogue
	</button>

	<section class="text-content">
	  <h2>Présentation Officielle de Ride Your Dreams</h2>
	  <p class="slogan">Liberté, découverte et culture motarde</p>

	  <h3>🏍️ Notre histoire</h3>
	  <p>
		Ride Your Dreams est né d’une frustration personnelle : celle de ne pas pouvoir rouler à moto dans les plus beaux paysages du Sud pendant les vacances
		Cette sensation de manque, entre routes côtières, virages en montagne et villages pittoresques, a donné naissance à une idée simple mais forte : offrir à chacun la possibilité de vivre la route
		C’est ainsi qu’est née Ride Your Dreams Custom Motorcycles, une entreprise basée à Toulon, dans le Var, dédiée à la location de motos exclusives, à la customisation, à l’organisation de balades sur mesure, et bien plus encore
	  </p>

	  <h3>🚀 Notre mission</h3>
	  <p>
		Chez Ride Your Dreams, nous ne nous contentons pas de louer des motos
		Nous proposons une expérience complète : un art de vivre, une connexion avec le territoire, une immersion culturelle et humaine
		Nous voulons rendre à la moto ce qu’elle nous a offert : de la liberté, de l’estime, des rencontres, un chemin de vie
	  </p>

	  <h3>🔧 Ce que nous faisons</h3>
	  <p><strong>🏍️ Location de motos premium</strong> – Harley-Davidson, Triumph, Vespa, Ducati… Nous sélectionnons des motos iconiques, puissantes, élégantes, à fort caractère. Pour un jour, un week-end ou plus, chaque client repart avec des sensations uniques et des souvenirs forts</p>
	  <p><strong>🛠️ Customisation & préparation</strong> – Nous préparons les motos selon les rêves et les usages :
	  customisation esthétique, optimisation moteur, lignes d’échappement responsables, solutions techniques réduisant les émissions polluantes
	  Notre philosophie : préserver l’émotion de conduite, tout en respectant notre environnement</p>
	  <p><strong>🌍 Balades et expériences exclusives</strong> – Nous organisons des circuits personnalisés à travers le Var, la région PACA, la Corse, et bientôt le Maroc
	  Ces balades mettent en avant le terroir, les producteurs locaux, les lieux authentiques, et créent un vrai lien entre les motards et le territoire</p>

	  <h3>🌟 Un lieu de vie motard unique</h3>
	  <p>
		Notre local à Toulon est bien plus qu’un point de départ pour des balades
		✂️ Barber shop & studio tatouage – Un espace dédié au style, à l’expression de soi, et à l’art motard
		Nous accueillons régulièrement des tatoueurs invités, venus de toute la France et de l’étranger, autour d’événements moto et culturels
	  </p>

	  <h3>🎹 Radio / Podcast RYD</h3>
	  <p>
		Nous lançons prochainement une plateforme dédiée aux voix du monde motard
		Des invités issus des compétitions, de l’aventure, de la préparation ou de la création partageront leur parcours, leurs émotions, leurs histoires
		Un espace de témoignages vrais, inspirants, humains
	  </p>

	  <h3>🌟 Notre vision</h3>
	  <p>
		Chaque moto raconte une histoire. Notre rôle est de permettre aux gens d’écrire la leur
		Nous voulons faire de Ride Your Dreams un référent lifestyle dans le monde du deux-roues, mêlant prestige, culture, territoire et communauté
		Notre ambition : créer un lieu où la passion prend vie, où les routes deviennent des scènes, et où chaque rencontre devient un souvenir
	  </p>

	  <h3>🤝 Nos partenaires & soutiens</h3>
	  <p>
		RCT – Rugby Club Toulonnais (en cours de demande)<br />
		Sollen Design<br />
		Le D’Artagnan – Auberge de Paris<br />
		Dockside Toulon & Dockside Comedy Club<br />
		Comité Miss Bordeaux<br />
		The View Agency / The Studio<br />
		L'école IBSM Bordeaux<br />
		La Méridionale – Ferry pour la Corse & le Maroc<br />
		Et de nombreux artisans, créateurs, producteurs et passionnés locaux
	  </p>

	  <h3>🏎️ Notre slogan signature</h3>
	  <p class="italic">
		Ride Your Dreams, c’est bien plus qu’une moto : c’est la liberté, la découverte, et une immersion culturelle sur les routes du Sud
		Chaque balade est une aventure humaine, entre prestige, passion et art de vivre motard
	  </p>
	</section>
</div>

<style>
	 
 



	.content-blur-texte {
		max-width: 950px;
		margin: 0 auto 5rem auto;
		padding: 2rem;
		backdrop-filter: blur(10px);
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 16px;
		color: #D4AF37;
		box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
	}

	h1, h2, h3 {
		text-shadow: 1px 1px 3px #000;
		font-weight: bold;
	}

	h1 {
		font-size: 4.5rem;
		margin-bottom: 1rem;
	}

	.slogan {
		font-size: 1.2rem;
		margin-bottom: 2rem;
		color: #FFD700;
		text-shadow: 1px 1px 2px #000;
	}

	.text-content p, ul, li {
		font-size: 1.1rem;
		line-height: 1.8;
		margin-bottom: 1rem;
		text-shadow: 1px 1px 2px #000;
	}

	.text-content ul {
		list-style: disc;
		padding-left: 1.5rem;
	}

	button {
		background-color: #D4AF37;
		color: white;
		border: none;
		padding: 12px 24px;
		font-size: 1rem;
		font-weight: bold;
		border-radius: 6px;
		cursor: pointer;
		margin-bottom: 2rem;
		transition: all 0.3s ease-in-out;
	}

	button:hover {
		background-color: #D4AF37;
		color: #000;
		box-shadow: 0 0 10px #D4AF37;
	}
</style>
