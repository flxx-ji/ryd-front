import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
  const token = cookies.get('adminToken');

  // autoriser la page de login
  if (!token && url.pathname !== '/admin/login') {
    throw redirect(302, '/admin/login');
  }

  // si déjà connecté → pas de login
  if (token && url.pathname === '/admin/login') {
    throw redirect(302, '/admin');
  }
}
