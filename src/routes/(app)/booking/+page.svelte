<script lang="ts">
	import ServiceItem from '$lib/client/components/organisms/ServiceItem';
	const { data } = $props();
	console.log(data);
</script>

<!-- Loop Between both components -->
{#each data.services as service (service.id)}
	<div class="md:hidden">
		<ServiceItem
			namespace={service.slug}
			imgUrl="src/lib/client/assets/lash-lift-corean.webp"
			category={service.category}
			service={service.name}
			duration={service.duration + ' min'}
			price={service.price + ' €'}
		/>
	</div>

	<div class="hidden min-h-screen bg-purple-50/10 py-16 md:block">
		<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
			<ServiceItem
				namespace={service.slug}
				imgUrl="src/lib/client/assets/lash-lift-corean.webp"
				category={service.category}
				service={service.name}
				duration={service.duration + ' min'}
				price={service.price + ' €'}
			/>
		</div>
	</div>
{/each}
