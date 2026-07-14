<script lang="ts">
	let { search = $bindable() }: { search: string } = $props();
</script>

<label class="input input-bordered flex flex-1 items-center gap-2">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-4 w-4 opacity-60"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
	>
		<circle cx="11" cy="11" r="7" />
		<line x1="21" y1="21" x2="16.65" y2="16.65" />
	</svg>
	<input
		type="text"
		class="grow"
		placeholder="Rechercher un client (nom, téléphone, email)"
		bind:value={search}
	/>
</label>
