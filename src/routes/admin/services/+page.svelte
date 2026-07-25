<script lang="ts">
	import type { PageData } from './$types';
	import {ServiceInfoLine} from '$lib/client/components/admin/molecules/ServiceInfoLine';

	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="mb-12 text-4xl font-bold text-slate-900">Gestion des prestations</h1>
	<section>
		{#each data.services as service (service.id)}
			<ServiceInfoLine {service} />
		{/each}
	</section>
</div>
