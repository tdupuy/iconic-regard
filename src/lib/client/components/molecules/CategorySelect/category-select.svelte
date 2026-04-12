<script lang="ts">
	let { categories, onchange } = $props();
</script>

<div class="flex w-full items-center justify-center">
	<select
		class="select select-ghost font-title text-base-content text-xl
		focus:border-transparent focus:bg-transparent focus:shadow-none focus:outline-none
		focus-visible:border-transparent focus-visible:outline-none"
		onchange={(e) => onchange(Number(e.target.value))}
	>
		<option value={0} disabled selected>Type de prestation</option>
		{#each categories as category (category.id)}
			<option value={category.id}>{category.name}</option>
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
