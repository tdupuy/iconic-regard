<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let imgFailed = $state(false);
	let openDetails = $state(new Set<number>());

	function initiales(name: string) {
		return name
			.split(' ')
			.map((p) => p[0])
			.join('')
			.slice(0, 2)
			.toUpperCase();
	}

	function toggleDetail(id: number) {
		const next = new Set(openDetails);
		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
		}
		openDetails = next;
	}

	function editService(id: number) {
		goto(`/admin/services/edit/${id}`);
	}
</script>

<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="mb-12 text-4xl font-bold text-slate-900">Gestion des prestations</h1>
	<section>
		{#each data.services as service (service.id)}
			<div
				class="divide-base-200 flex flex-col divide-y border-t border-b hover:cursor-pointer sm:rounded-xl sm:border"
				role="button"
				tabindex="0"
				onclick={() => {
					editService(service.id);
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						editService(service.id);
					}
				}}
			>
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
						<p class="truncate text-sm font-medium lg:text-xl">{service.name}</p>
						<p class="truncate text-xs lg:text-sm">
							Durée : {service.duration} min
						</p>
						<p class="truncate text-xs lg:text-sm">
							Prix : {service.price}€
						</p>
						<p class="truncate text-sm opacity-60 lg:text-sm">Catégorie : {service.category}</p>
					</div>
					<div class="flex shrink-0 gap-1">
						<button
							class="btn btn-xs btn-outline btn-square"
							aria-label="Détail"
							onclick={(e) => {
								e.stopPropagation();
								toggleDetail(service.id);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<line x1="4" y1="7" x2="20" y2="7" />
								<line x1="4" y1="12" x2="20" y2="12" />
								<line x1="4" y1="17" x2="20" y2="17" />
							</svg>
						</button>
						<button
							class="btn btn-xs btn-outline btn-square"
							aria-label="Édition"
							onclick={(e) => {
								e.stopPropagation();
								editService(service.id);
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
								<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
								<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
							</svg>
						</button>
					</div>
				</div>
				{#if openDetails.has(service.id)}
					<div class="px-3 py-3 text-sm">
						{service.description}
					</div>
				{/if}
			</div>
		{/each}
	</section>
</div>
