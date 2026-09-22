<script lang="ts">
	import { ConfirmDialog } from '$lib/client/components/admin/atoms/ConfirmDialog';
	import type { GoogleCalendarEvent } from '$lib/server/google-calendar';
	import { enhance } from '$app/forms';

	let {
		event
	}: {
		event: GoogleCalendarEvent | null;
	} = $props();

	let dialog: HTMLDialogElement;
	let confirmDialog: ReturnType<typeof ConfirmDialog>;
	let form: HTMLFormElement;

	const dateFmt = new Intl.DateTimeFormat('fr-FR', {
		weekday: 'long',
		day: 'numeric',
		month: 'long'
	});
	const timeFmt = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' });

	export function open() {
		dialog.showModal();
	}
</script>

<dialog bind:this={dialog} class="modal modal-bottom sm:modal-middle">
	{#if event}
		{@const start = event.start.dateTime}
		{@const end = event.end.dateTime}
		<div class="modal-box">
			<h3 class="text-lg font-bold">{event.summary}</h3>
			<dl class="space-y-2 py-4">
				<div>
					<dt class="text-sm opacity-60">Date et heure</dt>
					<dd class="capitalize">
						{#if start && end}
							{dateFmt.format(new Date(start))}, {timeFmt.format(new Date(start))} - {timeFmt.format(
								new Date(end)
							)}
						{:else}
							Journée entière
						{/if}
					</dd>
				</div>
				<div>
					<dt class="text-sm opacity-60">Réservation en ligne</dt>
					<dd>{event.calBookingUid ? 'Oui' : 'Non'}</dd>
				</div>
			</dl>
			<div class="modal-action">
				<button type="button" class="btn" onclick={() => dialog.close()}>Fermer</button>
				<button type="button" class="btn btn-error" onclick={() => confirmDialog.open()}>
					Supprimer
				</button>
			</div>
		</div>
	{/if}
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

{#if event}
	<form
		bind:this={form}
		method="POST"
		action="?/cancel"
		hidden
		use:enhance={() =>
			async ({ update }) => {
				dialog.close();
				await update();
			}}
	>
		<input type="hidden" name="id" value={event.id} />
		<input type="hidden" name="calBookingUid" value={event.calBookingUid ?? ''} />
	</form>
	<ConfirmDialog
		bind:this={confirmDialog}
		title="Supprimer le rendez-vous ?"
		message={`« ${event.summary ?? 'Sans titre'} » sera supprimé.`}
		confirmLabel="Confirmer la suppression"
		onConfirm={() => form.requestSubmit()}
	/>
{/if}
