<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { formatDateTime } from '$lib/utils';
	import { PenLine, Phone, Mail, UserPlus, UserPen } from '@lucide/svelte';
	import {
		TypicalFormField,
		ReadonlyFormField
	} from '$lib/client/components/admin/atoms/FormFields';

	let { data }: { data: PageData } = $props();

	let form = $state({
		name: '',
		phone_number: '',
		email: ''
	});

	$effect(() => {
		form.name = data.customer?.name ?? '';
		form.phone_number = data.customer?.phoneNumber ?? '';
		form.email = data.customer?.email ?? '';
	});

	let submitting = $state(false);
	let message = $state<string | null>(null);
</script>

<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="mb-8 flex items-center justify-between gap-4">
		<div class="flex flex-col gap-1">
			<h1 class="text-3xl font-bold text-slate-900">Édition de client</h1>
			<p class="text-sm text-slate-600">Modifiez les informations du client ci-dessous.</p>
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
		action="?/updateCustomer"
		use:enhance={() => {
			submitting = true;
			message = null;
			return async ({ result, update }) => {
				submitting = false;
				if (result.type === 'success') {
					message = 'Client mis à jour avec succès.';
					await update();
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
		class="card bg-base-100 w-full rounded-xl border"
	>
		<div class="card-body gap-3 p-4">
			<input type="hidden" name="id" value={data.customer?.id} />

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
			<div class="mt-3 grid gap-4 sm:grid-cols-2">
				<div class="flex flex-col gap-1">
					<ReadonlyFormField
						label="Créé le :"
						icon={UserPlus}
						value={formatDateTime(data.customer.createdAt)}
					/>
				</div>

				<div class="flex flex-col gap-1">
					<ReadonlyFormField
						label="Mis à jour le :"
						icon={UserPen}
						value={formatDateTime(data.customer.updatedAt)}
					/>
				</div>
			</div>

			<button type="submit" class="btn btn-primary mt-5 w-full" disabled={submitting}>
				{submitting ? 'Enregistrement...' : 'Enregistrer'}
			</button>
		</div>
	</form>
</div>
