<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { PUBLIC_API_URL2 } from '$env/static/public';
  
	// import { defaultClientConditions } from 'vite';
  
    let moto = null;
    let loading = true;
    let clientId = null;
    let clientName = '';
    let clientFirstName = '';
    let clientEmail = '';
    let clientPhone = '';
    let reservationDateDebut = '';
    let reservationDateFin = '';
    let reservationHeureDebut = '09:00';
    let reservationHeureFin = '18:00';

    // On récupère l'ID depuis l'URL
    let id;
    $: id = $page.params.id;

    const baseURL = PUBLIC_API_URL2;

  
    onMount(async () => {
      try {
        // const res = await fetch(`http://localhost:5001/api/motos/${id}`);

        const res = await fetch(`${baseURL}/api/motos/${id}`);

        if (!res.ok) throw new Error('Erreur lors du chargement de la moto');
        moto = await res.json();
      } catch (err) {
        console.error(err);
      } finally {
        loading = false;
      }
    });
  
    const submitReservation = async () => {
      const body = {
  moto: {
    _id: moto._id,
    nom: moto.nom,
    modele: moto.modele,
    couleur: moto.couleur,
    annee: moto.annee,
    tarifs: moto.tarifs
  },
  customer: {
    _id: clientId,
    name: clientName,
    firstName: clientFirstName,
    email: clientEmail,
    phone: clientPhone
  },
  dates: {
    debut: reservationDateDebut,
    fin: reservationDateFin,
    heureDebut: reservationHeureDebut,
    heureFin: reservationHeureFin
  }
};


  console.log("✅ Données à envoyer :", body); // 🟢 ici c’est bon

  try {
    // const res = await fetch('http://localhost:5001/api/stripe/create-checkout-session', { 
    
      const res = await fetch(`${baseURL}/api/stripe/create-checkout-session`, {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const result = await res.json();

    if (result.url) {
      window.location.href = result.url;
    } else {
      alert("Erreur lors de la redirection vers Stripe.");
    }
  } catch (err) {
    console.error("Erreur lors du paiement :", err);
    alert("Une erreur est survenue.");
  }
};

  </script>
  
  {#if loading}
    <p style="text-align: center;">Chargement des infos de la moto...</p>
  {:else if moto}
    <div class="reservation">
      <h1>Réserver la {moto.nom}</h1>
      <p><strong>Modèle :</strong> {moto.modele} - {moto.couleur} ({moto.annee})</p>
      <p><strong>Prix 1 jour :</strong> {moto.tarifs.unJour} €</p>
  
      <form on:submit|preventDefault={submitReservation}>
        <label for="clientName">Nom :</label>
        <input id="clientName" type="text" bind:value={clientName} required />
  
        <label for="clientFirstName">Prénom :</label>
        <input id="clientFirstName" type="text" bind:value={clientFirstName} required />
  
        <label for="clientEmail">Email :</label>
        <input id="clientEmail" type="email" bind:value={clientEmail} required />
  
        <label for="clientPhone">Téléphone :</label>
        <input id="clientPhone" type="tel" bind:value={clientPhone} required />
  
        <label for="reservationDateDebut">Date de début :</label>
        <input id="reservationDateDebut" type="date" bind:value={reservationDateDebut} required />
  
        <label for="reservationDateFin">Date de fin :</label>
        <input id="reservationDateFin" type="date" bind:value={reservationDateFin} required />

        <label for="reservationHeureDebut">Heure de début :</label>
        <input id="reservationHeureDebut" type="time" bind:value={reservationHeureDebut} required />

        <label for="reservationHeureFin">Heure de fin :</label>
        <input id="reservationHeureFin" type="time" bind:value={reservationHeureFin} required />
  
        <button type="submit">Confirmer la réservation</button>
      </form>
    </div>
  {:else}
    <p style="text-align: center; color: red;">Moto introuvable</p>
  {/if}
  
 <style>
  .reservation {
  padding: 2rem;
  max-width: 720px;
  margin: 4rem auto;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(212,175,55,0.2);
  box-shadow: 0 0 25px rgba(0,0,0,0.6);
  color: white;
}

.reservation h1 {
  text-align: center;
  color: #D4AF37;
  margin-bottom: 1rem;
}

.reservation p {
  text-align: center;
  color: rgba(255,255,255,0.75);
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 1.5rem;
}

label {
  font-size: 0.9rem;
  color: rgba(212,175,55,0.85);
}

input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid rgba(212,175,55,0.25);
  background: rgba(0,0,0,0.5);
  color: white;
}

input:focus {
  outline: none;
  border-color: #D4AF37;
  box-shadow: 0 0 6px rgba(212,175,55,0.4);
}

button {
  margin-top: 1rem;
  background-color: #D4AF37;
  color: black;
  font-weight: bold;
  padding: 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  letter-spacing: .08em;
  text-transform: uppercase;
}

button:hover {
  box-shadow: 0 0 14px rgba(212,175,55,0.45);
}

 </style>