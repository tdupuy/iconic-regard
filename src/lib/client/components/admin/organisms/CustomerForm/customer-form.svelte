<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { LoyaltyStars } from '$lib/client/components/admin/molecules/LoyaltyStars';
	import { formatDateTime } from '$lib/utils';
	import { PenLine, Phone, Mail, UserPlus, UserPen, NotebookPen } from '@lucide/svelte';
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

<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="mb-8 flex items-center justify-between gap-4">
		<div class="flex flex-col gap-1">
			<h1 class="text-3xl font-bold text-slate-900">{title}</h1>
			<p class="text-sm text-slate-600">{description}</p>
		</div>
		<a href="/admin/customers" class="btn btn-ghost btn-sm gap-1">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 shrink-0"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="m12 19-7-7 7-7" />
				<path d="M19 12H5" />
			</svg>
			Retour
		</a>
	</div>

	{#if message}
		<div role="alert" class="alert alert-success">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>{message}</span>
		</div>
	{/if}

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
		class="card w-full"
	>
		<div class="card-body w-full gap-3 rounded-xl border border-gray-400 bg-white p-4">
			{#if customer}
				<input type="hidden" name="id" value={customer.id} />
			{/if}

			<div class="grid gap-4 sm:grid-cols-2">
				<div class="flex flex-col gap-1">
					<TypicalFormField id="name" label="Nom" icon={PenLine} bind:value={form.name} />
				</div>
				<div class="flex flex-col gap-1">
					<TypicalFormField
						id="phone_number"
						label="Numéro de téléphone"
						icon={Phone}
						bind:value={form.phone_number}
					/>
				</div>
				<div class="flex flex-col gap-1">
					<TypicalFormField id="email" label="Email" icon={Mail} bind:value={form.email} />
				</div>
			</div>
			<hr />
			{#if type === 'update' && customer}
				<div class="rounded-box bg-base-200/30 text-base-content w-full px-3.5 py-3">
					<div class="flex items-center gap-1 text-sm leading-4 font-normal">
						<svg
							class="text-primary size-3.5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linejoin="round"
						>
							<path
								d="M12 3.5l2.05 4.15 4.58.67-3.31 3.23.78 4.56L12 13.96l-4.1 2.15.78-4.56-3.31-3.23 4.58-.67L12 3.5z"
							/>
						</svg>

						<span>Fidélité</span>
					</div>
					<LoyaltyStars customerId={customer.id} {visits} />
				</div>
				<hr />
				<a
					href="/admin/customers/notes/{customer.id}"
					class="rounded-box bg-base-200/30 hover:bg-base-200/50 flex w-full items-center justify-between px-3.5 py-3 transition-colors"
				>
					<div class="text-base-content flex items-center gap-1 text-sm leading-4 font-normal">
						<NotebookPen class="text-primary h-3 w-3 shrink-0" />
						<span>Notes</span>
					</div>
				</a>
			{/if}
		</div>
		<button type="submit" class="btn btn-primary mt-5 w-full" disabled={submitting}>
			{submitting ? 'Enregistrement...' : submitLabel}
		</button>
		{#if customer}
			<div class="mt-2 flex justify-between">
				<div class="flex flex-col gap-1">
					<ReadonlyFormField
						label="Créé le :"
						icon={UserPlus}
						value={formatDateTime(customer.createdAt)}
						extraClasses="flex items-center gap-1 text-[11px] opacity-50"
					/>
				</div>
				<div class="flex flex-col gap-1">
					<ReadonlyFormField
						label="Mis à jour le :"
						icon={UserPen}
						value={formatDateTime(customer.updatedAt)}
						extraClasses="flex items-center gap-1 text-[11px] opacity-50"
					/>
				</div>
			</div>
		{/if}
	</form>
	{#if type === 'update' && customer}
		<div class="mt-3">
			<CancelCustomerForm customerId={customer.id} onCancelled={(msg) => (message = msg)} />
		</div>
	{/if}
</div>
