<script lang="ts">
	import HomePresentation from '$lib/client/components/molecules/HomePresentation';
	import Menu from '../Menu';
</script>

<main
	class="flex flex-1 flex-col items-center justify-center gap-[clamp(2rem,6vw,7rem)]
                 px-[clamp(1rem,5vw,2rem)]
                 pt-[clamp(0.5rem,2vw,1rem)]
                 pb-[clamp(2rem,5vw,3rem)]
                 text-center
                 lg:mx-auto lg:w-full
                 lg:max-w-[1100px] lg:flex-row lg:text-left"
>
	<HomePresentation />
	<!-- Droite : grille de cartes -->
	<Menu />
</main>

<style>
	@keyframes floatOrb {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-18px);
		}
	}
	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.anim-float {
		animation: float 6s ease-in-out infinite;
	}
	.anim-1 {
		opacity: 0;
		animation: fadeUp 0.7s ease 0.15s forwards;
	}
	.anim-2 {
		opacity: 0;
		animation: fadeUp 0.7s ease 0.3s forwards;
	}
	.anim-3 {
		opacity: 0;
		animation: fadeUp 0.7s ease 0.45s forwards;
	}
	.anim-4 {
		opacity: 0;
		animation: fadeUp 0.7s ease 0.6s forwards;
	}
	.anim-5 {
		opacity: 0;
		animation: fadeUp 0.7s ease 0.75s forwards;
	}
</style>
