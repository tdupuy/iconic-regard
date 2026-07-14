<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();

	let form = $state({
		name: '',
		description: '',
		price: '',
		duration: 0,
		slug: ''
	});

	$effect(() => {
		form.name = data.service?.name ?? '';
		form.description = data.service?.description ?? '';
		form.price = data.service?.price ?? '';
		form.duration = data.service?.duration ?? 0;
		form.slug = data.service?.slug ?? '';
	});

	let submitting = $state(false);
	let message = $state<string | null>(null);
</script>

<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="mb-8 flex flex-col gap-2">
		<h1 class="text-3xl font-bold text-slate-900">Édition de prestation</h1>
		<p class="text-sm text-slate-600">Modifiez les informations de la prestation ci-dessous.</p>
	</div>

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
		class="card bg-base-100 w-full border border-slate-200 shadow-sm"
	>
		<div class="card-body gap-6 p-6 sm:p-8">
			<input type="hidden" name="id" value={data.service?.id} />

			<div class="grid gap-6 md:grid-cols-2">
				<div class="form-control">
					<label for="name" class="label pb-2">
						<span class="label-text font-medium text-slate-700">Nom</span>
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

				<div class="form-control">
					<label for="price" class="label pb-2">
						<span class="label-text font-medium text-slate-700">Prix</span>
					</label>
					<input
						id="price"
						name="price"
						type="text"
						bind:value={form.price}
						required
						class="input input-bordered w-full"
					/>
				</div>
			</div>

			<div class="form-control">
				<label for="description" class="label pb-2">
					<span class="label-text font-medium text-slate-700">Description</span>
				</label>
				<textarea
					id="description"
					name="description"
					bind:value={form.description}
					rows="8"
					required
					class="textarea textarea-bordered min-h-40 w-full"
				></textarea>
			</div>

			<div class="grid gap-6 md:grid-cols-2">
				<div class="form-control">
					<label for="duration" class="label pb-2">
						<span class="label-text font-medium text-slate-700">Durée</span>
					</label>
					<input
						id="duration"
						type="text"
						value={form.duration}
						disabled
						class="input input-bordered bg-base-200 w-full"
					/>
					<input type="hidden" name="duration" value={form.duration} />
				</div>

				<div class="form-control">
					<label for="slug" class="label pb-2">
						<span class="label-text font-medium text-slate-700">Slug</span>
					</label>
					<input
						id="slug"
						type="text"
						value={form.slug}
						disabled
						class="input input-bordered bg-base-200 w-full"
					/>
					<input type="hidden" name="slug" value={form.slug} />
				</div>
			</div>

			{#if message}
				<div class="alert alert-success py-3">
					<span>{message}</span>
				</div>
			{/if}

			<div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
				<a href="/admin/services" class="btn btn-ghost btn-sm">Retour</a>
				<button type="submit" class="btn btn-primary" disabled={submitting}>
					{submitting ? 'Enregistrement...' : 'Enregistrer'}
				</button>
			</div>
		</div>
	</form>
</div>
