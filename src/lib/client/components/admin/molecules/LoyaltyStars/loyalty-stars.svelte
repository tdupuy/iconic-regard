<script lang="ts">
	interface Props {
		rating?: number;
		ratedAt?: Date | null;
		onRate?: (rating: number, ratedAt: Date) => void;
	}

	let { rating = 0, ratedAt = null, onRate }: Props = $props();

	let hovered = $state<number | null>(null);

	function handleClick(value: number) {
		rating = value;
		ratedAt = new Date();
		onRate?.(rating, ratedAt);
	}
</script>

<div class="flex flex-col gap-1">
	<div class="flex gap-1">
		{#each [1, 2, 3, 4, 5] as star (star)}
			<button
				type="button"
				class="text-2xl transition-colors"
				class:text-yellow-400={(hovered ?? rating) >= star}
				class:text-gray-300={(hovered ?? rating) < star}
				onmouseenter={() => (hovered = star)}
				onmouseleave={() => (hovered = null)}
				onclick={() => handleClick(star)}
				aria-label={`Noter ${star} étoile${star > 1 ? 's' : ''}`}
			>
				★
			</button>
		{/each}
	</div>

	{#if ratedAt}
		<span class="text-base-content/60 text-xs">
			Noté le {ratedAt.toLocaleDateString('fr-FR')}
		</span>
	{/if}
</div>
