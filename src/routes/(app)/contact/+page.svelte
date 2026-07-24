<script lang="ts">
	import { PageTitle } from '$lib/client/components/atoms/PageTitle';
	import { Phone, AtSign, MapPinHouse } from '@lucide/svelte';
	import { SiInstagram, SiFacebook } from '@icons-pack/svelte-simple-icons';
	let { data } = $props();
</script>

<PageTitle title={data.title} />

<div class="mt-5 mb-10 flex flex-col items-center gap-4">
	<a
		href="tel:+33766128958"
		class="text-base-content mt-2 flex flex-row items-center gap-4 text-center text-[clamp(1rem,1vw,1.5rem)]"
	>
		<Phone size={28} strokeWidth={1.5} />
		07 66 12 89 58
	</a>
	<a
		href="mailto:iconic.regard@gmail.com"
		class="text-base-content mt-2 flex flex-row items-center gap-4 text-center text-[clamp(1rem,1vw,1.5rem)]"
	>
		<AtSign size={28} strokeWidth={1.5} />
		iconic.regard@gmail.com
	</a>
</div>

<PageTitle title="Sur les réseaux" />

<div class="mt-5 mb-10 flex flex-col items-center gap-4">
	<a
		href="https://www.instagram.com/iconic_regard?igsh=MTliZXlwbmE4M3ExZA=="
		target="_blank"
		class="text-base-content mt-2 flex flex-row items-center gap-4 text-center text-[clamp(1rem,1vw,1.5rem)]"
	>
		<SiInstagram size={28} />
		@iconic_regard
	</a>
	<a
		href="https://www.facebook.com/profile.php?id=61580708107829"
		target="_blank"
		class="text-base-content mt-2 flex flex-row items-center gap-4 text-center text-[clamp(1rem,1vw,1.5rem)]"
	>
		<SiFacebook size={28} />
		iconicregard
	</a>
</div>

<PageTitle title="Où me trouver" />

<div class="mt-5 flex flex-col items-center justify-center">
	<p
		class="text-base-content mt-2 mb-5 flex flex-row items-center gap-4 text-center text-[clamp(1rem,1vw,1.5rem)]"
	>
		<MapPinHouse size={28} strokeWidth={1.5} class="mb-4" /> 1 Rue nationale<br />72550
		Coulans-sur-Gée
	</p>

	<div class="mt-10 w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm lg:w-[30%]">
		<iframe
			src="https://maps.google.com/maps?q=48.021202528652886,0.013571920140973777&output=embed"
			width="100%"
			height="256"
			style="border:0"
			allowfullscreen
			loading="lazy"
			title="Localisation de Iconic Regard"
		></iframe>
	</div>
</div>
