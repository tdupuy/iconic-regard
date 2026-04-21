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

	let selected = $state<{ id: number; label: string }>({ id: 0, label: 'Toutes les prestations' });
	let open = $state(false);

	function select(id: number, label: string) {
		selected = { id, label };
		open = false;
		onchange(id);
	}
</script>

<div class="flex w-full items-center justify-center">
	<div class="relative">
		<!-- Trigger -->
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

		<!-- Dropdown -->
		{#if open}
			<ul
				class="menu bg-base-100 border-base-200 rounded-box absolute left-1/2 z-50 mt-2 w-56 -translate-x-1/2 border p-1 text-sm shadow-sm"
			>
				<li>
					<button
						class="rounded-btn {selected.id === 0
							? 'text-primary font-medium'
							: 'text-base-content/70'}"
						onclick={() => select(0, 'Toutes les prestations')}
					>
						Toutes les prestations
					</button>
				</li>

				{#each categories as category (category.id)}
					<li
						class="menu-title text-base-content/40 px-3 pt-3 pb-1 text-xs tracking-widest uppercase"
					>
						{category.name}
					</li>
					{#each services.filter((s) => s.category.id === category.id) as service (service.id)}
						<li>
							<button
								class="rounded-btn {selected.id === service.id
									? 'text-primary font-medium'
									: 'text-base-content/70'}"
								onclick={() => select(service.id, service.name)}
							>
								{service.name}
							</button>
						</li>
					{/each}
				{/each}
			</ul>
		{/if}
	</div>
</div>

<!-- Fermer en cliquant ailleurs -->
{#if open}
	<div class="fixed inset-0 z-40" onclick={() => (open = false)} />
{/if}
