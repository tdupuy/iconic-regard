<script lang="ts">
	import { PageTitle } from '$lib/client/components/atoms/PageTitle';
	import { Phone, AtSign } from 'lucide-svelte';
	import { SiInstagram, SiFacebook } from '@icons-pack/svelte-simple-icons';
	let { data } = $props();
</script>

<PageTitle title={data.title} />

<div class="mt-5 mb-10 flex flex-col items-center gap-4">
	<a
		href="tel:+33612345678"
		class="text-base-content mt-2 flex flex-row items-center gap-4 text-center text-[clamp(1rem,1vw,1.5rem)]"
	>
		<Phone size={28} strokeWidth={1.5} />
		06 12 34 56 78
	</a>
	<a
		href="mailto:ilovesodomie@gmail.com"
		class="text-base-content mt-2 flex flex-row items-center gap-4 text-center text-[clamp(1rem,1vw,1.5rem)]"
	>
		<AtSign size={28} strokeWidth={1.5} />
		ilovesodomie@gmail.com
	</a>
</div>

<PageTitle title="Sur les réseaux" />

<div class="mt-5 mb-10 flex flex-col items-center gap-4">
	<a
		href="tel:+33612345678"
		class="text-base-content mt-2 flex flex-row items-center gap-4 text-center text-[clamp(1rem,1vw,1.5rem)]"
	>
		<SiInstagram size={28} />
		06 12 34 56 78
	</a>
	<a
		href="mailto:ilovesodomie@gmail.com"
		class="text-base-content mt-2 flex flex-row items-center gap-4 text-center text-[clamp(1rem,1vw,1.5rem)]"
	>
		<SiFacebook size={28} />
		ilovesodomie@gmail.com
	</a>
</div>

<PageTitle title="Où me trouver" />
