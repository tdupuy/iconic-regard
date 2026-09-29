<script lang="ts">
	import { User, Sparkles, Calendar } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import {
		TypicalFormField,
		ReadonlyFormField,
		ComboboxFormField
	} from '$lib/client/components/admin/atoms/FormFields';

	let { data }: { data: PageData } = $props();

	let date = $state('');
	let customerId = $state('');
	let prestationType = $state('');
</script>

<form class="card w-full">
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
				<input id="date" type="text" bind:value={date} class="input input-bordered w-full" />
			</div>
		</div>
	</div>

	<button type="submit" class="btn btn-primary mt-5 w-full">Valider</button>
</form>
