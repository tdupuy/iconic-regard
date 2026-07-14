<script lang="ts">
	import { ToggleCardList } from '$lib/client/components/admin/atoms/ToggleCardList/';
	import { SearchCustomer } from '$lib/client/components/admin/atoms/SearchCustomer';
	import { CustomerInfoCard } from '../../molecules/CustomerInfoCard';
	import { CustomerInfoLine } from '../../molecules/CustomerInfoLine';
	import { goto } from '$app/navigation';

	let { customers } = $props();

	let view: 'card' | 'list' = $state('card');
	let search = $state('');

	const reasonLabels: Record<'phone_match' | 'email_match' | 'name_match', string> = {
		name_match: 'Nom identique',
		email_match: 'Email identique',
		phone_match: 'Téléphone identique'
	};

	let filtered = $derived(
		customers.filter((c) => {
			const q = search.toLowerCase().trim();
			if (!q) return true;
			return (
				c.name.toLowerCase().includes(q) ||
				c.phoneNumber.replace(/\s/g, '').includes(q.replace(/\s/g, '')) ||
				(c.email?.toLowerCase().includes(q) ?? false)
			);
		})
	);
	function onFidelite(customer) {
		console.log('fidelite', customer);
	}
	function onFiche(customer) {
		console.log('fiche', customer);
	}
	function onFusionner(customer) {
		goto(`/admin/customers/merge?uid1=${customer.id}&uid2=${customer.reason?.matchId}`);
	}
</script>

<section>
	<div class="mb-4 flex flex-col gap-2 sm:flex-row">
		<SearchCustomer bind:search />
		<ToggleCardList bind:view />
	</div>

	{#if filtered.length === 0}
		<p class="py-8 text-center text-sm opacity-60">Aucun client ne correspond à la recherche.</p>
	{:else if view === 'card'}
		<!-- VUE CARTES -->
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{#each filtered as customer (customer.id)}
				<CustomerInfoCard
					{customer}
					{onFidelite}
					{onFiche}
					{onFusionner}
					reasonLabel={customer.reason?.reasons.map((r) => reasonLabels[r]).join(', ')}
				/>
			{/each}
		</div>
	{:else}
		<!-- VUE LISTE -->
		<div class="divide-base-200 flex flex-col divide-y border-t border-b sm:rounded-xl sm:border">
			{#each filtered as customer (customer.id)}
				<CustomerInfoLine
					{customer}
					{onFidelite}
					{onFiche}
					{onFusionner}
					reasonLabel={customer.reason?.reasons.map((r) => reasonLabels[r]).join(', ')}
				/>
			{/each}
		</div>
	{/if}
</section>
