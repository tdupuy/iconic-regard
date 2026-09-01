<script lang="ts">
	import './layout.css';
	import '../lib/client/styles/app.css';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="assets/favicon.png" />
	<link rel="canonical" href={`https://iconic-regard.com${page.url.pathname}`} />
</svelte:head>

{@render children()}
