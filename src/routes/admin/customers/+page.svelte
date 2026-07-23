<script lang="ts">
	import type { PageData } from './$types';
	import { CustomersList } from '$lib/client/components/admin/organisms/CustomersList';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();
	let syncing = $state(false);
</script>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="mb-6 text-4xl font-bold text-slate-900">Liste des clients</h1>
	{#if data.mergeError}
		<section class="rounded-box mb-12 border border-rose-200 bg-rose-50 p-6 text-rose-900">
			{data.mergeError}
		</section>
	{/if}

	{#if data.mergeSuccess}
		<section class="rounded-box mb-12 border border-green-200 bg-green-50 p-6 text-green-900">
			{data.mergeSuccess}
		</section>
	{/if}
	<form
		method="POST"
		action="?/syncCustomers"
		use:enhance={() => {
			syncing = true;
			return async ({ update }) => {
				await update();
				syncing = false;
			};
		}}
		class="mb-6"
	>
		<button type="submit" class="btn btn-primary" disabled={syncing}>
			{syncing ? 'Synchronisation…' : 'Synchroniser les clients'}
		</button>
	</form>
	<CustomersList customers={data.customersList} />
</div>
