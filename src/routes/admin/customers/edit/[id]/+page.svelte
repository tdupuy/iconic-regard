<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { formatDateTime } from '$lib/utils';

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
					<label for="name" class="flex items-center gap-1 text-[11px] opacity-50">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3 shrink-0"
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M12 20h9" />
							<path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
						</svg>
						Nom
					</label>
					<input
						id="name"
						name="name"
						type="text"
						bind:value={form.name}
						required
						class="input input-bordered w-full"
					/>
				</div>

				<div class="flex flex-col gap-1">
					<label for="phone_number" class="flex items-center gap-1 text-[11px] opacity-50">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"
							/>
						</svg>
						Numéro de téléphone
					</label>
					<input
						id="phone_number"
						name="phone_number"
						type="text"
						bind:value={form.phone_number}
						required
						class="input input-bordered w-full"
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="phone_number" class="flex items-center gap-1 text-[11px] opacity-50">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<rect x="2" y="4" width="20" height="16" rx="2" />
							<path d="m22 6-10 7L2 6" />
						</svg>
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						bind:value={form.email}
						required
						class="input input-bordered w-full"
					/>
				</div>
			</div>
			<div class="mt-3 grid gap-4 sm:grid-cols-2">
				<div class="flex flex-col gap-1">
					<span class="flex items-center gap-1 text-[11px] opacity-50">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3 shrink-0"
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<circle cx="12" cy="12" r="10" />
							<path d="M12 6v6l4 2" />
						</svg>
						Créé le :
					</span>
					<div class="align-items-center flex">
						<span>{formatDateTime(data.customer.createdAt)}</span>
					</div>
				</div>

				<div class="flex flex-col gap-1">
					<span class="flex items-center gap-1 text-[11px] opacity-50">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3 shrink-0"
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<circle cx="12" cy="12" r="10" />
							<path d="M12 6v6l4 2" />
						</svg>
						Mis à jour le :
					</span>
					<div class="align-items-center flex">
						<span class="truncate">{formatDateTime(data.customer.updatedAt)}</span>
					</div>
				</div>
			</div>

			<button type="submit" class="btn btn-primary mt-5 w-full" disabled={submitting}>
				{submitting ? 'Enregistrement...' : 'Enregistrer'}
			</button>
		</div>
	</form>
</div>
