<script lang="ts">
	import './layout.css';
	import '../lib/client/styles/app.css';
	import Header from '$lib/client/components/organisms/Header';
	import Background from '$lib/client/components/organisms/Background';
	import Footer from '$lib/client/components/organisms/Footer';
	import Breadcrumb from '$lib/client/components/molecules/Breadcrumb';
	//import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import Navbar from '$lib/client/components/organisms/Navbar';

	let { children } = $props();
</script>

<svelte:head>
	<title>Iconic Regard{page.data.title ? ` | ${page.data.title}` : ''}</title>
</svelte:head>

<app data-theme="violet-perso">
	<Navbar />
	<div class="bg-base-100 relative min-h-screen overflow-hidden">
		<Breadcrumb />
		<Background />

		<div class="relative z-10 flex min-h-screen flex-col">
			<Header />
			{@render children()}
			<Footer />
		</div>
	</div>
</app>
