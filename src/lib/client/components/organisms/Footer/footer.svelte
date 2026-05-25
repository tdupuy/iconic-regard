<script lang="ts">
	import { SiInstagram, SiFacebook } from '@icons-pack/svelte-simple-icons';
	import { page } from '$app/state';
</script>

<footer class="py-[clamp(1rem,3vw,1.5rem)] text-center">
	{#if page.url.pathname !== '/contact'}
		<div class="mt-5 mb-10 flex flex-row items-center justify-center gap-4">
			<a
				href="https://www.instagram.com/iconic_regard?igsh=MTliZXlwbmE4M3ExZA=="
				target="_blank"
				class="text-base-200 mt-2 flex flex-row items-center gap-2 text-center text-[clamp(0.72rem,1.8vw,0.95rem)]"
			>
				<SiInstagram size={24} />
				@iconic_regard
			</a>
			<a
				href="https://www.facebook.com/profile.php?id=61580708107829"
				target="_blank"
				class="text-base-200 text-centertext-[clamp(0.72rem,1.8vw,0.95rem)] mt-2 flex flex-row items-center gap-2"
			>
				<SiFacebook size={24} />
				iconicregard
			</a>
		</div>
	{/if}
	<p
		class="font-body-light text-primary/40 text-[clamp(0.55rem,1.1vw,0.66rem)] tracking-[0.1em] uppercase"
	>
		© 2025 Iconic Regard — Tous droits réservés
	</p>
</footer>
