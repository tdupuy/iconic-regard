<script lang="ts">
	let {
		categories,
		onchange
	}: {
		categories: { id: number; name: string; slug: string }[];
		onchange: (id: number) => void;
	} = $props();

	let selected = $state<{ id: number; label: string }>({ id: 0, label: 'Type de prestation' });
	let open = $state(false);

	function select(id: number, label: string) {
		selected = { id, label };
		open = false;
		onchange(id);
	}
</script>

<div class="flex w-full items-center justify-center">
	<div class="relative">
		<button
			class="font-title text-base-content flex items-center gap-2 text-xl outline-none"
			onclick={() => (open = !open)}
		>
			{selected.label}
			<svg
				class="h-4 w-4 opacity-50 transition-transform {open ? 'rotate-180' : ''}"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>

		{#if open}
			<ul
				class="menu bg-base-100 border-base-200 rounded-box absolute left-1/2 z-50 mt-2 w-56 -translate-x-1/2 border p-1 text-sm shadow-sm"
			>
				{#each categories as category (category.id)}
					<li>
						<button
							class="rounded-btn {selected.id === category.id
								? 'text-primary font-medium'
								: 'text-base-content/70'}"
							onclick={() => select(category.id, category.name)}
						>
							{category.name}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

{#if open}
	<div class="fixed inset-0 z-40" onclick={() => (open = false)} />
{/if}
