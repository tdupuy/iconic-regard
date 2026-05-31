<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let username = $state('');
	let password = $state('');
	let isLoading = $state(false);
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
	<div class="w-full max-w-md">
		<!-- Card -->
		<div class="bg-white rounded-lg shadow-2xl p-8">
			<!-- Header -->
			<div class="text-center mb-8">
				<h1 class="text-3xl font-bold text-slate-900">Admin</h1>
				<p class="text-slate-600 mt-2">Accès restreint</p>
			</div>

			<!-- Form -->
			<form
				method="POST"
				action="?/login"
				use:enhance={() => {
					isLoading = true;
					return async ({ update }) => {
						isLoading = false;
						update();
					};
				}}
				class="space-y-6"
			>
				<!-- Error Message -->
				{#if form?.error}
					<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
						{form.error}
					</div>
				{/if}

				<!-- Username Field -->
				<div>
					<label for="username" class="block text-sm font-medium text-slate-700">
						Identifiant
					</label>
					<input
						type="text"
						id="username"
						name="username"
						bind:value={username}
						required
						class="mt-2 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="Entrez votre identifiant"
						disabled={isLoading}
					/>
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="block text-sm font-medium text-slate-700">
						Mot de passe
					</label>
					<input
						type="password"
						id="password"
						name="password"
						bind:value={password}
						required
						class="mt-2 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="Entrez votre mot de passe"
						disabled={isLoading}
					/>
				</div>

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={isLoading}
					class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
				>
					{#if isLoading}
						<span class="inline-flex items-center">
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Connexion...
						</span>
					{:else}
						Se connecter
					{/if}
				</button>
			</form>

			<!-- Footer -->
			<p class="text-center text-slate-500 text-xs mt-6">
				Les identifiants sont configurés dans les variables d'environnement
			</p>
		</div>
	</div>
</div>
