<!-- VUE CARTES -->
<script lang="ts">
	let { customer, onFidelite, onFiche, onFusionner, reasonLabel } = $props();
</script>

<div
	class="card cursor-pointer rounded-xl border {reasonLabel
		? 'border-warning bg-warning/10'
		: 'bg-base-100'}"
	role="button"
	tabindex="0"
	onclick={() => onFiche(customer)}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onFiche(customer);
		}
	}}
>
	<div class="card-body gap-2 p-4">
		<p class="text-[15px] font-medium">{customer.name}</p>

		{#if reasonLabel}
			<p class="badge badge-warning badge-sm w-fit">{reasonLabel}</p>
		{/if}

		<p class="flex items-center gap-1 text-sm opacity-70">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-3.5 w-3.5"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"
				/>
			</svg>
			{customer.phoneNumber}
		</p>
		<p class="flex items-center gap-1 truncate text-sm opacity-70">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-3.5 w-3.5 shrink-0"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<rect x="2" y="4" width="20" height="16" rx="2" />
				<path d="m22 6-10 7L2 6" />
			</svg>
			<span class="truncate">{customer.email}</span>
		</p>

		<div class="mt-2 flex gap-2 border-t pt-2">
			{#if !reasonLabel}
				<button
					class="btn btn-sm btn-outline h-auto flex-1 flex-col gap-1 py-2 text-[11px]"
					onclick={(e) => {
						e.stopPropagation();
						onFidelite(customer);
					}}
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
					Fidélité
				</button>
				<button
					class="btn btn-sm btn-outline h-auto flex-1 flex-col gap-1 py-2 text-[11px]"
					onclick={(e) => {
						e.stopPropagation();
						onFiche(customer);
					}}
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
					Fiche
				</button>
			{:else}
				<button
					class="btn btn-sm btn-outline h-auto flex-1 flex-col gap-1 py-2 text-[11px]"
					onclick={(e) => {
						e.stopPropagation();
						onFusionner(customer);
					}}
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
					Fusionner
				</button>
			{/if}
		</div>
	</div>
</div>
