import { PUBLIC_API_URL2 } from '$env/static/public';

export const prerender = false;

export async function load({ fetch }) {
  const baseURL = PUBLIC_API_URL2;
  const res = await fetch(`${baseURL}/api/motos`);

  if (!res.ok) {
    throw new Error(`Erreur API motos: ${res.status}`);
  }

  const motos = await res.json();
  return { motos };
}
