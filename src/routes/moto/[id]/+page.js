// src/routes/moto/[id]/+page.js

import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ params, fetch }) {

  const apiUrl = PUBLIC_API_URL;

    // const res = await fetch(`http://localhost:5001/api/motos/${params.id}`);

    const res = await fetch(`${apiUrl}/api/motos/${params.id}`);
    
    if (!res.ok) {
      throw new Error("Moto introuvable");
    }
  
    const moto = await res.json();
    return {
      moto
    };
  }
  