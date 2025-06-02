<script>
	import { toast } from '@zerodevx/svelte-toast';

	
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../assets/app.css';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	 


	const baseURL = PUBLIC_API_URL;

	let unsubscribe;
	let showLayout = true;

	onMount(() => {
		unsubscribe = page.subscribe(($page) => {
			const path = $page.url.pathname;

			// Cacher le layout si under-construction
			showLayout = path !== '/under-construction';

			if (showLayout) {
				let backgroundUrl;

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
				}

				document.body.style.backgroundImage = backgroundUrl;
				document.body.style.backgroundSize = 'cover';
				document.body.style.backgroundRepeat = 'no-repeat';
				document.body.style.backgroundPosition = 'center';
				document.body.style.backgroundAttachment = 'fixed';
			} else {
				document.body.style.backgroundImage = 'none';
				document.body.style.backgroundColor = '#000';
			}
		});
	});

	onDestroy(() => {
		if (unsubscribe) unsubscribe();
	});
</script>

<SvelteToast position="top-center"/>
<slot />

{#if showLayout}
	<Header />
{/if}

<main>
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
</style>
