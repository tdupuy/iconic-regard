<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import PopOverMenu from '$lib/client/components/molecules/PopOverMenu/';
	let menuOpen = $state(false);
</script>

<div class="navbar bg-base-100 shadow-sm">
	<div class="flex-1"></div>
	<div class="mr-2 flex flex-none items-center gap-3">
		<a
			href="/booking"
			class="btn text-base-100 shadow-secondary/20 from-secondary to-primary rounded-full border-0 bg-gradient-to-r px-6 py-2 shadow-lg transition-transform hover:scale-[1.02]"
		>
			Prendre rendez-vous
		</a>

		<button
			type="button"
			class="btn btn-ghost btn-square text-base-content"
			onclick={() => (menuOpen = true)}
			aria-label="Ouvrir le menu"
		>
			<Menu class="h-6 w-6" />
		</button>
	</div>
</div>

{#if menuOpen}
	<PopOverMenu onClose={() => (menuOpen = false)} />
{/if}
