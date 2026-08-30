<script lang="ts">
	import { NoteForm } from '$lib/client/components/admin/molecules/NoteForm';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<NoteForm
	customerName={data.customerName}
	createdAt={data.note?.createdAt ?? new Date()}
	updatedAt={data.note?.updatedAt ?? new Date()}
	notes={data.note?.note ?? ''}
/>
