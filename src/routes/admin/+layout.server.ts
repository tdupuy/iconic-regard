import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// Si pas authentifié, rediriger vers login
	if (!locals.authenticated && url.pathname !== '/login') {
		redirect(303, '/login');
	}

	return {
		authenticated: locals.authenticated
	};
};
