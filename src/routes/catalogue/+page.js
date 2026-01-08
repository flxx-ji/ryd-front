// src/routes/catalogue/+page.js
import { PUBLIC_API_URL2 } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const prerender = false;

export async function load({ fetch }) {
  const baseURL = PUBLIC_API_URL2;

  const res = await fetch(`${baseURL}/api/motos`);
  if (!res.ok) {
    throw error(res.status, 'Impossible de récupérer les motos');
  }

  // ✅ IMPORTANT : on renvoie une PROMISE (pas de await ici)
  return {
    motos: res.json()
  };
}
