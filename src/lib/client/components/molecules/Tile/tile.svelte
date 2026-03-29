<script lang="ts">
	import { resolve } from '$app/paths';

	type AnchorRoute = `/#${string}`;

	let {
		href = '#' as AnchorRoute,
		id,
		label,
		title,
		highlighted = false
	}: {
		href?: AnchorRoute;
		id: string;
		label: string;
		title: string;
		highlighted?: boolean;
	} = $props();
</script>

<a
	href={resolve(href)}
	id={id}
	class="bg-base-100/70 border-base-300 flex flex-col
                  items-center gap-[clamp(0.38rem,1vw,0.6rem)] rounded-[clamp(14px,3vw,20px)]
                  border
                  px-[clamp(0.6rem,2vw,1rem)] py-[clamp(0.9rem,3vw,1.5rem)]
                  no-underline backdrop-blur
                  transition-all hover:-translate-y-1 hover:shadow-lg"
	style={highlighted ? 'background:linear-gradient(145deg,oklch(from var(--color-secondary) l c h / 0.12),oklch(from var(--color-primary) l c h / 0.16))' : undefined}
>
	<div
		class="bg-primary/10 flex items-center justify-center rounded-full"
		style="width:clamp(36px,8vw,50px);height:clamp(36px,8vw,50px);"
	></div>
	{#if label}
		<p
			class="font-body-light text-primary m-0 text-[clamp(0.5rem,1.1vw,0.62rem)] tracking-[0.14em] uppercase"
		>
			{label}
		</p>
	{/if}
	<p class="font-title text-base-content m-0 text-center leading-tight">{title}</p>
</a>
