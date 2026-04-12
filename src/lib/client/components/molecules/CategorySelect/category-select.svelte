<script lang="ts">
	let { categories } = $props();
	console.log(categories);
</script>

<div class="flex w-full items-center justify-center">
	<select
		class="select select-ghost font-title text-base-content focus:border-transparentfocus:border-transparent text-xl focus:bg-transparent focus:shadow-none focus:outline-none"
	>
		<option disabled selected>Type de prestation</option>
		{#each categories as category (category.id)}
			<option value={category.id}>{category.name}</option>
		{/each}
	</select>
</div>
