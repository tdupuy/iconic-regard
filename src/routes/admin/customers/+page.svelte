<script lang="ts">
	import type { PageData } from './$types';
	import { ToggleCardList } from '$lib/client/components/admin/atoms/ToggleCardList/';
	import { ConflictedClients } from '$lib/client/components/admin/organisms/ConflictedClients/';
	//let { data }: { data: PageData } = $props();

	// Données d'exemple — remplace par tes vraies données / props
	let {
		clients = [
			{ id: 1, nom: 'Marion Fabien', telephone: '06 12 34 56 78', email: 'marion.fabien@mail.com' },
			{ id: 2, nom: 'Julien Petit', telephone: '07 88 22 11 09', email: 'j.petit@mail.com' },
			{
				id: 3,
				nom: 'Sophie Lambert',
				telephone: '06 45 90 12 33',
				email: 'sophie.lambert@mail.com'
			},
			{ id: 4, nom: 'Thomas Girard', telephone: '07 12 44 55 66', email: 't.girard@mail.com' }
		],
		data
	} = $props();

	let view: 'card' | 'list' = $state('card');
	let search = $state('');

	let filtered = $derived(
		clients.filter((c) => {
			const q = search.toLowerCase().trim();
			if (!q) return true;
			return (
				c.nom.toLowerCase().includes(q) ||
				c.telephone.replace(/\s/g, '').includes(q.replace(/\s/g, '')) ||
				c.email.toLowerCase().includes(q)
			);
		})
	);

	function initiales(nom) {
		return nom
			.split(' ')
			.map((p) => p[0])
			.join('')
			.slice(0, 2)
			.toUpperCase();
	}

	function onFidelite(client) {
		console.log('fidelite', client);
	}
	function onFiche(client) {
		console.log('fiche', client);
	}
	function onFusionner(client) {
		console.log('fusionner', client);
	}
</script>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="mb-12 text-4xl font-bold text-slate-900">Clients</h1>
	{#if data.bookings.length}
		<section class="rounded-box border-warning/40 bg-warning/5 mb-12 border-2 p-6">
			<ConflictedClients bookings={data.bookings} />
		</section>
	{/if}
	<section>
		<h2 class="mb-6 text-xl font-semibold text-slate-900">Liste des clients</h2>
		<div class="mb-4 flex flex-col gap-2 sm:flex-row">
			<label class="input input-bordered flex flex-1 items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 opacity-60"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<circle cx="11" cy="11" r="7" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
				</svg>
				<input
					type="text"
					class="grow"
					placeholder="Rechercher un client (nom, téléphone, email)"
					bind:value={search}
				/>
			</label>

			<div class="join self-start sm:self-auto">
				<button
					class="btn join-item btn-sm sm:btn-md"
					class:btn-active={view === 'card'}
					onclick={() => (view = 'card')}
					aria-pressed={view === 'card'}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<rect x="3" y="3" width="7" height="7" rx="1" />
						<rect x="14" y="3" width="7" height="7" rx="1" />
						<rect x="3" y="14" width="7" height="7" rx="1" />
						<rect x="14" y="14" width="7" height="7" rx="1" />
					</svg>
					<span class="ml-1 hidden sm:inline">Cartes</span>
				</button>
				<button
					class="btn join-item btn-sm sm:btn-md"
					class:btn-active={view === 'list'}
					onclick={() => (view = 'list')}
					aria-pressed={view === 'list'}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<line x1="4" y1="6" x2="20" y2="6" />
						<line x1="4" y1="12" x2="20" y2="12" />
						<line x1="4" y1="18" x2="20" y2="18" />
					</svg>
					<span class="ml-1 hidden sm:inline">Liste</span>
				</button>
			</div>
		</div>

		{#if filtered.length === 0}
			<p class="py-8 text-center text-sm opacity-60">Aucun client ne correspond à la recherche.</p>
		{:else if view === 'card'}
			<!-- VUE CARTES -->
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{#each filtered as client (client.id)}
					<div class="card bg-base-100 rounded-xl border">
						<div class="card-body gap-2 p-4">
							<p class="text-[15px] font-medium">{client.nom}</p>
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
								{client.telephone}
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
								<span class="truncate">{client.email}</span>
							</p>

							<div class="mt-2 flex gap-2 border-t pt-2">
								<button
									class="btn btn-sm btn-outline h-auto flex-1 flex-col gap-1 py-2 text-[11px]"
									onclick={() => onFidelite(client)}
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
									onclick={() => onFiche(client)}
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
									Fiche
								</button>
								<button
									class="btn btn-sm btn-outline h-auto flex-1 flex-col gap-1 py-2 text-[11px]"
									onclick={() => onFusionner(client)}
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
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<!-- VUE LISTE -->
			<div class="divide-base-200 flex flex-col divide-y border-t border-b sm:rounded-xl sm:border">
				{#each filtered as client (client.id)}
					<div class="flex items-center gap-3 px-1 py-2.5 sm:px-3">
						<div
							class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-medium"
						>
							{initiales(client.nom)}
						</div>
						<div class="min-w-0 flex-1">
							<p class="truncate text-sm font-medium">{client.nom}</p>
							<p class="truncate text-xs opacity-60">{client.telephone} · {client.email}</p>
						</div>
						<div class="flex shrink-0 gap-1">
							<button
								class="btn btn-xs btn-outline btn-square"
								aria-label="Fidélité"
								onclick={() => onFidelite(client)}
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
								onclick={() => onFiche(client)}
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
							<button
								class="btn btn-xs btn-outline btn-square"
								aria-label="Fusionner"
								onclick={() => onFusionner(client)}
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
				{/each}
			</div>
		{/if}
	</section>
</div>
