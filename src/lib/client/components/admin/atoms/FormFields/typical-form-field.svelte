<script lang="ts">
	import type { Icon as IconType } from '@lucide/svelte';

	let {
		id,
		label,
		icon: Icon,
		value = $bindable(),
		type = 'text',
		required = false
	}: {
		id: string;
		label: string;
		icon?: typeof IconType;
		value: string;
		type?: string;
		required?: boolean;
	} = $props();
</script>

<div class="flex flex-col gap-1">
	<label for={id} class="flex items-center gap-1 text-[11px] opacity-50">
		{#if Icon}<Icon class="h-3 w-3 shrink-0" />{/if}
		{label}
	</label>
	<input {id} name={id} {type} bind:value {required} class="input input-bordered w-full" />
</div>
