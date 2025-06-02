<script>
  import { PUBLIC_API_URL } from '$env/static/public';

  export let moto;
  let isHovered = false;

  // const baseURL = 'http://localhost:5001';
  const baseURL = PUBLIC_API_URL;


  // 🔧 Corrige le chemin si besoin
  const imageURL = moto.image?.startsWith('/uploads')
    ? `${baseURL}${moto.image}`
    : moto.image;

  console.log("💬 Moto chargée :", moto);
</script>

<div
  class="moto-card"
  style={`background-image: url("${imageURL}")`}

  on:mouseover={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
>
  <div class="moto-info">
    <h3>{moto.nom}</h3>
    <p>{moto.marque} - {moto.modele}</p>
    <p>{moto.couleur} - {moto.annee}</p>
    <p>{moto.tarifs.unJour} € / jour</p>

    {#if isHovered}
      <div class="button-container">
        <button on:click={() => window.location.href = `/moto/${moto._id}`}>Voir plus</button>
        <button on:click={() => window.location.href = `/under-construction` }>Réserver</button>

        <!-- <button on:click={() => window.location.href = `/reservation/${moto._id}`}>Réserver</button> -->
      </div>
    {/if}
  </div>
</div>

<style>
  .moto-card {
    position: relative;
    background-size: cover;
    background-position: center;
    width: 300px;
    height: 200px;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
  }

  .moto-card:hover {
    transform: scale(1.1);
  }

  .moto-info {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
    background: rgba(0, 0, 0, 0.6);
    padding: 10px;
    border-radius: 5px;
  }

  .button-container {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  button {
    background-color: #D4AF37;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
	background-color: #D4AF37;
	color: #000;
	box-shadow: 0 0 10px #D4AF37;
}
</style>
