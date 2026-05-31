<script lang="ts">
	import '../../lib/client/styles/app.css';
	import Background from '$lib/client/components/organisms/Background';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="assets/favicon.png" />
	<title>Admin - Iconic Regard</title>
</svelte:head>

<app data-theme="violet-perso">
	<Background />
	{@render children()}
</app>
