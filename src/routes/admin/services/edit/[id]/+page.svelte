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
					<label for="price" class="flex items-center gap-1 text-[11px] opacity-50">
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
							<path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" />
							<path d="M12 16.5v.01" />
						</svg>
						Prix
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
						Durée
					</span>
					<div class="align-items-center flex">
						<span>{form.duration} min</span>
					</div>
					<input type="hidden" name="duration" value={form.duration} />
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
							<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
							<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
						</svg>
						Slug
					</span>
					<div class="align-items-center flex">
						<span class="truncate">{form.slug}</span>
					</div>
					<input type="hidden" name="slug" value={form.slug} />
				</div>
			</div>

			<button type="submit" class="btn btn-primary mt-5 w-full" disabled={submitting}>
				{submitting ? 'Enregistrement...' : 'Enregistrer'}
			</button>
		</div>
	</form>
</div>
