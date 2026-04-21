<script lang="ts">
	import ServiceItem from '$lib/client/components/organisms/ServiceItem';
	import { PageTitle } from '$lib/client/components/atoms/PageTitle';
	import CategorySelect from '$lib/client/components/molecules/CategorySelect';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	const { data } = $props();
	let selectedCategory = $state(0);
	let current = $state(0);

	const filteredServices = $derived(
		selectedCategory === 0
			? data.services
			: data.services.filter((s) => s.category.id === selectedCategory)
	);

	$effect(() => {
		filteredServices;
		current = 0;
	});

	const colors = [
		{
			cardBorder: 'border-purple-600',
			border: 'border-purple-300',
			bgImg: 'bg-purple-100',
			iconImg: 'text-purple-400',
			textCategory: 'text-primary',
			textService: 'text-base-content',
			bgTablets: 'bg-purple-50',
			textTablets: 'text-purple-900',
			bgActionBtn: 'bg-purple-300'
		},
		{
			cardBorder: 'border-secondary',
			border: 'border-secondary',
			bgImg: 'bg-secondary/20',
			iconImg: 'text-secondary',
			textCategory: 'text-secondary',
			textService: 'text-secondary-content',
			bgTablets: 'bg-secondary/10',
			textTablets: 'text-secondary-content',
			bgActionBtn: 'bg-secondary'
		},
		{
			cardBorder: 'border-accent',
			border: 'border-accent',
			bgImg: 'bg-accent/20',
			iconImg: 'text-accent',
			textCategory: 'text-accent',
			textService: 'text-accent-content',
			bgTablets: 'bg-accent/10',
			textTablets: 'text-accent-content',
			bgActionBtn: 'bg-accent'
		}
	];

	const prev = () => (current = (current - 1 + filteredServices.length) % filteredServices.length);
	const next = () => (current = (current + 1) % filteredServices.length);

	let touchStartX = 0;

	function onTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function onTouchEnd(e: TouchEvent) {
		const delta = touchStartX - e.changedTouches[0].clientX;
		if (Math.abs(delta) < 50) return;
		delta > 0 ? next() : prev();
	}
</script>

<PageTitle title={data.title} />
<CategorySelect categories={data.categories} onchange={(id) => (selectedCategory = id)} />

<div class="bg-purple-50/10 py-4">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<div class="relative flex items-center">
			<button
				class="btn btn-ghost btn-sm btn-circle absolute -left-6 z-10 opacity-50"
				onclick={prev}
			>
				<ChevronLeft class="h-4 w-4" />
			</button>

			<div class="w-full" ontouchstart={onTouchStart} ontouchend={onTouchEnd}>
				{#each filteredServices as service, i (service.id)}
					{@const c = colors[i % colors.length]}
					{#if i === current}
						<ServiceItem
							namespace={service.slug}
							imgUrl={'/assets/' + service.imgName}
							category={service.category.name}
							service={service.name}
							duration={service.duration + ' min'}
							price={service.price + ' €'}
							description={service.description}
							cardBorder={c.cardBorder}
							border={c.border}
							bgImg={c.bgImg}
							iconImg={c.iconImg}
							textCategory={c.textCategory}
							textService={c.textService}
							bgTablets={c.bgTablets}
							textTablets={c.textTablets}
							bgActionBtn={c.bgActionBtn}
						/>
					{/if}
				{/each}
			</div>

			<button
				class="btn btn-ghost btn-sm btn-circle absolute -right-6 z-10 opacity-50"
				onclick={next}
			>
				<ChevronRight class="h-4 w-4" />
			</button>
		</div>
	</div>
</div>
