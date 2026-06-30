<script lang="ts">
	import { isPlaceholderEmail } from '$lib/utils';

	let {
		email,
		phoneNumber,
		name
	}: { email: string | undefined; phoneNumber: string; name: string } = $props();
</script>

<div class="card bg-base-100 shadow-sm">
	<div class="card-body">
		<h2 class="card-title text-2xl">{name}</h2>

		<div class="mt-2 flex flex-col gap-1 text-sm text-slate-600">
			<div class="flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 shrink-0"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
					/>
				</svg>
				{#if isPlaceholderEmail(email)}
					<span class="text-slate-400 italic">Non renseigné</span>
				{:else}
					<span>{email}</span>
				{/if}
			</div>
			<div class="flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 shrink-0"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
					/>
				</svg>
				<span>{phoneNumber}</span>
			</div>
		</div>
		<div class="card-actions mt-4 justify-end gap-1">
			<button class="btn btn-success btn-sm">Ajouter</button>
			<button class="btn btn-warning btn-sm">Fusionner</button>
			<button class="btn btn-error btn-sm">Annuler</button>
		</div>
	</div>
</div>
