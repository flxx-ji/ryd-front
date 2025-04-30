<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
  
    let moto = null;
    let loading = true;
  
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
  
    onMount(async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/motos/${id}`);
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
    nom: moto.nom,
    modele: moto.modele,
    couleur: moto.couleur,
    annee: moto.annee,
    tarifs: moto.tarifs
  },
  customer: {
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


  console.log("✅ Données à envoyer :", data); // 🟢 ici c’est bon

  try {
    const res = await fetch('http://localhost:5001/api/stripe/create-checkout-session', {
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
      padding: 20px;
      max-width: 700px;
      margin: auto;
      background: #f8f8f8;
      border-radius: 10px;
    }
  
    form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  
    input {
      padding: 8px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  
    button {
      background-color: #04C9AF;
      color: white;
      font-weight: bold;
      padding: 12px;
  }
  </style>