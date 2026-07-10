<script lang="ts">
	import { ToggleCardList } from '$lib/client/components/admin/atoms/ToggleCardList/';
	import { SearchCustomer } from '$lib/client/components/admin/atoms/SearchCustomer';
	import CustomerInfoCard from '../../molecules/CustomerInfoCard/customer-info-card.svelte';

	const clients = [
		{ id: 1, nom: 'Marion Fabien', telephone: '06 12 34 56 78', email: 'marion.fabien@mail.com' },
		{ id: 2, nom: 'Julien Petit', telephone: '07 88 22 11 09', email: 'j.petit@mail.com' },
		{
			id: 3,
			nom: 'Sophie Lambert',
			telephone: '06 45 90 12 33',
			email: 'sophie.lambert@mail.com'
		},
		{ id: 4, nom: 'Thomas Girard', telephone: '07 12 44 55 66', email: 't.girard@mail.com' }
	];

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

<section>
	<h2 class="mb-6 text-xl font-semibold text-slate-900">Liste des clients</h2>
	<div class="mb-4 flex flex-col gap-2 sm:flex-row">
		<SearchCustomer bind:search />
		<ToggleCardList bind:view />
	</div>

	{#if filtered.length === 0}
		<p class="py-8 text-center text-sm opacity-60">Aucun client ne correspond à la recherche.</p>
	{:else if view === 'card'}
		<!-- VUE CARTES -->
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{#each filtered as client (client.id)}
				<CustomerInfoCard {client} {onFidelite} {onFiche} {onFusionner} />
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
