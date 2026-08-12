<script lang="ts">
	import { ConfirmDialog } from '$lib/client/components/admin/atoms/ConfirmDialog';

	interface Props {
		customerId: string;
		visits: Date[];
	}

	let { customerId, visits = $bindable() }: Props = $props();

	let loading = $state(false);
	let confirmDialog: ReturnType<typeof ConfirmDialog>;
	const count = $derived(visits.length);

	async function addVisit() {
		if (loading || count >= 5) return;
		loading = true;

		const res = await fetch(`/api/loyalty/${customerId}`, { method: 'POST' });
		if (res.ok) {
			const data = await res.json();
			visits = data.visits.map((v: string) => new Date(v));
		}

		loading = false;
	}

	async function resetVisits() {
		loading = true;

		const res = await fetch(`/api/loyalty/${customerId}`, { method: 'DELETE' });
		if (res.ok) {
			visits = [];
		}

		loading = false;
	}
</script>

<p class="text-primary my-2 text-xs leading-4">
	{count} passages sur 5 avant récompense
</p>

<div class="flex flex-col items-start gap-1">
	<div class="flex gap-1">
		{#each [1, 2, 3, 4, 5] as star (star)}
			<div class="relative flex flex-col items-center">
				<button
					type="button"
					class={`transition-colors disabled:cursor-not-allowed ${
						count >= star ? 'text-warning' : 'text-base-content/20'
					}`}
					disabled={loading || count >= 5}
					onclick={addVisit}
					aria-label="Ajouter un passage"
				>
					<svg
						class="size-7"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linejoin="round"
					>
						<path
							d="M12 2.8l2.9 5.87 6.48.94-4.69 4.57 1.11 6.45L12 17.58l-5.8 3.05 1.11-6.45-4.69-4.57 6.48-.94L12 2.8z"
						/>
					</svg>
				</button>
			</div>
		{/each}
	</div>
	<!-- Progression -->
	<progress class="progress progress-primary mt-2 h-1 w-full" value={count} max="5"></progress>
</div>
{#if count >= 5}
	<span class="badge badge-success mt-6">Réduction débloquée 🎉</span>
	<button
		type="button"
		class="btn btn-xs btn-outline"
		disabled={loading}
		onclick={() => confirmDialog.open()}
	>
		Réinitialiser
	</button>
{/if}
<ConfirmDialog
	bind:this={confirmDialog}
	title="Réinitialiser la fidélité ?"
	message={`Cette action supprime définitivement l'historique des ${count} passage${count > 1 ? 's' : ''} de ce client. Impossible de revenir en arrière.`}
	confirmLabel="Réinitialiser"
	onConfirm={resetVisits}
/>
