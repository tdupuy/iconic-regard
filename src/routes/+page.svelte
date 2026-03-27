<script>
	import Cal from '$lib/client/components/organisms/Cal';
	import logoUrl from '$lib/client/assets/logo.png?url';
	import { PUBLIC_CAL_LINK } from '$env/static/public';
</script>

<header
	class="flex items-center justify-between px-[clamp(1rem,5vw,3rem)] py-[clamp(0.9rem,3vw,1.5rem)]"
></header>
<main
	class="flex flex-1 flex-col items-center justify-center gap-[clamp(2rem,6vw,7rem)]
                 px-[clamp(1rem,5vw,2rem)]
                 pt-[clamp(0.5rem,2vw,1rem)]
                 pb-[clamp(2rem,5vw,3rem)]
                 text-center
                 lg:mx-auto lg:w-full
                 lg:max-w-[1100px] lg:flex-row lg:text-left"
>
	<!-- Gauche : logo + texte -->
	<div class="flex flex-col items-center lg:items-start">
		<img
			src={logoUrl}
			alt="Iconic Regard"
			class="anim-float anim-1 mb-[clamp(0.5rem,2vw,1rem)] object-contain drop-shadow-lg"
			style="width:clamp(120px,30vw,220px);height:clamp(120px,30vw,220px);"
		/>

		<p
			class="anim-1 font-body-light text-primary mb-[clamp(0.25rem,0.8vw,0.5rem)] text-[clamp(0.52rem,1.4vw,0.7rem)] tracking-[0.22em] uppercase"
		>
			Institut de beauté du regard
		</p>

		<h1
			class="anim-2 text-base-content mb-[clamp(0.25rem,0.8vw,0.4rem)] text-[clamp(2.4rem,8vw,5.2rem)] leading-none"
		>
			Iconic Regard
		</h1>

		<!-- Séparateur décoratif -->
		<div
			class="anim-3 mx-auto my-[clamp(0.3rem,1vw,0.6rem)] flex items-center gap-2 lg:mx-0"
			style="width:clamp(130px,22vw,200px);"
		>
			<div class="bg-base-300 h-px flex-1"></div>
			<svg width="5" height="5" viewBox="0 0 5 5" aria-hidden="true">
				<circle cx="2.5" cy="2.5" r="2.5" fill="oklch(var(--color-primary))" opacity="0.7" />
			</svg>
			<div class="bg-base-300 h-px flex-1"></div>
		</div>

		<p
			class="anim-4 font-body-light text-primary mb-[clamp(1.4rem,4vw,2.2rem)] max-w-[400px] text-[clamp(0.72rem,1.8vw,0.95rem)] leading-[1.75] lg:mb-0"
		>
			Sublimez votre regard avec des soins personnalisés,<br class="hidden sm:block" />
			alliant expertise et douceur.
		</p>
	</div>

	<!-- Droite : grille de cartes -->
	<div class="anim-5 grid w-full max-w-[480px] shrink-0 grid-cols-2 gap-[clamp(0.5rem,2vw,0.9rem)]">
		<!-- Prestations -->
		<a
			href="#prestations"
			id="prestations"
			class="bg-base-100/70 border-base-300 flex flex-col
                  items-center gap-[clamp(0.38rem,1vw,0.6rem)] rounded-[clamp(14px,3vw,20px)]
                  border
                  px-[clamp(0.6rem,2vw,1rem)] py-[clamp(0.9rem,3vw,1.5rem)]
                  no-underline backdrop-blur
                  transition-all hover:-translate-y-1 hover:shadow-lg"
		>
			<div
				class="bg-primary/10 flex items-center justify-center rounded-full"
				style="width:clamp(36px,8vw,50px);height:clamp(36px,8vw,50px);"
			>
				<svg
					style="width:clamp(17px,4vw,22px);height:clamp(17px,4vw,22px);"
					viewBox="0 0 24 24"
					fill="none"
					stroke="oklch(var(--color-primary))"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
					<rect x="9" y="3" width="6" height="4" rx="2" />
					<path d="M9 12h6M9 16h4" />
				</svg>
			</div>
			<p
				class="font-body-light text-primary m-0 text-[clamp(0.5rem,1.1vw,0.62rem)] tracking-[0.14em] uppercase"
			>
				Découvrir
			</p>
			<p
				class="font-title text-base-content m-0 text-center text-[clamp(0.86rem,2.4vw,1.12rem)] leading-tight"
			>
				Mes Prestations
			</p>
		</a>

		<!-- RDV — CTA mis en valeur -->
		<a
			href="#rdv"
			id="rdv"
			class="border-primary/40 flex flex-col items-center
                  gap-[clamp(0.38rem,1vw,0.6rem)] rounded-[clamp(14px,3vw,20px)]
                  border
                  px-[clamp(0.6rem,2vw,1rem)] py-[clamp(0.9rem,3vw,1.5rem)]
                  no-underline backdrop-blur
                  transition-all hover:-translate-y-1 hover:shadow-lg"
			style="background:linear-gradient(145deg,oklch(from var(--color-secondary) l c h / 0.12),oklch(from var(--color-primary) l c h / 0.16));"
		>
			<div
				class="bg-primary/15 flex items-center justify-center rounded-full"
				style="width:clamp(36px,8vw,50px);height:clamp(36px,8vw,50px);"
			>
				<svg
					style="width:clamp(17px,4vw,22px);height:clamp(17px,4vw,22px);"
					viewBox="0 0 24 24"
					fill="none"
					stroke="oklch(var(--color-primary))"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="3" y="4" width="18" height="18" rx="2" />
					<path d="M16 2v4M8 2v4M3 10h18" />
					<circle cx="12" cy="16" r="2" fill="oklch(var(--color-primary))" opacity="0.5" />
				</svg>
			</div>
			<p
				class="font-body-light text-primary m-0 text-[clamp(0.5rem,1.1vw,0.62rem)] tracking-[0.14em] uppercase"
			>
				Disponibilités
			</p>
			<p
				class="font-title text-primary m-0 text-center text-[clamp(0.86rem,2.4vw,1.12rem)] leading-tight"
			>
				Prendre rendez-vous
			</p>
			<span
				class="badge badge-primary rounded-full px-3 text-[clamp(0.48rem,1.1vw,0.6rem)] tracking-[0.08em] uppercase"
				>Réserver →</span
			>
		</a>

		<!-- Contact -->
		<a
			href="#contact"
			id="contact"
			class="bg-base-100/70 border-base-300 flex flex-col
                  items-center gap-[clamp(0.38rem,1vw,0.6rem)] rounded-[clamp(14px,3vw,20px)]
                  border
                  px-[clamp(0.6rem,2vw,1rem)] py-[clamp(0.9rem,3vw,1.5rem)]
                  no-underline backdrop-blur
                  transition-all hover:-translate-y-1 hover:shadow-lg"
		>
			<div
				class="bg-accent/10 flex items-center justify-center rounded-full"
				style="width:clamp(36px,8vw,50px);height:clamp(36px,8vw,50px);"
			>
				<svg
					style="width:clamp(17px,4vw,22px);height:clamp(17px,4vw,22px);"
					viewBox="0 0 24 24"
					fill="none"
					stroke="oklch(var(--color-accent))"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
				</svg>
			</div>
			<p
				class="font-body-light text-primary m-0 text-[clamp(0.5rem,1.1vw,0.62rem)] tracking-[0.14em] uppercase"
			>
				Écrire
			</p>
			<p
				class="font-title text-base-content m-0 text-center text-[clamp(0.86rem,2.4vw,1.12rem)] leading-tight"
			>
				Me contacter
			</p>
		</a>

		<!-- Galerie -->
		<a
			href="#galerie"
			id="galerie"
			class="bg-base-100/70 border-base-300 flex flex-col
                  items-center gap-[clamp(0.38rem,1vw,0.6rem)] rounded-[clamp(14px,3vw,20px)]
                  border
                  px-[clamp(0.6rem,2vw,1rem)] py-[clamp(0.9rem,3vw,1.5rem)]
                  no-underline backdrop-blur
                  transition-all hover:-translate-y-1 hover:shadow-lg"
		>
			<div
				class="bg-secondary/10 flex items-center justify-center rounded-full"
				style="width:clamp(36px,8vw,50px);height:clamp(36px,8vw,50px);"
			>
				<svg
					style="width:clamp(17px,4vw,22px);height:clamp(17px,4vw,22px);"
					viewBox="0 0 24 24"
					fill="none"
					stroke="oklch(var(--color-secondary))"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="3" y="3" width="18" height="18" rx="2" />
					<circle cx="8.5" cy="8.5" r="1.5" />
					<path d="m21 15-5-5L5 21" />
				</svg>
			</div>
			<p
				class="font-body-light text-primary m-0 text-[clamp(0.5rem,1.1vw,0.62rem)] tracking-[0.14em] uppercase"
			>
				Inspirations
			</p>
			<p
				class="font-title text-base-content m-0 text-center text-[clamp(0.86rem,2.4vw,1.12rem)] leading-tight"
			>
				Galerie
			</p>
		</a>
	</div>
</main>

<!-- ===== FOOTER ===== -->
<footer class="py-[clamp(1rem,3vw,1.5rem)] text-center">
	<p
		class="font-body-light text-primary/40 text-[clamp(0.55rem,1.1vw,0.66rem)] tracking-[0.1em] uppercase"
	>
		© 2025 Iconic Regard — Tous droits réservés
	</p>
</footer>

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
