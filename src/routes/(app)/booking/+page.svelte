<script lang="ts">
	import ServiceItem from '$lib/client/components/organisms/ServiceItem';
	const { data } = $props();
	console.log(data);
</script>

<!-- Loop Between both components -->
<div class="md:hidden">
	<ServiceItem
		namespace="15min"
		imgUrl="src/lib/client/assets/lash-lift-corean.webp"
		category="Soin des cils"
		service="Lash Lift Coréen"
		duration="15 min"
		price="25 €"
	/>
</div>

<div class="hidden min-h-screen bg-purple-50/10 py-16 md:block">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<ServiceItem
			namespace="15min"
			imgUrl="src/lib/client/assets/lash-lift-corean.webp"
			category="Soin des cils"
			service="Lash Lift Coréen"
			duration="15 min"
			price="25 €"
		/>
	</div>
</div>
