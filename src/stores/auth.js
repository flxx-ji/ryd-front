import { writable } from 'svelte/store';

// token admin (JWT)
export const adminToken = writable(
  typeof localStorage !== 'undefined'
    ? localStorage.getItem('adminToken')
    : null
);

// synchronisation avec localStorage
adminToken.subscribe((value) => {
  if (typeof localStorage === 'undefined') return;

  if (value) {
    localStorage.setItem('adminToken', value);
  } else {
    localStorage.removeItem('adminToken');
  }
});
