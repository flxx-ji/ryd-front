<!-- <script>
    import { onMount } from 'svelte';
    import axios from 'axios';

    let title = '';
    let description = '';
    let imageUrl = '';

    onMount(async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/pages/home');
            title = response.data.title;
            description = response.data.description;
            imageUrl = response.data.imageUrl;
        } catch (error) {
            console.error('❌ Erreur de chargement des données:', error);
        }
    });
</script>

<div class="home">
    <div class="content">
        {#if imageUrl}
            <img src={imageUrl} alt="Bienvenue sur Ride Your Dream" class="titre" />
        {/if}

        {#if title}
            <h1>{title}</h1>
        {/if}

        {#if description}
            <p>{description}</p>
        {/if}

        <button on:click={() => window.location.href = '/catalogue'}>
            Explorer notre catalogue
        </button>
    </div>
</div>

<style>
    .home {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        text-align: center;
        background-color: #f5f5f5;
        padding: 2rem;
        box-sizing: border-box;
    }

    .content {
        max-width: 800px;
    }

    .titre {
        max-width: 100%;
        height: auto;
        margin-bottom: 1rem;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 1.2rem;
        margin-bottom: 1.5rem;
    }

    button {
        background-color: #04C9AF;
        color: white;
        border: none;
        padding: 12px 24px;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 6px;
        cursor: pointer;
    }

    button:hover {
        background-color: #30968D;
    }
</style> -->


<script>
	import { onMount } from 'svelte';

	let titreImage = "http://localhost:5001/uploads/RideYourDream-CustomMotorcyle.webp";
	let title = '';
	let description = '';

	onMount(async () => {
		try {
			const res = await fetch('http://localhost:5001/api/pages/home');
			const data = await res.json();
			title = data.title;
			description = data.description;

			document.body.style.backgroundImage = "url('http://localhost:5001/uploads/home2.webp')";
			document.body.style.backgroundSize = 'cover';
			document.body.style.backgroundRepeat = 'no-repeat';
			document.body.style.backgroundPosition = 'center';
			document.body.style.backgroundAttachment = 'fixed';

			// Supprimer tout background blanc sur body
			document.body.style.backgroundColor = 'transparent';
		} catch (err) {
			console.error("Erreur chargement page home :", err);
		}
	});
</script>

<!-- TITRE -->
<div class="titre-section">
	<img src={titreImage} alt="Ride Your Dream" class="titre" />
</div>

<!-- CONTENU -->
<div class="content-blur">
	{#if title}
		<h1>{title}</h1>
	{/if}
	{#if description}
		<p>{description}</p>
	{/if}

	<button on:click={() => window.location.href = '/catalogue'}>
		Explorer notre catalogue
	</button>
</div>

<style>
	:global(body) {
		background-color: transparent !important;
		margin: 0;
		padding: 0;
	}

	.titre-section {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 3rem auto 1rem auto;
	width: fit-content;
	max-width: 90vw;
	}
    .titre {
	max-width: 1110px;
	width: 95%;
	height: auto;
}


	.content-blur {
		max-width: 800px;
		margin: 1rem auto 4rem auto;
		padding: 2rem;
		backdrop-filter: blur(10px);
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 16px;
		color: white;
		text-align: center;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.2rem;
		margin-bottom: 1.5rem;
	}

	button {
		background-color: #04C9AF;
		color: white;
		border: none;
		padding: 12px 24px;
		font-size: 1rem;
		font-weight: bold;
		border-radius: 6px;
		cursor: pointer;
	}

	button:hover {
		background-color: #30968D;
	}
</style>
