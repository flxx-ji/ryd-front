/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const res = await fetch('http://localhost:5001/api/motos');
  
    if (!res.ok) {
      throw new Error("Erreur de chargement des motos");
    }
  
    const motos = await res.json();
  
    if (motos.length === 0) {
      throw new Error("Aucune moto disponible");
    }
  
    // Redirige vers la 1re moto trouvée
    return {
      status: 302,
      redirect: `/reservation/${motos[0]._id}`
    };
  }
  