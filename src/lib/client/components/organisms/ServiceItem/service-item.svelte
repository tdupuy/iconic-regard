<script lang="ts">
	import { slide } from 'svelte/transition';
	import Cal from '$lib/client/components/organisms/Cal';
	import { PUBLIC_CAL_LINK } from '$env/static/public';
	import { Heart } from 'lucide-svelte';

	let {
		namespace,
		imgUrl,
		category,
		service,
		duration,
		price,
		description,
		cardBorder = '{cardBorder}',
		border = '{border}',
		bgImg = '{bgImg}',
		iconImg = '{iconImg}',
		textCategory = '{textCategory}',
		textService = '{textService}',
		bgTablets = '{bgTablets}',
		textTablets = '{textTablets}',
		bgActionBtn = '{bgActionBtn}',
		isService = false
	}: {
		namespace: string;
		imgUrl: string;
		category: string;
		service: string;
		duration: string;
		price: string;
		description: string;
		cardBorder?: string;
		border?: string;
		bgImg?: string;
		iconImg?: string;
		textCategory?: string;
		textService?: string;
		bgTablets?: string;
		textTablets?: string;
		bgActionBtn?: string;
		isService?: boolean;
	} = $props();
	let expanded = $state(false);

	let imageExists = $state(false);

	async function checkImage(url: string) {
		if (!url || url === 'null' || url === 'undefined') {
			imageExists = false;
			return;
		}
		try {
			const res = await fetch(url, { method: 'HEAD' });
			imageExists = res.ok;
		} catch {
			imageExists = false;
		}
	}
	checkImage(imgUrl);
</script>

<Cal {namespace} />

<div class="mx-2 rounded-lg border {cardBorder} bg-white p-4 shadow-sm transition-all duration-300">
	<div class="mb-4 flex items-center">
		<div class="mr-4 h-16 w-16 overflow-hidden rounded-full border-2 {border}">
			{#if imageExists}
				<img src={imgUrl} alt="Lash Lift" class="h-full w-full object-cover" />
			{:else}
				<div class="flex h-full w-full items-center justify-center {bgImg}">
					<Heart class="h-4 w-4 {iconImg}" fill="transparent" />
				</div>
			{/if}
		</div>
		<div class="flex-1">
			<p
				class="font-body-light {textCategory} m-0 text-[clamp(0.5rem,1.1vw,0.62rem)] tracking-[0.14em] uppercase"
			>
				{category}
			</p>
			<p class="font-title {textService} m-0 mt-1 text-left text-xl font-semibold">
				{service}
			</p>
			<div class="mt-2 flex gap-2">
				<div class="rounded {bgTablets} px-2 py-1">
					<p class="text-xs {iconImg}">Durée</p>
					<p class="text-center text-sm font-bold {textTablets}">{duration}</p>
				</div>
				<div class="rounded {bgTablets} px-2 py-1">
					<p class="text-xs {iconImg}">Prix</p>
					<p class="text-sm font-bold {textTablets}">{price}</p>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-2 flex justify-center gap-2">
		{#if !isService}
			<button
				class="rounded border {border} px-4 py-2 {iconImg} hover:{bgTablets}"
				onclick={() => (expanded = !expanded)}
			>
				{expanded ? 'Voir moins' : 'En savoir plus'}
			</button>
			<button
				class="rounded {bgActionBtn} px-4 py-2 font-medium text-white hover:bg-purple-400"
				data-cal-link={PUBLIC_CAL_LINK + '/30min'}
				data-cal-namespace={namespace}
			>
				Prendre rdv
			</button>
		{/if}
	</div>
	{#if expanded || isService}
		<div
			transition:slide={{ duration: 240 }}
			class="mt-4 rounded-lg {bgTablets} p-4 text-sm text-slate-700"
		>
			<p class="m-0 leading-6">
				{description}
			</p>
		</div>
	{/if}
	{#if isService}
		<div class="mt-3 flex justify-center">
			<button
				class="rounded {bgActionBtn}  mx-auto px-4 py-2 font-medium text-white hover:bg-purple-400"
				data-cal-link={PUBLIC_CAL_LINK + '/30min'}
				data-cal-namespace={namespace}
			>
				Prendre rdv
			</button>
		</div>
	{/if}
</div>
