import { PUBLIC_API_URL2 } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const prerender = false;

export async function load({ fetch }) {
  const baseURL = PUBLIC_API_URL2;

  console.log('CATALOGUE SSR fetch =>', `${baseURL}/api/motos`);

  const res = await fetch(`${baseURL}/api/motos`);

  if (!res.ok) {
    throw error(res.status, `Erreur API motos: ${res.status}`);
  }

  const motos = await res.json();
  return { motos };
}
