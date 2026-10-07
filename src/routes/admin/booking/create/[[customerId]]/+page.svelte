<script lang="ts">
	import { User, Sparkles, Calendar } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import {
		TypicalFormField,
		ReadonlyFormField,
		ComboboxFormField
	} from '$lib/client/components/admin/atoms/FormFields';
	import Cal from '$lib/client/components/organisms/Cal';
	import { PUBLIC_CAL_LINK } from '$env/static/public';

	let { data }: { data: PageData } = $props();
	let customerId = $state('');
	let prestationType = $state('');

	const selectedService = $derived(data.services.find((s) => s.id === Number(prestationType)));
	const selectedCustomer = $derived(
		page.params.customerId ? data.customers[0] : data.customers.find((c) => c.id === customerId)
	);
</script>

<div class="card-body w-full gap-3 rounded-xl border border-gray-400 bg-white p-4">
	{#if page.params.customerId}
		<ReadonlyFormField label="Client" icon={User} value={data.customers[0]?.name ?? ''} />
		<input type="hidden" name="customer_id" value={page.params.customerId} />
	{:else}
		<ComboboxFormField
			id="customer"
			name="customer_id"
			label="Client"
			icon={User}
			items={data.customers}
			placeholder="Rechercher un client..."
			bind:value={customerId}
		/>
	{/if}

	<ComboboxFormField
		id="prestation_type"
		name="prestation_type"
		label="Type de prestation"
		icon={Sparkles}
		items={data.services}
		placeholder="Rechercher une prestation..."
		bind:value={prestationType}
	/>

	<div class="flex flex-col gap-1">
		<label for="date" class="flex items-center gap-1 text-sm font-medium">
			<Calendar class="text-primary h-3.5 w-3.5 shrink-0" />
			Date
		</label>
		<div class="relative">
			{#if selectedService && selectedCustomer}
				<button
					type="button"
					class="btn btn-primary w-full"
					disabled={!selectedService || !selectedCustomer}
					data-cal-link={selectedService ? `${PUBLIC_CAL_LINK}/${selectedService.slug}` : undefined}
					data-cal-namespace={selectedService?.slug}
					data-cal-config={JSON.stringify({
						layout: 'month_view',
						name: selectedCustomer?.name,
						email: selectedCustomer?.email,
						attendeePhoneNumber: selectedCustomer?.phoneNumber
					})}
				>
					Choisir un créneau
				</button>
				<Cal namespace={selectedService?.slug} />
			{:else}
				<p class="text-sm opacity-60">
					Choisis un client et une prestation pour afficher le calendrier.
				</p>
			{/if}
		</div>
	</div>
</div>
