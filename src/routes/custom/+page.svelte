<script>
	import TitreChicanos from '$lib/components/TitreChicanos.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL } from '$env/static/public';


	const baseURL = PUBLIC_API_URL;

	onMount(() => {
		document.body.style.backgroundImage = `url('${baseURL}/uploads/garageCustom.webp')`;
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundPosition = 'center';
		document.body.style.backgroundAttachment = 'fixed';
	});
</script>

<!-- ✅ Titre stylisé identique à Home -->
<TitreChicanos text="Custom" />

<!-- ✅ Texte flouté avec contenu -->
<div class="text-blur">
	<h2 class="text-xl md:text-2xl font-bold text-gold text-center mb-4">
		Préparation & Customisation
	</h2>

	<p class="mb-4">
		Chaque moto est unique, et chaque rider mérite une machine à son image.
		Nous vous accompagnons dans la transformation complète de votre moto, selon vos envies et vos besoins techniques.
	</p>

	<ul class="list-disc list-inside space-y-2 text-sm md:text-base">
		<li><strong>Demande de puissance :</strong> étude et configuration pour maximiser les performances moteur</li>
		<li><strong>Optimisation moteur :</strong> réglages fins pour améliorer couple, reprise et rendement</li>
		<li><strong>Contrat Poivre Noir :</strong> service exclusif incluant suivi moteur et entretien premium</li>
		<li><strong>Stage 1, 2, 3 :</strong> installation conforme aux normes Harley et performances garanties</li>
		<li><strong>Banc de puissance :</strong> tests en temps réel pour valider chaque modification moteur</li>
		<li><strong>Montage & équipement sur mesure :</strong> selle, guidon, phares, échappement... vous choisissez, nous montons</li>
	</ul>

	<p class="mt-6 italic text-center text-sm">
		Tarifs sur demande – Chaque projet est unique, le prix aussi
	</p>
</div>

<style>
	.text-blur {
		max-width: 900px;
		margin: 2rem auto;
		padding: 2rem;
		backdrop-filter: blur(12px);
		background-color: rgba(0, 0, 0, 0.65);
		border-radius: 1rem;
		color: #FFD700;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
		line-height: 1.6;
		text-shadow: 1px 1px 2px #000;
	}
</style>
