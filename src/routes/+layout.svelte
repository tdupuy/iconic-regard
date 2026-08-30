<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import '../lib/client/styles/app.css';

	let { children } = $props();

	const GA_ID = 'G-F121F18W2B';

	onMount(() => {
		if (!import.meta.env.PROD) return;

		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
		document.head.appendChild(script);

		window.dataLayer = window.dataLayer || [];
		function gtag(...args: unknown[]) {
			window.dataLayer.push(args);
		}
		gtag('js', new Date());
		gtag('config', GA_ID);
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="assets/favicon.png" />
</svelte:head>

{@render children()}
