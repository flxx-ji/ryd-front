import { PUBLIC_API_URL } from '$env/static/public';
export const prerender = false;

export async function load({ params, fetch }) {
  const apiUrl = PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/motos/${params.id}`);

  // 🛑 S'il ne trouve pas la moto, on renvoie une erreur claire à Svelte
  if (res.status === 404) {
    return {
      status: 404,
      error: new Error("Moto introuvable")
    };
  }

  // 🛑 Si c’est une autre erreur
  if (!res.ok) {
    return {
      status: 500,
      error: new Error("Erreur serveur")
    };
  }

  const moto = await res.json();
  return { moto };
}
