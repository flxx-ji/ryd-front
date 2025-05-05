<script>
	import { goto } from '$app/navigation';

	const revenirAccueil = () => {
		goto('/');
	};
</script>

<div class="cancel-page">
	<h1 class="title">❌ Paiement annulé</h1>
	<p>Votre réservation a été interrompue ou annulée.</p>
	<p>Aucune somme n’a été prélevée.</p>
	<p>Vous pouvez revenir en arrière et réessayer à tout moment.</p>

	<button on:click={revenirAccueil}>Retour à l'accueil</button>
</div>

<style>
	.cancel-page {
		padding: 2rem;
		text-align: center;
		max-width: 600px;
		margin: auto;
	}
	.title {
		font-size: 2rem;
		color: #cc0000;
		margin-bottom: 1rem;
	}
	button {
		margin-top: 2rem;
		background-color: #666;
		color: white;
		padding: 10px 20px;
		border-radius: 8px;
		cursor: pointer;
		border: none;
	}
</style>
