<script lang="ts">
	import Cal from '$lib/client/components/organisms/Cal';
	import { PUBLIC_CAL_LINK } from '$env/static/public';
</script>

<!--<Cal embedType="inline" namespace="mes-prestations" calLink="{PUBLIC_CAL_LINK}/30min" />-->
<Cal namespace="15min" />
<!--<button
	data-cal-link="{PUBLIC_CAL_LINK}/30min"
	data-cal-namespace="15min"
	class="rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition-colors hover:bg-blue-700"
>
	Book a 15min Meeting
</button>-->

<div class="mx-2 rounded-lg border border-purple-200 bg-white p-4 shadow-sm">
	<div class="mb-4 flex items-center">
		<div class="mr-4 h-16 w-16 overflow-hidden rounded-full border-2 border-purple-300">
			<img
				src="src/lib/client/assets/lash-lift-corean.webp"
				alt="Lash Lift"
				class="h-full w-full object-cover"
			/>
		</div>
		<div class="flex-1">
			<p
				class="font-body-light text-primary m-0 text-[clamp(0.5rem,1.1vw,0.62rem)] tracking-[0.14em] uppercase"
			>
				Soin des cils
			</p>
			<p class="font-title text-base-content m-0 mt-1 text-left text-xl font-semibold">
				Lash Lift Coréen
			</p>
			<div class="mt-2 flex gap-2">
				<div class="rounded bg-purple-50 px-2 py-1">
					<p class="text-xs text-purple-400">Durée</p>
					<p class="text-center text-sm font-bold text-purple-900">1h</p>
				</div>
				<div class="rounded bg-purple-50 px-2 py-1">
					<p class="text-xs text-purple-400">Prix</p>
					<p class="text-sm font-bold text-purple-900">65 €</p>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-2 flex justify-center gap-2">
		<button class="rounded border border-purple-300 px-4 py-2 text-purple-600 hover:bg-purple-50"
			>En savoir plus</button
		>
		<button
			class="rounded bg-purple-300 px-4 py-2 font-medium text-white hover:bg-purple-400"
			data-cal-link="{PUBLIC_CAL_LINK}/30min"
			data-cal-namespace="15min">Prendre rdv</button
		>
	</div>
</div>
