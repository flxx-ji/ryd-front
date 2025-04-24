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
  
    const submitReservation = () => {
      const data = {
        clientName,
        clientFirstName,
        clientEmail,
        clientPhone,
        reservationDateDebut,
        reservationDateFin,
        motoId: moto._id
      };
      console.log("✅ Données à envoyer :", data);
      // TODO : envoyer à ton backend
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