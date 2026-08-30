<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import '../lib/client/styles/app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="assets/favicon.png" />
</svelte:head>

{@render children()}
