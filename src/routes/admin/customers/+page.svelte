<script lang="ts">
	import type { PageData } from './$types';
	import { CustomersList } from '$lib/client/components/admin/organisms/CustomersList';
	import { enhance } from '$app/forms';
	import { RefreshCw, UserPlus } from '@lucide/svelte';

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
	<div class="mb-6 flex flex-col md:flex-row lg:gap-3">
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
			class="mb-3"
		>
			<button type="submit" class="btn btn-primary w-full" disabled={syncing}>
				<RefreshCw size={16} class={syncing ? 'animate-spin' : ''} />
				{syncing ? 'Synchronisation…' : 'Synchroniser les clients'}
			</button>
		</form>
		<a href="/admin/customers/create" class="btn btn-primary">
			<UserPlus size={16} />
			Ajouter un client
		</a>
	</div>
	<CustomersList customers={data.customersList} />
</div>
