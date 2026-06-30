<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	$effect(() => {
		console.log('booking', data.bookings);
		console.log('client', data.bookings[0]?.attendees[0]);
	});
</script>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="mb-12 flex items-center justify-between">
		<h1 class="text-4xl font-bold text-slate-900">Clients</h1>
	</div>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.bookings as booking (booking.id)}
			<div class="card bg-base-100 shadow-sm">
				<div class="card-body">
					<h2 class="card-title">{booking.attendees[0]?.name}</h2>
					<p>
						{booking.attendees[0]?.phoneNumber}
					</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Buy Now</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
