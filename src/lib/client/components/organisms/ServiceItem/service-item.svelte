<script lang="ts">
	import { slide } from 'svelte/transition';
	import Cal from '$lib/client/components/organisms/Cal';
	import { PUBLIC_CAL_LINK } from '$env/static/public';
	let {
		namespace,
		imgUrl,
		category,
		service,
		duration,
		price
	}: {
		namespace: string;
		imgUrl: string;
		category: string;
		service: string;
		duration: string;
		price: string;
	} = $props();
	let expanded = $state(false);
</script>

<Cal {namespace} />

<div
	class="mx-2 rounded-lg border border-purple-200 bg-white p-4 shadow-sm transition-all duration-300"
>
	<div class="mb-4 flex items-center">
		<div class="mr-4 h-16 w-16 overflow-hidden rounded-full border-2 border-purple-300">
			<img src={imgUrl} alt="Lash Lift" class="h-full w-full object-cover" />
		</div>
		<div class="flex-1">
			<p
				class="font-body-light text-primary m-0 text-[clamp(0.5rem,1.1vw,0.62rem)] tracking-[0.14em] uppercase"
			>
				{category}
			</p>
			<p class="font-title text-base-content m-0 mt-1 text-left text-xl font-semibold">
				{service}
			</p>
			<div class="mt-2 flex gap-2">
				<div class="rounded bg-purple-50 px-2 py-1">
					<p class="text-xs text-purple-400">Durée</p>
					<p class="text-center text-sm font-bold text-purple-900">{duration}</p>
				</div>
				<div class="rounded bg-purple-50 px-2 py-1">
					<p class="text-xs text-purple-400">Prix</p>
					<p class="text-sm font-bold text-purple-900">{price}</p>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-2 flex justify-center gap-2">
		<button
			class="rounded border border-purple-300 px-4 py-2 text-purple-600 hover:bg-purple-50"
			onclick={() => (expanded = !expanded)}
		>
			{expanded ? 'Voir moins' : 'En savoir plus'}
		</button>
		<button
			class="rounded bg-purple-300 px-4 py-2 font-medium text-white hover:bg-purple-400"
			data-cal-link={PUBLIC_CAL_LINK + '/30min'}
			data-cal-namespace={namespace}
		>
			Prendre rdv
		</button>
	</div>
	{#if expanded}
		<div
			transition:slide={{ duration: 240 }}
			class="mt-4 rounded-lg bg-purple-50 p-4 text-sm text-slate-700"
		>
			<p class="m-0 leading-6">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, lectus nec interdum
				consequat, nibh lectus porta elit, at blandit felis mauris a turpis. Integer vitae justo ut
				ligula consequat fermentum. Curabitur in mattis odio, eu pulvinar mauris.
			</p>
		</div>
	{/if}
</div>
