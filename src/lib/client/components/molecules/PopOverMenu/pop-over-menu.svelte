<script lang="ts">
	import { X } from 'lucide-svelte';
	let { onClose }: { onClose: () => void } = $props();
</script>

<div class="bg-base-100/95 fixed inset-0 z-50 backdrop-blur-sm">
	<div class="flex h-full flex-col">
		<div class="flex items-center justify-between px-6 py-4">
			<button
				type="button"
				class="btn btn-ghost btn-square text-base-content ml-auto"
				onclick={onClose}
				aria-label="Fermer le menu"
			>
				<X class="h-6 w-6" />
			</button>
		</div>

		<div
			class="mt-12 flex flex-1 flex-col items-center justify-start gap-8 px-6 text-2xl font-semibold"
		>
			<a
				href="/services"
				class=" font-title text-base-content m-0 text-center text-4xl leading-tight font-extralight"
				onclick={onClose}>Mes Prestations</a
			>
			<a
				href="/contact"
				class="font-title text-base-content m-0 text-center text-4xl leading-tight font-extralight"
				onclick={onClose}>Me contacter</a
			>
			<a
				href="https://www.instagram.com/iconic_regard?igsh=MTliZXlwbmE4M3ExZA=="
				target="_blank"
				class=" font-title text-base-content m-0 text-center text-4xl leading-tight font-extralight"
				onclick={onClose}>Mes réalisations</a
			>
			<a
				href="/booking"
				class="btn text-base-100 shadow-secondary/20 from-secondary to-primary rounded-full border-0 bg-gradient-to-r px-8 py-2 text-xl tracking-normal italic shadow-lg transition-transform hover:scale-[1.02]"
				onclick={onClose}
			>
				Prendre rendez-vous
			</a>
		</div>
	</div>
</div>
