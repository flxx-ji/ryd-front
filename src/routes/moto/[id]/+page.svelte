<script>
  // 📦 Important : pour récupérer les données injectées par +page.js
  export let data;

  import { PUBLIC_API_URL2 } from '$env/static/public';

  const baseURL = PUBLIC_API_URL2;
  let moto = data.moto;
</script>

<div class="container">
  <h2>{moto.nom}</h2>

  <img class="moto-img" src={baseURL + moto.image} alt={moto.nom} />

  <div class="info">
    <p><strong>Modèle :</strong> {moto.modele}</p>
    <p><strong>Marque :</strong> {moto.marque}</p>
    <p><strong>Année :</strong> {moto.annee}</p>
    <p><strong>Couleur :</strong> {moto.couleur}</p>
    <p><strong>Disponible :</strong> {moto.disponible ? "Oui" : "Non"}</p>

    <p><strong>💰 Tarifs :</strong></p>
    <ul>
      <li>• 1 jour : {moto.tarifs.unJour} €</li>
      <li>• 2–3 jours : {moto.tarifs.deuxTroisJours}</li>
      <li>• 4–5 jours : {moto.tarifs.quatreCinqJours}</li>
      <li>• 1 semaine : {moto.tarifs.uneSemaine} €</li>
    </ul>

    <p><strong>⚙️ Caractéristiques :</strong></p>
    <ul>
      <li>• Moteur : {moto.caracteristiques.moteur}</li>
      <li>• Cylindrée : {moto.caracteristiques.cylindree}cc</li>
      <li>• Transmission : {moto.caracteristiques.transmission}</li>
      <li>• Poids : {moto.caracteristiques.poids}</li>
      <li>• Autonomie : {moto.caracteristiques.autonomie}</li>
      <li>• Réservoir : {moto.caracteristiques.reservoir}</li>
    </ul>

    <p><strong>📦 Équipements inclus :</strong></p>
    {#if moto.equipements?.length}
      <ul>
        {#each moto.equipements as item}
          <li>• {item}</li>
        {/each}
      </ul>
    {:else}
      <p>– Non spécifiés –</p>
    {/if}
  </div>

  <div class="buttons">
    <!-- <button on:click={() => window.location.href = `/under-construction`}>Réserver</button> -->
     <button on:click={() => window.location.href = `/reservation/${moto._id}`}>Réserver</button>
    <button on:click={() => window.location.href = '/catalogue'}>Retour au catalogue</button>
  </div>
</div>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-y: auto;
  }

  .container {
    max-width: 900px;
    margin: auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }

  .moto-img {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .info p {
    margin: 5px 0;
  }

  ul {
    margin-bottom: 15px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
    flex-wrap: wrap;
  }

  button {
    padding: 10px 20px;
    background-color: #D4AF37;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }

  button:hover {
    background-color: #D4AF37;
    color: #000;
    box-shadow: 0 0 10px #D4AF37;
  }
</style>
