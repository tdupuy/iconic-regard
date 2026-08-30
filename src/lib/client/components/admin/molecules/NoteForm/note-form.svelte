<script lang="ts">
	import { formatDateTime } from '$lib/utils';
	import { UserPlus, UserPen, NotebookPen } from '@lucide/svelte';
	import { ReadonlyFormField } from '$lib/client/components/admin/atoms/FormFields';

	const customerName = 'Jean Dupont';
	const createdAt = new Date('2024-11-03T10:15:00');
	const updatedAt = new Date('2025-01-20T16:42:00');

	let notes = $state('');
</script>

<div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="mb-6 flex flex-col gap-1">
		<h1 class="text-3xl font-bold text-slate-900">Notes - {customerName}</h1>
	</div>

	<form class="card w-full">
		<div class="card-body w-full gap-3 rounded-xl border border-gray-400 bg-white p-4">
			<div class="flex justify-between">
				<ReadonlyFormField
					label="Créé le :"
					icon={UserPlus}
					value={formatDateTime(createdAt)}
					extraClasses="flex items-center gap-1 text-[11px] opacity-50"
				/>
				<ReadonlyFormField
					label="Edité le :"
					icon={UserPen}
					value={formatDateTime(updatedAt)}
					extraClasses="flex items-center gap-1 text-[11px] opacity-50"
				/>
			</div>

			<div class="flex flex-col gap-1">
				<label
					for="notes"
					class="text-base-content flex items-center gap-1 text-sm leading-4 font-normal"
				>
					<NotebookPen class="text-primary h-3 w-3 shrink-0" />
					<span>Notes</span>
				</label>
				<textarea
					id="notes"
					name="notes"
					bind:value={notes}
					rows="8"
					class="textarea textarea-bordered w-full"
					placeholder="Écrire une note sur ce client..."
				></textarea>
			</div>
		</div>

		<button type="submit" class="btn btn-primary mt-5 w-full">Enregistrer</button>
	</form>
</div>
