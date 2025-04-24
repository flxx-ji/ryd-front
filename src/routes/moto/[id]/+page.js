// src/routes/moto/[id]/+page.js
export async function load({ params, fetch }) {
    const res = await fetch(`http://localhost:5001/api/motos/${params.id}`);
    
    if (!res.ok) {
      throw new Error("Moto introuvable");
    }
  
    const moto = await res.json();
    return {
      moto
    };
  }
  