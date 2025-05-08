// 📦 Centralise les accès au token d'admin
export const getAdminToken = () => localStorage.getItem('adminToken');
export const setAdminToken = (token: string) => localStorage.setItem('adminToken', token);
export const removeAdminToken = () => localStorage.removeItem('adminToken');
