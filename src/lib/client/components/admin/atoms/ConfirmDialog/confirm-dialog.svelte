<script lang="ts">
	let {
		title,
		message,
		confirmLabel = 'Confirmer',
		cancelLabel = 'Annuler',
		onConfirm
	}: {
		title: string;
		message: string;
		confirmLabel?: string;
		cancelLabel?: string;
		onConfirm: () => void;
	} = $props();

	let dialog: HTMLDialogElement;

	export function open() {
		dialog.showModal();
	}

	function close() {
		dialog.close();
	}

	function confirm() {
		close();
		onConfirm();
	}
</script>

<dialog bind:this={dialog} class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">{title}</h3>
		<p class="py-4">{message}</p>
		<div class="modal-action">
			<button type="button" class="btn" onclick={close}>{cancelLabel}</button>
			<button type="button" class="btn btn-error" onclick={confirm}>{confirmLabel}</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
