<script lang="ts">
	import ServiceItem from '$lib/client/components/organisms/ServiceItem';
	import { PageTitle } from '$lib/client/components/atoms/PageTitle';
	import CategorySelect from '$lib/client/components/molecules/CategorySelect';

	const { data } = $props();

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
	console.log(data.services);
</script>

<PageTitle title={data.title} />
<CategorySelect categories={data.categories} />
<!-- Loop Between both components -->
{#each data.services as service, i (service.id)}
	{@const c = colors[i % colors.length]}
	<div class="mt-3 md:hidden">
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
	</div>

	<div class="hidden bg-purple-50/10 py-4 md:block">
		<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
		</div>
	</div>
{/each}
