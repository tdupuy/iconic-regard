<script>
	import Cal from '$lib/client/components/organisms/Cal';
	import { PUBLIC_CAL_LINK } from '$env/static/public';
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-4 text-4xl font-bold text-slate-900">Bienvenue</h1>
		<p class="mb-8 text-lg text-slate-600">
			Visitez <a href="https://svelte.dev/docs/kit" class="text-blue-600 hover:underline"
				>svelte.dev/docs/kit</a
			>
			pour lire la documentation
		</p>
		<div style="height: 600px; width: 100%;">
			<Cal embedType="inline" namespace="my-meeting" calLink="thibaut-dupuy-r9qkan/30min" />
		</div>
		<!--<Cal embedType="floatingButton" namespace="15min" calLink="thibaut-dupuy-r9qkan/30min" />-->
		<!--<Cal namespace="15min" />
		<button
			data-cal-link="thibaut-dupuy-r9qkan/30min"
			data-cal-namespace="15min"
			class="rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition-colors hover:bg-blue-700"
		>
			Book a 15min Meeting
		</button>-->
	</div>
</div>
