<script lang="ts">
	import { NewCustomerCard } from '$lib/client/components/admin/molecules/NewCustomerCard';
	let { bookings } = $props();
</script>

<div class="mb-6 flex items-center gap-2">
	<h2 class="text-xl font-semibold text-slate-900">Nouveaux clients à valider</h2>
	<span class="badge badge-warning">{bookings.length}</span>
</div>
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each bookings as booking (booking.id)}
		<NewCustomerCard
			email={booking.email}
			phoneNumber={booking.phoneNumber}
			name={booking.name}
			reason={booking.reason}
		/>
	{/each}
</div>
