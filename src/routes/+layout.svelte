<script lang="ts">
	import './layout.css';
	import '../lib/client/styles/app.css';
	//import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<app data-theme="pastel">
	<!--<svelte:head><link rel="icon" href={favicon} /></svelte:head>-->
	{@render children()}
</app>
