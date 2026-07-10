<script lang="ts">
	let { view = $bindable() }: { view: 'card' | 'list' } = $props();
</script>

<div class="join self-start sm:self-auto">
	<button
		class="btn join-item btn-sm sm:btn-md"
		class:btn-active={view === 'card'}
		onclick={() => (view = 'card')}
		aria-pressed={view === 'card'}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<rect x="3" y="3" width="7" height="7" rx="1" />
			<rect x="14" y="3" width="7" height="7" rx="1" />
			<rect x="3" y="14" width="7" height="7" rx="1" />
			<rect x="14" y="14" width="7" height="7" rx="1" />
		</svg>
		<span class="ml-1 hidden sm:inline">Cartes</span>
	</button>
	<button
		class="btn join-item btn-sm sm:btn-md"
		class:btn-active={view === 'list'}
		onclick={() => (view = 'list')}
		aria-pressed={view === 'list'}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<line x1="4" y1="6" x2="20" y2="6" />
			<line x1="4" y1="12" x2="20" y2="12" />
			<line x1="4" y1="18" x2="20" y2="18" />
		</svg>
		<span class="ml-1 hidden sm:inline">Liste</span>
	</button>
</div>
