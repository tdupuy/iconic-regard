<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { goto } from '$app/navigation';
	import { ConfirmDialog } from '$lib/client/components/admin/atoms/ConfirmDialog';

	let {
		customerId,
		action = '?/softDeleteCustomer',
		redirectTo = '/admin/customers',
		onCancelled
	}: {
		customerId: string;
		action?: string;
		redirectTo?: string;
		onCancelled?: (message: string) => void;
	} = $props();

	let cancelling = $state(false);
	let deleted = $state(false);
	let errorMessage = $state<string | null>(null);
	let form: HTMLFormElement;
	let confirmDialog: ReturnType<typeof ConfirmDialog>;

	function requestConfirmation(event: Event) {
		event.preventDefault();
		confirmDialog.open();
	}

	function submitForm() {
		form.requestSubmit();
	}
</script>

<form
	bind:this={form}
	method="POST"
	{action}
	use:enhance={() => {
		cancelling = true;
		errorMessage = null;
		return async ({ result, update }) => {
			cancelling = false;

			if (result.type === 'redirect') {
				await applyAction(result);
				return;
			}

			if (result.type === 'success') {
				deleted = true;
				onCancelled?.('Client supprimé.');
				await update({ reset: false });
				setTimeout(() => goto(redirectTo), 5000);
			} else if (result.type === 'failure' && result.data) {
				errorMessage =
					typeof result.data.message === 'string'
						? result.data.message
						: 'Une erreur est survenue.';
				onCancelled?.(errorMessage);
			} else {
				errorMessage = 'Une erreur est survenue.';
				onCancelled?.(errorMessage);
			}
		};
	}}
>
	<input type="hidden" name="id" value={customerId} />

	{#if deleted}
		<div role="alert" class="alert alert-success">
			<span>Client supprimé. Redirection vers la liste des clients...</span>
		</div>
	{:else}
		{#if errorMessage}
			<div role="alert" class="alert alert-error mb-2">
				<span>{errorMessage}</span>
			</div>
		{/if}
		<button
			type="submit"
			class="btn btn-error w-full"
			disabled={cancelling}
			onclick={requestConfirmation}
		>
			{cancelling ? 'Suppression ...' : 'Supprimer le client'}
		</button>
	{/if}
</form>

<ConfirmDialog
	bind:this={confirmDialog}
	title="Confirmer la suppression"
	message="Attention, tu vas supprimer le client. C'est réversible, mais cela te coûtera certainement très cher."
	onConfirm={submitForm}
/>
