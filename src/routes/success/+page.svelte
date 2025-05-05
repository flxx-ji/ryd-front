<script>
	import { page } from '$app/stores';

	const moto = $page.url.searchParams.get('moto') || 'une moto';
	const debut = $page.url.searchParams.get('debut');
	const fin = $page.url.searchParams.get('fin');
	const prix = $page.url.searchParams.get('prix');
</script>

<div class="success-page">
	<h1 class="title">🎉 Réservation confirmée !</h1>
	<p>Merci pour votre confiance. Votre location de <strong>{moto}</strong> a bien été prise en compte.</p>
	<p>📅 <strong>Du :</strong> {debut} <strong>au</strong> {fin}</p>
	<p>💳 <strong>Montant payé :</strong> {prix} €</p>

	<a href="/" class="return-btn">Retour à l'accueil</a>
</div>

<style>
	.success-page {
		padding: 2rem;
		text-align: center;
		max-width: 600px;
		margin: auto;
	}
	.title {
		font-size: 2rem;
		color: green;
		margin-bottom: 1rem;
	}
	.return-btn {
		margin-top: 2rem;
		display: inline-block;
		background-color: #04C9AF;
		color: white;
		padding: 10px 20px;
		border-radius: 8px;
		text-decoration: none;
	}
</style>
