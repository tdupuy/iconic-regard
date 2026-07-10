<script lang="ts">
	import type { PageData } from './$types';
	import { ConflictedClients } from '$lib/client/components/admin/organisms/ConflictedClients';
	import { ClientList } from '$lib/client/components/admin/organisms/ClientList';
	//let { data }: { data: PageData } = $props();

	// Données d'exemple — remplace par tes vraies données / props
	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="mb-12 text-4xl font-bold text-slate-900">Clients</h1>
	{#if data.bookings.length}
		<section class="rounded-box border-warning/40 bg-warning/5 mb-12 border-2 p-6">
			<ConflictedClients bookings={data.bookings} />
		</section>
	{/if}
	<ClientList />
</div>
