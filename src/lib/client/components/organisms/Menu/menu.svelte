<script lang="ts">
	import { Calendar, MessageCircle, Image, ClipboardList } from 'lucide-svelte';
	import Tile from '../../molecules/Tile';
</script>

<div class="anim-5 grid w-full max-w-[480px] shrink-0 grid-cols-2 gap-[clamp(0.5rem,2vw,0.9rem)]">
	<Tile
		href="#prestations"
		id="prestations"
		label="Découvrir"
		title="Mes Prestations"
		Icon={ClipboardList}
	/>
	<Tile
		href="/booking"
		id="rdv"
		label="Disponibilités"
		title="Prendre rendez-vous"
		highlighted
		buttonText="Réserver →"
		Icon={Calendar}
	/>
	<Tile href="/contact" id="contact" label="Contact" title="Me contacter" Icon={MessageCircle} />
	<Tile
		href="https://www.instagram.com/iconic_regard?igsh=MTliZXlwbmE4M3ExZA=="
		id="galerie"
		label="Galerie"
		title="Mes réalisations"
		target="_blank"
		Icon={Image}
	/>
</div>
