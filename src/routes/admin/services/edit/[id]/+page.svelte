<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import {
		TypicalFormField,
		ReadonlyFormField
	} from '$lib/client/components/admin/atoms/FormFields';
	import { PenLine, CircleEuro, Clock, Key } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	let form = $state({
		name: '',
		description: '',
		price: ''
	});

	$effect(() => {
		form.name = data.service?.name ?? '';
		form.description = data.service?.description ?? '';
		form.price = data.service?.price ?? '';
	});

	let submitting = $state(false);
	let message = $state<string | null>(null);
</script>

<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="mb-8 flex items-center justify-between gap-4">
		<div class="flex flex-col gap-1">
			<h1 class="text-3xl font-bold text-slate-900">Édition de prestation</h1>
			<p class="text-sm text-slate-600">Modifiez les informations de la prestation ci-dessous.</p>
		</div>
		<a href="/admin/services" class="btn btn-ghost btn-sm gap-1">
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
		action="?/updateService"
		use:enhance={() => {
			submitting = true;
			message = null;
			return async ({ result, update }) => {
				submitting = false;
				if (result.type === 'success') {
					message = 'Prestation mise à jour avec succès.';
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
			<input type="hidden" name="id" value={data.service?.id} />

			<div class="grid gap-4 sm:grid-cols-2">
				<div class="flex flex-col gap-1">
					<TypicalFormField id="name" label="Nom" icon={PenLine} bind:value={form.name} />
				</div>

				<div class="flex flex-col gap-1">
					<TypicalFormField id="price" label="Prix" icon={CircleEuro} bind:value={form.price} />
				</div>
			</div>

			<div class="mt-3 flex flex-col gap-1">
				<label for="description" class="flex items-center gap-1 text-[11px] opacity-50">
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
						<path d="M4 6h16M4 12h16M4 18h10" />
					</svg>
					Description
				</label>
				<textarea
					id="description"
					name="description"
					bind:value={form.description}
					rows="8"
					required
					class="textarea textarea-bordered mt-1 min-h-40 w-full"
				></textarea>
			</div>
			<div class="mt-3 grid gap-4 sm:grid-cols-2">
				<div class="flex flex-col gap-1">
					<ReadonlyFormField label="Durée" icon={Clock} value={`${data.service?.duration} min`} />
				</div>

				<div class="flex flex-col gap-1">
					<ReadonlyFormField label="Slug" icon={Key} value={data.service?.slug} />
				</div>
			</div>

			<button type="submit" class="btn btn-primary mt-5 w-full" disabled={submitting}>
				{submitting ? 'Enregistrement...' : 'Enregistrer'}
			</button>
		</div>
	</form>
</div>
