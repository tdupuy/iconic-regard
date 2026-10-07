<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { LoyaltyStars } from '$lib/client/components/admin/molecules/LoyaltyStars';
	import { formatDateTime } from '$lib/utils';
	import {
		PenLine,
		Phone,
		Mail,
		UserPlus,
		UserPen,
		NotebookPen,
		ArrowLeft,
		CalendarPlus,
		ChevronRight,
		CircleCheck,
		Star
	} from '@lucide/svelte';
	import {
		TypicalFormField,
		ReadonlyFormField
	} from '$lib/client/components/admin/atoms/FormFields';
	import { CancelCustomerForm } from '$lib/client/components/admin/organisms/CancelCustomerForm';

	type Customer = {
		id: string;
		name: string;
		phoneNumber: string;
		email: string | null;
		createdAt: Date;
		updatedAt: Date;
	};

	let {
		customer = null,
		action,
		title,
		description,
		submitLabel = 'Enregistrer',
		type,
		visits = []
	}: {
		customer?: Customer | null;
		action: string;
		title: string;
		description: string;
		submitLabel?: string;
		type: 'create' | 'update';
		visits?: Date[];
	} = $props();

	let form = $state({
		name: customer?.name ?? '',
		phone_number: customer?.phoneNumber ?? '',
		email: customer?.email ?? ''
	});

	let submitting = $state(false);
	let message = $state<string | null>(null);
</script>

<div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
	<header class="mb-6 flex items-start justify-between gap-4">
		<div class="flex flex-col gap-1">
			<h1 class="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
			<p class="text-sm text-slate-600">{description}</p>
		</div>
		<a href="/admin/customers" class="btn btn-ghost btn-sm shrink-0 gap-1">
			<ArrowLeft class="size-4" />
			Retour
		</a>
	</header>

	{#if message}
		<div role="alert" class="alert alert-success mb-6">
			<CircleCheck class="size-5 shrink-0" />
			<span>{message}</span>
		</div>
	{/if}

	<div class="grid items-start gap-6 lg:grid-cols-3">
		<form
			method="POST"
			{action}
			use:enhance={() => {
				submitting = true;
				message = null;
				return async ({ result, update }) => {
					submitting = false;

					if (result.type === 'redirect') {
						await applyAction(result);
						return;
					}

					if (result.type === 'success') {
						message = customer ? 'Client mis à jour avec succès.' : 'Client créé avec succès.';
						await update({ reset: false });
					} else if (result.type === 'failure' && result.data) {
						message =
							typeof result.data.message === 'string'
								? result.data.message
								: 'Une erreur est survenue.';
					} else {
						message = 'Une erreur est survenue.';
					}
				};
			}}
			class="card border-base-300 border bg-white lg:col-span-2"
		>
			<div class="card-body gap-4 p-4 sm:p-6">
				{#if customer}
					<input type="hidden" name="id" value={customer.id} />
				{/if}

				<div class="grid gap-4 sm:grid-cols-2">
					<TypicalFormField id="name" label="Nom" icon={PenLine} bind:value={form.name} />
					<TypicalFormField
						id="phone_number"
						label="Numéro de téléphone"
						icon={Phone}
						bind:value={form.phone_number}
					/>
					<div class="sm:col-span-2">
						<TypicalFormField id="email" label="Email" icon={Mail} bind:value={form.email} />
					</div>
				</div>

				<button
					type="submit"
					class="btn btn-primary w-full sm:w-auto sm:self-end"
					disabled={submitting}
				>
					{submitting ? 'Enregistrement...' : submitLabel}
				</button>

				{#if customer}
					<div class="border-base-300 flex flex-wrap justify-between gap-2 border-t pt-3">
						<ReadonlyFormField
							label="Créé le :"
							icon={UserPlus}
							value={formatDateTime(customer.createdAt)}
							extraClasses="flex items-center gap-1 text-[11px] opacity-50"
						/>
						<ReadonlyFormField
							label="Mis à jour le :"
							icon={UserPen}
							value={formatDateTime(customer.updatedAt)}
							extraClasses="flex items-center gap-1 text-[11px] opacity-50"
						/>
					</div>
				{/if}
			</div>
		</form>

		{#if type === 'update' && customer}
			<aside class="flex flex-col gap-4">
				<div class="card border-base-300 border bg-white">
					<div class="card-body gap-2 p-4">
						<div class="flex items-center gap-1.5 text-sm font-medium">
							<Star class="text-primary size-4" />
							Fidélité
						</div>
						<LoyaltyStars customerId={customer.id} {visits} />
					</div>
				</div>

				<a
					href="/admin/customers/notes/{customer.id}"
					class="card border-base-300 hover:bg-base-200/50 border bg-white transition-colors"
				>
					<div class="card-body flex-row items-center justify-between p-4">
						<span class="flex items-center gap-1.5 text-sm font-medium">
							<NotebookPen class="text-primary size-4" />
							Notes
						</span>
						<ChevronRight class="size-4 opacity-50" />
					</div>
				</a>
				<a href="/admin/booking/create/{customer.id}" class="btn btn-outline btn-primary gap-2">
					<CalendarPlus class="size-4" />
					Planifier un nouveau rdv
				</a>
				<div class="divider my-0"></div>

				<CancelCustomerForm customerId={customer.id} onCancelled={(msg) => (message = msg)} />
			</aside>
		{/if}
	</div>
</div>
