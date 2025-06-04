import { PUBLIC_API_URL } from '$env/static/public';
export const prerender = false;

export async function load({ params, fetch }) {
  const apiUrl = PUBLIC_API_URL;
  const id = params.id.trim(); // ✨ nettoyage

  const res = await fetch(`${apiUrl}/api/motos/${id}`);

  if (res.status === 404) {
    return {
      status: 404,
      error: new Error("Moto introuvable")
    };
  }

  if (!res.ok) {
    console.error('Erreur API:', await res.text());
    return {
      status: 500,
      error: new Error("Erreur serveur")
    };
  }

  const moto = await res.json();
  return { moto };
}
