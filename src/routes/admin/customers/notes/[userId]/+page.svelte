<script lang="ts">
	import { NoteForm } from '$lib/client/components/admin/molecules/NoteForm';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<NoteForm
	customerName={data.notes[0]?.name}
	createdAt={data.notes[0]?.createdAt ?? new Date()}
	updatedAt={data.notes[0]?.updatedAt ?? new Date()}
	notes={data.notes[0]?.note ?? ''}
/>
