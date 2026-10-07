<script lang="ts">
	import { User, Sparkles, Calendar, UserPlus } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import {
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

<div
	class="card-body border-base-300 mx-auto w-full max-w-lg gap-5 rounded-xl border bg-white p-4 sm:p-6"
>
	<div class="flex flex-col gap-1.5">
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
			<a href="/admin/customers/create" class="btn btn-ghost btn-xs gap-1 self-end">
				<UserPlus class="size-3.5" />
				Nouveau client
			</a>
		{/if}
	</div>

	<ComboboxFormField
		id="prestation_type"
		name="prestation_type"
		label="Type de prestation"
		icon={Sparkles}
		items={data.services}
		placeholder="Rechercher une prestation..."
		bind:value={prestationType}
	/>

	<div class="flex flex-col gap-2">
		<span class="flex items-center gap-1 text-sm font-medium">
			<Calendar class="text-primary size-3.5 shrink-0" />
			Date
		</span>

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

		{#if selectedService && selectedCustomer}
			<Cal namespace={selectedService.slug} />
		{:else}
			<p class="text-xs opacity-60">
				Choisis un client et une prestation pour afficher le calendrier.
			</p>
		{/if}
	</div>
</div>
