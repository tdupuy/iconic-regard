<script lang="ts">
	interface Props {
		visits: Date[]; // une entrée par passage, vient de la BDD
	}

	let { visits }: Props = $props();

	const count = $derived(visits.length);
	const isComplete = $derived(count >= 5);
</script>

<div class="flex flex-col items-start gap-1">
	<div class="flex gap-1">
		{#each [1, 2, 3, 4, 5] as star (star)}
			<div class="flex flex-col items-center">
				<span
					class="text-4xl transition-colors"
					class:text-yellow-400={count >= star}
					class:text-gray-300={count < star}
				>
					★
				</span>
				{#if visits[star - 1]}
					<span class="text-base-content/50 text-[10px]">
						{visits[star - 1].toLocaleDateString('fr-FR')}
					</span>
				{/if}
			</div>
		{/each}
	</div>

	{#if isComplete}
		<span class="badge badge-success">Réduction débloquée 🎉</span>
	{:else}
		<span class="text-base-content/60 text-xs">
			Plus que {5 - count} pour ta réduc'
		</span>
	{/if}
</div>
