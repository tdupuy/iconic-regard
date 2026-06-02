<script lang="ts">
	import { goto } from '$app/navigation';

	async function logout() {
		await fetch('/admin/logout', { method: 'POST' });
		goto('/admin/login');
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="flex justify-between items-center mb-12">
			<h1 class="text-4xl font-bold text-slate-900">Accueil</h1>
			<button
				onclick={logout}
				class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
			>
				Se déconnecter
			</button>
		</div>

		<div class="bg-white rounded-lg shadow p-8">
			<p class="text-slate-600 text-lg">Bienvenue dans votre espace d'administration</p>
		</div>
	</div>
</div>