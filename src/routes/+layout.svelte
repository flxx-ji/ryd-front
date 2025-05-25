 <!-- <script>
	 
    import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';

	let unsubscribe;
	let pageTitle = '';

	onMount(() => {
		unsubscribe = page.subscribe(($page) => {
			const path = $page.url.pathname;

			let backgroundUrl = '';

			switch (path) {
				case '/':
					backgroundUrl = "url('http://localhost:5001/uploads/home2.webp')";
					 
					break;
				case '/services':
					backgroundUrl = "url('http://localhost:5001/uploads/services2.webp')";
					   
					break;
				case '/catalogue':
					backgroundUrl = "url('http://localhost:5001/uploads/catalogue2.webp')";
					 
					break;
				case '/custom':
					backgroundUrl = "url('http://localhost:5001/uploads/garageCustom.webp')";
					
					break;
				case '/apropos':
					backgroundUrl = "url('http://localhost:5001/uploads/apropos2.webp')";

					break;
				default:
					backgroundUrl = 'none';
					pageTitle = '';
			}

			document.body.style.backgroundImage = backgroundUrl;
			document.body.style.backgroundSize = 'cover';
			document.body.style.backgroundRepeat = 'no-repeat';
			document.body.style.backgroundPosition = 'center';
			document.body.style.backgroundAttachment = 'fixed';
			document.title = pageTitle;

			const titleElement = document.getElementById('page-title');
			if (titleElement) titleElement.innerText = pageTitle;
		});
	});

	onDestroy(() => {
		if (unsubscribe) unsubscribe();
	});
</script>


    <Header />
	 
 

<main>
	<h1 id="page-title" class="dynamic-title"></h1>
    
	<slot />
</main>

 <Footer />
<style>
	:global(body) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		margin: 0;
		padding: 0;
		width: 100%;
		overflow-x: hidden;
	}

	 

	main {
		flex: 1;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		color: rgb(1, 171, 165);
		text-align: center;
	}

	.dynamic-title {
		font-size: 2rem;
		margin-bottom: 1rem;
		text-shadow: 0 2px 10px rgba(0,0,0,0.6);
	}


</style> 



  -->

  <script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../assets/app.css';

	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';


	const baseURL = import.meta.env.VITE_API_URL;

	let unsubscribe;
	let pageTitle = '';
	let showLayout = true;

	onMount(() => {
		unsubscribe = page.subscribe(($page) => {
			const path = $page.url.pathname;

			// Si on est sur /under-construction on cache layout complet
			showLayout = path !== '/under-construction';

			let backgroundUrl = '';

			if (showLayout) {
				// switch (path) {
				// 	case '/':
				// 		backgroundUrl = "url('http://localhost:5001/uploads/home2.webp')";
				// 		break;
				// 	case '/services':
				// 		backgroundUrl = "url('http://localhost:5001/uploads/services2.webp')";
				// 		break;
				// 	case '/catalogue':
				// 		backgroundUrl = "url('http://localhost:5001/uploads/catalogue2.webp')";
				// 		break;
				// 	case '/custom':
				// 		backgroundUrl = "url('http://localhost:5001/uploads/garageCustom.webp')";
				// 		break;
				// 	case '/apropos':
				// 		backgroundUrl = "url('http://localhost:5001/uploads/apropos2.webp')";
				// 		break;
				// 	default:
				// 		backgroundUrl = 'none';
				// 		pageTitle = '';
				// }
                
                switch (path) {
	case '/':
		backgroundUrl = `url('${baseURL}/uploads/home2.webp')`;
		break;
	case '/services':
		backgroundUrl = `url('${baseURL}/uploads/services2.webp')`;
		break;
	case '/catalogue':
		backgroundUrl = `url('${baseURL}/uploads/catalogue2.webp')`;
		break;
	case '/custom':
		backgroundUrl = `url('${baseURL}/uploads/garageCustom.webp')`;
		break;
	case '/apropos':
		backgroundUrl = `url('${baseURL}/uploads/apropos2.webp')`;
		break;
	default:
		backgroundUrl = 'none';
		pageTitle = '';
}



				document.body.style.backgroundImage = backgroundUrl;
				document.body.style.backgroundSize = 'cover';
				document.body.style.backgroundRepeat = 'no-repeat';
				document.body.style.backgroundPosition = 'center';
				document.body.style.backgroundAttachment = 'fixed';
				document.title = pageTitle;

				const titleElement = document.getElementById('page-title');
				if (titleElement) titleElement.innerText = pageTitle;
			} else {
				// Page Under Construction → fond noir
				document.body.style.backgroundImage = 'none';
				document.body.style.backgroundColor = '#000';
			}
		});
	});

	onDestroy(() => {
		if (unsubscribe) unsubscribe();
	});
</script>

{#if showLayout}
	<Header />
{/if}

<main>
	{#if showLayout}
		<h1 id="page-title" class="dynamic-title"></h1>
	{/if}
	<slot />
</main>

{#if showLayout}
	<Footer />
{/if}

<style>
	:global(body) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		margin: 0;
		padding: 0;
		width: 100%;
		overflow-x: hidden;
	}

	main {
		flex: 1;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		color: #D4AF37;
		text-align: center;
	}
.titre-section {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 3rem auto 1rem auto;
	width: 100%;
	max-width: 100vw;
	padding: 0 1rem;
	box-sizing: border-box;
}

.titre {
	width: clamp(320px, 70vw, 590px); /* adaptatif mobile-desktop */
	height: auto;
	object-fit: contain;
	display: block;
}

	.dynamic-title {
		font-size: 2rem;
		margin-bottom: 1rem;
		text-shadow: 0 2px 10px rgba(0,0,0,0.6);
	}
</style>
