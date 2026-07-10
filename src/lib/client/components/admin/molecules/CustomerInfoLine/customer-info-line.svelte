<script lang="ts">
	let { customer, onFidelite, onFiche, onFusionner } = $props();

	function initiales(name: string) {
		return name
			.split(' ')
			.map((p) => p[0])
			.join('')
			.slice(0, 2)
			.toUpperCase();
	}
</script>

<div class="flex items-center gap-3 px-1 py-2.5 sm:px-3">
	<div
		class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-medium"
	>
		{initiales(customer.name)}
	</div>
	<div class="min-w-0 flex-1">
		<p class="truncate text-sm font-medium">{customer.name}</p>
		<p class="truncate text-xs opacity-60">{customer.phoneNumber} · {customer.email}</p>
	</div>
	<div class="flex shrink-0 gap-1">
		<button
			class="btn btn-xs btn-outline btn-square"
			aria-label="Fidélité"
			onclick={() => onFidelite(customer)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<polygon
					points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
				/>
			</svg>
		</button>
		<button
			class="btn btn-xs btn-outline btn-square"
			aria-label="Fiche client"
			onclick={() => onFiche(customer)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
				<rect x="8" y="2" width="8" height="4" rx="1" />
			</svg>
		</button>
		<button
			class="btn btn-xs btn-outline btn-square"
			aria-label="Fusionner"
			onclick={() => onFusionner(customer)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<circle cx="6" cy="6" r="3" />
				<circle cx="6" cy="18" r="3" />
				<circle cx="18" cy="18" r="3" />
				<path d="M6 9v6M6 15c0-4 4-6 8-6h4" />
			</svg>
		</button>
	</div>
</div>
