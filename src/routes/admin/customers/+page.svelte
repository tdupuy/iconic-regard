<script lang="ts">
	import type { PageData } from './$types';
	import { NewCustomerCard } from '$lib/client/components/admin/molecules/NewCustomerCard';
	let { data }: { data: PageData } = $props();
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
		<!-- liste de clients existants, à venir -->
	</section>
</div>
