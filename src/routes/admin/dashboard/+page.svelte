<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let adminNom = ''; // 🧍 Nom de l’admin à afficher

	onMount(() => {
		// 🛡️ Vérifie si le token existe dans le localStorage
		const token = localStorage.getItem('adminToken');
		const nom = localStorage.getItem('adminNom');

		if (!token) {
			// 🚫 Pas de token → on redirige vers la page de login
			goto('/admin/login');
		} else {
			// ✅ Token trouvé → on peut afficher le tableau de bord
			adminNom = nom || 'Admin';
		}
	});

	const logout = () => {
		// 🔐 Suppression des infos d’authentification
		localStorage.removeItem('adminToken');
		localStorage.removeItem('adminNom');

		// ⏩ Retour vers la page de login
		goto('/admin/login');
	};
</script>

<!-- 💻 Interface tableau de bord -->
<div class="dashboard">
	<h1>Bienvenue, {adminNom} 👋</h1>

	<p>Voici le tableau de bord admin.</p>

	<!-- 🔚 Bouton de déconnexion -->
	<button on:click={logout}>Se déconnecter</button>
</div>

<style>
	.dashboard {
		padding: 2rem;
		text-align: center;
	}
	button {
		margin-top: 2rem;
		background-color: #cc0000;
		color: white;
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}
</style>
