<script lang="ts">
	let {
		categories,
		services,
		onchange
	}: {
		categories: { id: number; name: string; slug: string }[];
		services: { id: number; name: string; category: { id: number } }[];
		onchange: (id: number) => void;
	} = $props();
</script>

<div class="flex w-full items-center justify-center">
	<select
		class="select select-ghost font-title text-base-content text-xl
        focus:border-transparent focus:bg-transparent focus:shadow-none focus:outline-none
        focus-visible:border-transparent focus-visible:outline-none"
		onchange={(e) => onchange(Number(e.currentTarget.value))}
	>
		<option value={0} selected>Toutes les prestations</option>

		{#each categories as category (category.id)}
			<optgroup label={category.name}>
				{#each services.filter((s) => s.category.id === category.id) as service (service.id)}
					<option value={service.id}>{service.name}</option>
				{/each}
			</optgroup>
		{/each}
	</select>
</div>

<style>
	select:focus {
		outline: none !important;
		border-color: transparent !important;
		box-shadow: none !important;
	}
</style>
