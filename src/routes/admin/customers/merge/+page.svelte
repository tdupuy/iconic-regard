<script lang="ts">
	import type { PageData } from './$types';

	type FieldKey = 'name' | 'phoneNumber' | 'email';

	let { data }: { data: PageData } = $props();

	const customerMergeFrom = data.customerMergeFrom;
	const customerMergeTo = data.customerMergeTo;

	const fields: { key: FieldKey; label: string }[] = [
		{ key: 'name', label: 'Nom' },
		{ key: 'phoneNumber', label: 'Téléphone' },
		{ key: 'email', label: 'Email' }
	];

	function isEmpty(value: string | null | undefined): boolean {
		return value === null || value === undefined || value.trim() === '';
	}

	function defaultSource(key: FieldKey): 'from' | 'to' {
		const fromEmpty = isEmpty(customerMergeFrom[key]);
		const toEmpty = isEmpty(customerMergeTo[key]);

		// Si un seul des deux est vide, on présélectionne celui qui ne l'est pas.
		// Si les deux sont vides ou les deux remplis, on garde "to" (fiche cible) par défaut.
		if (fromEmpty && !toEmpty) return 'to';
		if (!fromEmpty && toEmpty) return 'from';
		return 'to';
	}

	let selection = $state<Record<FieldKey, 'from' | 'to'>>({
		name: defaultSource('name'),
		phoneNumber: defaultSource('phoneNumber'),
		email: defaultSource('email')
	});

	function select(field: FieldKey, source: 'from' | 'to') {
		if (isEmpty(source === 'from' ? customerMergeFrom[field] : customerMergeTo[field])) return;
		selection[field] = source;
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const merged = Object.fromEntries(
			fields.map(({ key }) => [
				key,
				selection[key] === 'from' ? customerMergeFrom[key] : customerMergeTo[key]
			])
		) as Record<FieldKey, string | null>;

		console.log('Fusion — champs sélectionnés :', selection);
		console.log('Fusion — données envoyées :', merged);

		// TODO: brancher l'appel réel de fusion ici (form action / fetch vers l'API de merge)
		// ex: await fetch(`/admin/customers/merge`, { method: 'POST', body: JSON.stringify({ ...merged, fromId: userMergeFrom.id, toId: userMergeTo.id }) })
	}
</script>

<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="mb-6 text-3xl font-bold text-slate-900">Fusion de clients</h1>
	<form class="card bg-base-100 w-full rounded-xl border" onsubmit={handleSubmit}>
		<div class="card-body gap-3 p-4">
			<p class="text-[13px] opacity-70">Fusionner 2 fiches</p>

			{#each fields as { key, label } (key)}
				<div class="flex flex-col gap-1">
					<span class="flex items-center gap-1 text-[11px] opacity-50">
						{#if key === 'phoneNumber'}
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
						{:else if key === 'email'}
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
						{/if}
						{label}
					</span>
					<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
						<button
							type="button"
							class="flex items-center justify-between gap-2 rounded-lg border-2 p-2 text-left text-sm transition-colors"
							class:border-success={selection[key] === 'from'}
							class:bg-success-content={selection[key] === 'from'}
							class:border-base-300={selection[key] !== 'from'}
							class:opacity-40={isEmpty(customerMergeFrom[key])}
							disabled={isEmpty(customerMergeFrom[key])}
							onclick={() => select(key, 'from')}
						>
							<span class="truncate" class:font-medium={selection[key] === 'from'}>
								{isEmpty(customerMergeFrom[key]) ? '—' : customerMergeFrom[key]}
							</span>
							{#if selection[key] === 'from'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-success h-4 w-4 shrink-0"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M20 6 9 17l-5-5" />
								</svg>
							{/if}
						</button>

						<button
							type="button"
							class="flex items-center justify-between gap-2 rounded-lg border-2 p-2 text-left text-sm transition-colors"
							class:border-success={selection[key] === 'to'}
							class:bg-success-content={selection[key] === 'to'}
							class:border-base-300={selection[key] !== 'to'}
							class:opacity-40={isEmpty(customerMergeTo[key])}
							disabled={isEmpty(customerMergeTo[key])}
							onclick={() => select(key, 'to')}
						>
							<span class="truncate" class:font-medium={selection[key] === 'to'}>
								{isEmpty(customerMergeTo[key]) ? '—' : customerMergeTo[key]}
							</span>
							{#if selection[key] === 'to'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-success h-4 w-4 shrink-0"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M20 6 9 17l-5-5" />
								</svg>
							{/if}
						</button>
					</div>
				</div>
			{/each}

			<button type="submit" class="btn btn-primary mt-2 w-full">Fusionner les clients</button>
		</div>
	</form>
</div>
