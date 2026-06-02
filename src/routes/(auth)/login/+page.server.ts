import { fail, redirect } from '@sveltejs/kit';
import { validateCredentials, createSessionCookie, generateSessionToken } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Si déjà authentifié, rediriger vers dashboard
	if (locals.authenticated) {
		redirect(303, '/admin');
	}
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;

		// Valider les identifiants
		if (!validateCredentials(username, password)) {
			return fail(401, {
				error: 'Identifiants invalides',
				username
			});
		}

		// Créer une session
		const sessionToken = generateSessionToken();
		const sessionCookie = createSessionCookie(sessionToken);

		// Définir le cookie
		cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.options);

		// Rediriger vers le dashboard
		redirect(303, '/admin');
	}
};
