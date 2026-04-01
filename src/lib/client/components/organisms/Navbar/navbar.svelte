<script lang="ts">
	import { Menu } from 'lucide-svelte';
</script>

<div class="navbar bg-base-100 shadow-sm">
	<div class="flex-1"></div>
	<div class="mr-2 flex flex-none items-center gap-3">
		<button
			class="btn text-base-100 shadow-secondary/20 from-secondary to-primary rounded-full border-0 bg-gradient-to-r px-6 py-2 shadow-lg transition-transform hover:scale-[1.02]"
		>
			Prendre rendez-vous
		</button>
		<Menu class="text-base-content h-6 w-6" />
	</div>
</div>
