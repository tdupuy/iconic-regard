<script lang="ts">
	import './layout.css';
	import '../lib/client/styles/app.css';
	import { page } from '$app/state';
	import { buildBeautySalonJsonLd } from '$lib/server/seo';

	let { children } = $props();

	const jsonLdScript = buildBeautySalonJsonLd();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="assets/favicon.png" />
	<link rel="canonical" href={`https://iconic-regard.com${page.url.pathname}`} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLdScript}
</svelte:head>

{@render children()}
