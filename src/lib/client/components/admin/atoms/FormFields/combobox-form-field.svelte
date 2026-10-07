<script lang="ts" generics="T extends { id: number | string; name: string }">
	import type { Component } from 'svelte';

	let {
		id,
		name,
		label,
		icon: Icon,
		items,
		placeholder,
		value = $bindable('')
	}: {
		id: string;
		name: string;
		label: string;
		icon: Component<{ class?: string }>;
		items: T[];
		placeholder: string;
		value?: string;
	} = $props();

	let query = $state('');
	let isOpen = $state(false);

	const filtered = $derived(
		items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
	);

	function select(item: T) {
		value = String(item.id);
		query = item.name;
		isOpen = false;
	}

	// Enforces a valid selection: reverts free text that doesn't match an item
	function handleBlur() {
		setTimeout(() => {
			isOpen = false;
			if (!items.some((item) => item.name === query)) {
				value = '';
				query = '';
			}
		}, 150);
	}
</script>

<div class="flex flex-col gap-1">
	<label for={id} class="flex items-center gap-1 text-sm font-medium">
		<Icon class="text-primary h-3.5 w-3.5 shrink-0" />
		{label}
	</label>
	<div class="relative">
		<input
			{id}
			type="text"
			bind:value={query}
			onfocus={() => (isOpen = true)}
			onblur={handleBlur}
			{placeholder}
			autocomplete="off"
			class="input input-bordered w-full"
		/>
		{#if isOpen && filtered.length > 0}
			<ul
				class="menu bg-base-100 rounded-box absolute z-10 mt-1 w-full border border-gray-200 shadow-md"
			>
				{#each filtered as item (item.id)}
					<li>
						<button type="button" onmousedown={() => select(item)}>
							{item.name}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
	<input type="hidden" {name} {value} />
</div>
