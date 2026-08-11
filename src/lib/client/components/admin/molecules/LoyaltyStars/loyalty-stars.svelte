<script lang="ts">
	interface Props {
		customerId: string;
		visits: Date[]; // vient du load (devalue), donc déjà de vraies Date
	}

	let { customerId, visits = $bindable() }: Props = $props();

	let loading = $state(false);
	const count = $derived(visits.length);

	async function addVisit() {
		if (loading || count >= 5) return;
		loading = true;

		const res = await fetch(`/api/loyalty/${customerId}`, { method: 'POST' });
		if (res.ok) {
			const data = await res.json();
			visits = data.visits.map((v: string) => new Date(v)); // ici on reconvertit, car json() renvoie des strings
		}

		loading = false;
	}
</script>

<div class="flex flex-col items-start gap-1">
	<div class="flex gap-1">
		{#each [1, 2, 3, 4, 5] as star (star)}
			<div class="relative flex flex-col items-center">
				{#if visits[star - 1]}
					<span
						class="text-base-content/50 absolute left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap"
						class:-top-4={star % 2 === 0}
						class:-bottom-4={star % 2 !== 0}
					>
						{visits[star - 1].toLocaleDateString('fr-FR')}
					</span>
				{/if}

				<button
					type="button"
					class="text-4xl transition-colors disabled:cursor-not-allowed"
					class:text-yellow-400={count >= star}
					class:text-gray-300={count < star}
					disabled={loading || count >= 5}
					onclick={addVisit}
					aria-label="Ajouter un passage"
				>
					★
				</button>
			</div>
		{/each}
	</div>

	{#if count >= 5}
		<span class="badge badge-success mt-6">Réduction débloquée 🎉</span>
	{/if}
</div>
