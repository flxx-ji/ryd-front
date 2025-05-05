<script>
	// 🔁 Import de la fonction de navigation (pour rediriger)
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	// 🔐 Variables liées au formulaire
	let email = '';
	let password = '';

	// 📍 Gestion des états
	let error = '';       // message d’erreur à afficher
	let loading = false;  // état de chargement du bouton

	// 🚀 Fonction appelée au clic sur "Se connecter"
	const handleLogin = async () => {
		error = '';         // reset des erreurs
		loading = true;     // on passe en mode chargement

		try {
			// 🛰️ Requête POST vers ton backend
			const res = await fetch('http://localhost:5001/api/admin/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			// 🔎 Résultat de la requête
			const data = await res.json();

			if (!res.ok) {
				// ⚠️ En cas d'erreur côté backend
				error = data.message || 'Erreur lors de la connexion.';
				return;
			}

			// ✅ Connexion réussie → stockage du token + redirection
			localStorage.setItem('adminToken', data.token);
			localStorage.setItem('adminNom', data.nom);

			// ⏩ Redirection vers le dashboard admin
			goto('/admin/dashboard');
		} catch (err) {
			error = 'Erreur réseau ou serveur';
		} finally {
			loading = false;
		}
	};
</script>

<!-- 🧠 Meta pour l'onglet navigateur -->
<svelte:head>
	<title>Connexion Admin</title>
</svelte:head>

<!-- 💻 Interface de connexion -->
<div class="login-container">
	<h1>🔐 Connexion Admin</h1>

	<!-- Champ email -->
	<input
		type="email"
		placeholder="Email"
		bind:value={email}
		required
	/>

	<!-- Champ mot de passe -->
	<input
		type="password"
		placeholder="Mot de passe"
		bind:value={password}
		required
	/>

	<!-- Message d’erreur si existant -->
	{#if error}
		<p class="error">{error}</p>
	{/if}

	<!-- Bouton de connexion -->
	<button on:click={handleLogin} disabled={loading}>
		{#if loading}
			Connexion...
		{:else}
			Se connecter
		{/if}
	</button>
</div>

<!-- 🎨 Styles -->
<style>
	.login-container {
		max-width: 400px;
		margin: auto;
		padding: 2rem;
		text-align: center;
	}
	input {
		display: block;
		margin: 1rem auto;
		padding: 0.75rem;
		width: 100%;
	}
	button {
		padding: 0.75rem 1.5rem;
		background-color: #041d80;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}
	.error {
		color: red;
		margin-top: 1rem;
	}
</style>
