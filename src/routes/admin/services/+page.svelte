<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let imgFailed = $state(false);

	function initiales(name: string) {
		return name
			.split(' ')
			.map((p) => p[0])
			.join('')
			.slice(0, 2)
			.toUpperCase();
	}
</script>

<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="mb-12 text-4xl font-bold text-slate-900">Gestion des prestations</h1>
	<section>
		{#each data.services as service (service.id)}
			<div class="divide-base-200 flex flex-col divide-y border-t border-b sm:rounded-xl sm:border">
				<div class="flex items-center gap-3 px-1 py-2.5 sm:px-3">
					{#if !imgFailed}
						<img
							src="/assets/{service.imgName}"
							onerror={() => (imgFailed = true)}
							alt="Lash lift coréen"
							class="flex h-15 w-15 shrink-0 items-center justify-center rounded-full border text-xs font-medium"
						/>
					{:else}
						<div
							class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-medium"
						>
							{initiales(service.name)}
						</div>
					{/if}
					<div class="min-w-0 flex-1">
						<p class="truncate text-xl font-medium">{service.name}</p>
						<p class="truncate text-sm">
							Durée : {service.duration} min
						</p>
						<p class="truncate text-sm">
							Prix : {service.price}€
						</p>
						<p class="truncate text-sm opacity-60">Catégorie : {service.category}</p>
					</div>
					<div class="flex shrink-0 gap-1">
						<button class="btn btn-xs btn-outline btn-square" aria-label="Fidélité">
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
								<path
									d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
								/>
								<rect x="8" y="2" width="8" height="4" rx="1" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		{/each}
	</section>
</div>
