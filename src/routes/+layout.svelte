<script lang="ts">
	import './layout.css';
	import '../lib/client/styles/app.css';
	//import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<app data-theme="violet-perso">
	<div class="bg-base-100 relative min-h-screen overflow-hidden">
		<!-- Orb rose (secondary) -->
		<div
			class="pointer-events-none fixed -top-32 -right-20 h-[500px] w-[500px] rounded-full"
			style="background: radial-gradient(circle, oklch(from var(--color-secondary) l c h / 0.3) 0%, transparent 70%);"
		></div>

		<!-- Orb violet (primary) -->
		<div
			class="pointer-events-none fixed -bottom-20 -left-20 h-[450px] w-[450px] rounded-full"
			style="background: radial-gradient(circle, oklch(from var(--color-primary) l c h / 0.25) 0%, transparent 70%);"
		></div>

		<!-- Orb bleu (accent) -->
		<div
			class="pointer-events-none fixed top-1/2 right-[5%] h-[200px] w-[200px] rounded-full"
			style="background: radial-gradient(circle, oklch(from var(--color-accent) l c h / 0.2) 0%, transparent 70%);"
		></div>
		<div class="relative z-10 flex min-h-screen flex-col">
			{@render children()}
		</div>
	</div>
</app>

<style>
	.anim-orb {
		animation: floatOrb 8s ease-in-out infinite;
	}
	.anim-orb-rev {
		animation: floatOrb 11s ease-in-out infinite reverse;
	}
</style>
