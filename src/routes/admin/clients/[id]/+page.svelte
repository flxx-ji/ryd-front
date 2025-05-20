<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { getAdminToken } from '$lib/utils/auth'; // ✅ Centralisation du token

	let client = null;
	let loading = true;
	let error = '';

	const id = $page.params.id;

	// ✅ Charger les infos du client dès l’arrivée
	onMount(async () => {
		try {
			const token = getAdminToken();
			// const res = await fetch(`http://localhost:5001/api/admin/clients/${id}`, {
			const res = await fetch(`https://ryd-backend2-iryz.onrender.com/api/admin/clients/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (!res.ok) throw new Error("Erreur lors du chargement du client");
			client = await res.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	// 🔁 Fonction de mise à jour
	async function updateClient() {
		try {
			const token = getAdminToken();
			// const res = await fetch(`http://localhost:5001/api/admin/clients/${id}`, {
			const res = await fetch(`https://ryd-backend2-iryz.onrender.com/api/admin/clients/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(client)
			});

			if (!res.ok) throw new Error("Échec de la mise à jour");
			alert("✅ Client mis à jour avec succès !");
		} catch (err) {
			error = err.message;
		}
	}

	// 🗑️ Suppression du client
	async function supprimerClient() {
		const confirmation = confirm("❗ Es-tu sûr de vouloir supprimer ce client ?");
		if (!confirmation) return;

		try {
			const token = getAdminToken();
			// const res = await fetch(`http://localhost:5001/api/admin/clients/${id}`, {
			const res = await fetch(`https://ryd-backend2-iryz.onrender.com/api/admin/clients/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (!res.ok) throw new Error("Erreur lors de la suppression");
			alert("🗑️ Client supprimé avec succès !");
			goto('/admin/clients');
		} catch (err) {
			error = err.message;
		}
	}
</script>
