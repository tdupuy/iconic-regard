<script lang="ts">
	import BookingMenu from '../../molecules/BookingMenu';
	import ContactMenu from '../../molecules/ContactMenu';
	import GalleryMenu from '../../molecules/GalleryMenu';
	import ServiceMenu from '../../molecules/ServiceMenu';
	import Tile from '../../molecules/Tile';
</script>

<div class="anim-5 grid w-full max-w-[480px] shrink-0 grid-cols-2 gap-[clamp(0.5rem,2vw,0.9rem)]">
	<!--<ServiceMenu />
	<BookingMenu />
	<ContactMenu />
	<GalleryMenu />-->
	<Tile
		href="#prestations"
		id="prestations"
		label="Découvrir"
		title="Mes Prestations"
		highlighted
	/>
</div>
