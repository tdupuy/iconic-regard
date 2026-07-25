<script lang="ts">
	import type { PageData } from './$types';
	import { ServiceInfoLine } from '$lib/client/components/admin/molecules/ServiceInfoLine';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	let { data }: { data: PageData } = $props();

	let orderMode = $state(false);
	let services = $state([...data.services]);
	let saving = $state(false);

	function handleDnd(e: CustomEvent<DndEvent<(typeof services)[number]>>) {
		services = e.detail.items;
	}

	async function saveOrder() {
		saving = true;
		try {
			const formData = new FormData();
			formData.set('ids', JSON.stringify(services.map((s) => s.id)));

			const res = await fetch('?/reorder', {
				method: 'POST',
				body: formData
			});
			if (!res.ok) throw new Error('Échec de la sauvegarde');
			orderMode = false;
		} finally {
			saving = false;
		}
	}

	function cancel() {
		orderMode = false;
		services = [...data.services];
	}
</script>

<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="mb-12 flex items-center justify-between">
		<h1 class="text-4xl font-bold text-slate-900">Gestion des prestations</h1>
		{#if orderMode}
			<div class="flex gap-2">
				<button class="btn btn-ghost" onclick={cancel}>Annuler</button>
				<button class="btn btn-primary" onclick={saveOrder} disabled={saving}>
					{saving ? 'Enregistrement...' : "Valider l'ordre"}
				</button>
			</div>
		{:else}
			<button class="btn btn-outline" onclick={() => (orderMode = true)}>Ordonner</button>
		{/if}
	</div>

	<section
		use:dndzone={{ items: services, dragDisabled: !orderMode }}
		onconsider={handleDnd}
		onfinalize={handleDnd}
	>
		{#each services as service (service.id)}
			<div animate:flip={{ duration: 150 }} class={orderMode ? 'cursor-move' : ''}>
				<ServiceInfoLine {service} />
			</div>
		{/each}
	</section>
</div>
