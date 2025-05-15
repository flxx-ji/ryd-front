// +page.js
// Ce fichier permet de faire le fetch des motos côté serveur (SSR)
// et injecter les données dans +page.svelte via la prop "data"

export async function load() {
	try {
		const baseURL = import.meta.env.VITE_API_URL;

		// 🔄 Appel API pour récupérer les motos
		const res = await fetch(`${baseURL}/api/motos`);

		// 📦 On vérifie que tout est OK
		if (!res.ok) {
			console.error('Erreur API:', res.statusText);
			throw new Error('Erreur serveur - impossible de récupérer les motos');
		}

		const motos = await res.json();

		// 🧠 On retourne les données au composant Svelte
		return { motos };
	} catch (error) {
		console.error('Erreur côté serveur :', error);
		return {
			status: 500,
			error: new Error('Erreur côté serveur - catalogue')
		};
	}
}
