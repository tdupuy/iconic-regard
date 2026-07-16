<script lang="ts">
	import '../../lib/client/styles/app.css';
	import { DrawerMenu } from '../../lib/client/components/admin/organisms/DrawerMenu';
	import { afterNavigate } from '$app/navigation';

	let { children } = $props();

	let drawerOpen = $state(false);

	afterNavigate(() => {
		drawerOpen = false;
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="assets/favicon.png" />
	<title>Admin - Iconic Regard</title>
</svelte:head>

<app data-theme="violet-perso"
	><div class="drawer lg:drawer-open">
		<input id="my-drawer-4" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen} />
		<div class="drawer-content">
			<!-- Navbar -->
			<nav class="navbar w-full bg-black text-white">
				<label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<!-- Sidebar toggle icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke-linejoin="round"
						stroke-linecap="round"
						stroke-width="2"
						fill="none"
						stroke="currentColor"
						class="my-1.5 inline-block size-6"
						><path
							d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
						></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg
					>
				</label>
				<div class="px-4 text-lg text-white">Admin iconic-regard</div>
			</nav>
			<!-- Page content here -->
			<div class="p-4">
				{@render children()}
			</div>
		</div>
		<DrawerMenu />
	</div>
</app>
