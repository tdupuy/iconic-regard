<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Icon as LucideIcon } from 'lucide-svelte';
	type AnchorRoute = `/#${string}`;

	let {
		href = '#' as AnchorRoute,
		id,
		label,
		title,
		highlighted = false,
		buttonText = '',
		Icon
	}: {
		href?: AnchorRoute;
		id: string;
		label: string;
		title: string;
		highlighted?: boolean;
		buttonText?: string;
		Icon?: typeof LucideIcon;
	} = $props();
</script>

<a
	href={resolve(href)}
	{id}
	class="bg-base-100/70 border-base-300 flex flex-col
                  items-center gap-[clamp(0.38rem,1vw,0.6rem)] rounded-[clamp(14px,3vw,20px)]
                  border
                  px-[clamp(0.6rem,2vw,1rem)] py-[clamp(0.9rem,3vw,1.5rem)]
                  no-underline backdrop-blur
                  transition-all hover:-translate-y-1 hover:shadow-lg"
	style={highlighted
		? 'background:linear-gradient(145deg,oklch(from var(--color-secondary) l c h / 0.12),oklch(from var(--color-primary) l c h / 0.16))'
		: undefined}
>
	<div
		class="bg-primary/10 flex h-[clamp(36px,8vw,50px)] w-[clamp(36px,8vw,50px)] items-center justify-center rounded-full"
	>
		{#if Icon}
			<Icon size={22} strokeWidth={1.5} color="#c9a0e8" />
		{/if}
	</div>
	{#if label}
		<p
			class="font-body-light text-primary m-0 text-[clamp(0.5rem,1.1vw,0.62rem)] tracking-[0.14em] uppercase"
		>
			{label}
		</p>
	{/if}
	<p class="font-title text-base-content m-0 text-center leading-tight">{title}</p>
	{#if buttonText}
		<span
			class="badge badge-primary rounded-full px-3 text-[clamp(0.48rem,1.1vw,0.6rem)] tracking-[0.08em] uppercase"
			>{buttonText}</span
		>
	{/if}
</a>
