<script lang="ts">
	import type { Icon as IconType } from '@lucide/svelte';

	let {
		label,
		icon: Icon,
		value = $bindable(),
		extraClasses = ''
	}: {
		label: string;
		icon?: typeof IconType;
		value: string;
		extraClasses?: string;
	} = $props();
</script>

<div class="flex flex-col gap-1">
	<label class="flex items-center gap-1 text-[11px] opacity-50">
		{#if Icon}<Icon class="h-3 w-3 shrink-0" />{/if}
		{label}
	</label>
	<div class={`align-items-center flex ${extraClasses}`}>
		<span class="truncate">{value}</span>
	</div>
</div>
