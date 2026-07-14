<script lang="ts">
	import { goto } from '$app/navigation';
	async function logout() {
		await fetch('/logout', { method: 'POST' });
		goto('/login');
	}
</script>

<div class="drawer-side is-drawer-close:overflow-visible">
	<label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
	<div
		class="is-drawer-close:w-14 is-drawer-open:w-64 flex min-h-full flex-col items-start bg-black"
	>
		<!-- Sidebar content here -->
		<ul class="menu w-full grow">
			<!-- List item -->
			<li>
				<a
					href="/admin"
					class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
					data-tip="Homepage"
				>
					<!-- Home icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke-linejoin="round"
						stroke-linecap="round"
						stroke-width="2"
						fill="none"
						stroke="white"
						class="my-1.5 inline-block size-6"
						><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path
							d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
						></path></svg
					>
					<span class="is-drawer-close:hidden text-lg text-white">Accueil</span>
				</a>
			</li>

			<!-- List item -->
			<li>
				<a
					href="/admin/customers"
					class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
					data-tip="Clients"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke-linejoin="round"
						stroke-linecap="round"
						stroke-width="2"
						fill="none"
						stroke="white"
						class="my-1.5 inline-block size-6"
						><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"
						></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path
							d="M16 3.13a4 4 0 0 1 0 7.75"
						></path></svg
					>
					<span class="is-drawer-close:hidden text-lg text-white">Clients</span>
				</a>
			</li>
			<!-- List item -->
			<li>
				<a
					href="/admin/services"
					class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
					data-tip="Prestations"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke-linejoin="round"
						stroke-linecap="round"
						stroke-width="2"
						fill="none"
						stroke="white"
						class="my-1.5 inline-block size-6"
						><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path
							d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
						></path><path d="M9 12h6"></path><path d="M9 16h6"></path><path d="M9 8h6"></path></svg
					>
					<span class="is-drawer-close:hidden text-lg text-white">Prestations</span>
				</a>
			</li>
			<li class="mt-auto">
				<button
					onclick={logout}
					class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
					data-tip="Déconnexion"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke-linejoin="round"
						stroke-linecap="round"
						stroke-width="2"
						fill="none"
						stroke="white"
						class="my-1.5 inline-block size-6"
						><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline
							points="16 17 21 12 16 7"
						></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg
					>
					<span class="is-drawer-close:hidden text-lg text-white">Déconnexion</span>
				</button>
			</li>
		</ul>
	</div>
</div>
