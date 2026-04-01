<script lang="ts">
	import HomePresentation from '$lib/client/components/molecules/HomePresentation';
	import Menu from '../Menu';
</script>

<main
	class="flex flex-1 flex-col items-center gap-[clamp(2rem,6vw,7rem)]
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
