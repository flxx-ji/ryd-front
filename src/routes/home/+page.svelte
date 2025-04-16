<script>
    import axios from "axios";
    // Variables pour la description de la page d'accueil
    let description = "";
    let title = "";
    let imageUrl = "";

      // Fonction pour récupérer les données depuis le backend
      async function fetchData() {
        try {
            const response = await axios.get('http://localhost:5001/api/pages/home');  // Remplace cette URL par ton URL de l'API
            title = response.data.title;  // Assignation du titre
            description = response.data.description;  // Assignation de la description
            imageUrl = response.data.imageUrl;  // Assignation de l'URL de l'image
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    }

    // Appeler la fonction fetchData dès que la page est chargée
    fetchData();

</script>

<style>
    
  /* Style de la page d'accueil */
  .home {
    height: 100%;
    min-height: 100vh; /* L'hauteur de la page prend toute la hauteur de l'écran */
    background-image: url('http://localhost:5001/uploads/home2.webp'); /* Image de fond */
    background-size: 110%; /* L'image couvre toute la page */
    background-position: center center; /* Centre l'image */
    background-repeat: no-repeat; /* Évite la répétition de l'image */
    background-attachment: fixed;
     
    color: white; /* Texte en blanc */
    display: flex; /* Utilisation de Flexbox pour centrer le contenu */
    justify-content: center; /* Centre le contenu horizontalement */
    align-items: center; /* Centre le contenu verticalement */
    text-align: center; /* Centre le texte à l'intérieur des éléments */
}

 


/* Style du titre image */
.home img {
    font-size: 4rem; /* Agrandit la taille du titre */
margin-bottom: 20px;
text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); /* Ombre pour rendre le texte plus lisible */
    max-width: 100%; /* Assure que l'image est responsive */
    max-height: 80%; /* L'image ne doit pas déborder de la page */
    margin-bottom: 20px; /* Marge sous l'image */
}

/* Style de la description p */
.home p {
    font-size: 1.2rem; /* Taille du texte de la description */
    margin-bottom: 30px; /* Marge sous la description */
}

/* Style du bouton */
.home button {
    padding: 10px 20px; /* Padding pour agrandir le bouton */
    background-color: #04C9AF; /* Couleur de fond du bouton */
    border: none; /* Supprime la bordure */
    color: white; /* Texte en blanc */
    cursor: pointer; /* Change le curseur en main lorsqu'on survole le bouton */
    border-radius: 5px; /* Coins arrondis */
}

/* Style du bouton au survol */
.home button:hover {
    background-color: #30968D; /* Changement de couleur lorsque le bouton est survolé */
}
  
</style>

<div class="home">
    <!-- Contenu centré de la page d'accueil -->
    <div>
        <!-- Image du titre de la page d'accueil -->
        <img src="http://localhost:5001/uploads/home3.webp" alt="Bienvenue sur Ride Your Dreams">

        <!-- Description sous l'image -->
        <p>{description}</p>

        <!-- Bouton qui redirige vers la page catalogue -->
        <button on:click={() => window.location.href = '/catalogue'}>Explorer notre catalogue</button>
    </div>
</div>
