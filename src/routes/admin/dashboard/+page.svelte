<script>
	// 🔁 Import des fonctions utiles
	import { onMount } from 'svelte'; // Hook qui s’exécute au chargement du composant
	import { goto } from '$app/navigation'; // Pour rediriger si l’admin n’est pas connecté

	// 📌 Variable pour afficher le nom de l'admin
	let adminNom = '';

	// 🧠 Quand le composant est monté...
	onMount(() => {
		// 🔐 On récupère le token et le nom de l’admin stockés dans le navigateur
		const token = localStorage.getItem('adminToken');
		const nom = localStorage.getItem('adminNom');

		// 🚨 Si pas de token → on redirige vers la page de connexion
		if (!token) {
			goto('/admin/login');
		} else {
			// ✅ Sinon, on garde le nom en mémoire pour l’afficher
			adminNom = nom || 'Admin';
		}
	});

	// 🔚 Fonction de déconnexion
	const logout = () => {
		// 🔒 On efface le token + nom
		localStorage.removeItem('adminToken');
		localStorage.removeItem('adminNom');

		// 🔁 Et on retourne sur la page de login
		goto('/admin/login');
	};
</script>

<!-- 💅 HEAD : on importe Bootstrap pour avoir un style pro sans se fatiguer -->
<svelte:head>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-4V6mZ2+LkM7Ee6W2eZC4TCXfMZOrT+V3gx5+Ns9vmckKxN4nvW5QmfBbJKQn/h8R"
		crossorigin="anonymous"
	/>
</svelte:head>

<!-- 🧱 CONTENU PRINCIPAL DU DASHBOARD -->
<div class="container py-5 text-center">
	<!-- 👋 Message de bienvenue -->
	<h1 class="mb-4 text-warning">Bienvenue, {adminNom} 👋</h1>
	<p class="mb-4">Voici le tableau de bord administrateur.</p>

	<!-- 🎛️ Cartes de navigation vers les différentes sections -->
	<div class="row justify-content-center g-4">
		<!-- 📦 Gérer les motos -->
		<div class="col-md-4">
			<div class="card shadow-sm">
				<div class="card-body">
					<h5 class="card-title">📦 Motos</h5>
					<p class="card-text">Gérer les motos disponibles à la location.</p>
					<a href="/admin/motos" class="btn btn-primary w-100">Accéder</a>
				</div>
			</div>
		</div>

		<!-- 👤 Gérer les clients -->
		<div class="col-md-4">
			<div class="card shadow-sm">
				<div class="card-body">
					<h5 class="card-title">👤 Clients</h5>
					<p class="card-text">Voir les informations et messages des clients.</p>
					<a href="/admin/clients" class="btn btn-primary w-100">Accéder</a>
				</div>
			</div>
		</div>

		<!-- 📅 Gérer les réservations -->
		<div class="col-md-4">
			<div class="card shadow-sm">
				<div class="card-body">
					<h5 class="card-title">📅 Réservations</h5>
					<p class="card-text">Consulter et gérer les réservations en cours.</p>
					<a href="/admin/reservations" class="btn btn-primary w-100">Accéder</a>
				</div>
			</div>
		</div>
	</div>

	<!-- 🔚 Bouton de déconnexion -->
	<button on:click={logout} class="btn btn-danger mt-5">Se déconnecter</button>
</div>
