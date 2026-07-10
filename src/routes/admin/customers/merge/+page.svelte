<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="mb-6 text-3xl font-bold text-slate-900">Fusion de clients</h1>
	<p class="mb-6 text-slate-600">
		Indique deux uid dans l'URL : <code>?uid1=...&uid2=...</code>
	</p>

	<div class="rounded-box border border-slate-200 bg-slate-50 p-6 shadow-sm">
		<p class="mb-2 text-slate-700"><strong>UID 1 :</strong> {data.uid1 ?? 'non fourni'}</p>
		<p class="text-slate-700"><strong>UID 2 :</strong> {data.uid2 ?? 'non fourni'}</p>
	</div>
</div>
