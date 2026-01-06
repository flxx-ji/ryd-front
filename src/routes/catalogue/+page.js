// src/routes/catalogue/+page.js
export const ssr = false;
export const prerender = false;

export function load() {
  // on laisse le client gérer le fetch (onMount dans +page.svelte)
  return { motos: [] };
}
