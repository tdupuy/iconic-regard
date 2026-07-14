<script lang="ts">
	import type { PageData } from './$types';
	import { ConflictedClients } from '$lib/client/components/admin/organisms/ConflictedClients';
	import { CustomersList } from '$lib/client/components/admin/organisms/CustomersList';

	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="mb-12 text-4xl font-bold text-slate-900">Clients</h1>

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

	{#if data.bookings.length}
		<section class="rounded-box border-warning/40 bg-warning/5 mb-12 border-2 p-6">
			<ConflictedClients bookings={data.bookings} />
		</section>
	{/if}
	<CustomersList customers={data.customersList} />
</div>
