 <script>
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



 