<script lang="ts">
	import type { PageData } from './$types';
	import { NewCustomerCard } from '$lib/client/components/admin/molecules/NewCustomerCard';
	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="mb-12 text-4xl font-bold text-slate-900">Clients</h1>
	{#if data.bookings.length}
		<section class="rounded-box border-warning/40 bg-warning/5 mb-12 border-2 p-6">
			<div class="mb-6 flex items-center gap-2">
				<h2 class="text-xl font-semibold text-slate-900">Nouveaux clients à valider</h2>
				<span class="badge badge-warning">{data.bookings.length}</span>
			</div>

			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.bookings as booking (booking.id)}
					<NewCustomerCard
						email={booking.attendees[0]?.email}
						phoneNumber={booking.attendees[0]?.phoneNumber}
						name={booking.attendees[0]?.name}
						reason={booking.reason}
					/>
				{/each}
			</div>
		</section>
	{/if}

	<section>
		<h2 class="mb-6 text-xl font-semibold text-slate-900">Liste des clients</h2>
		<!-- liste de clients existants, à venir -->
	</section>
</div>
