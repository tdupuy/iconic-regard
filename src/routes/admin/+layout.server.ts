import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// Si pas authentifié, rediriger vers login
	if (!locals.authenticated && url.pathname !== '/admin/login') {
		redirect(303, '/admin/login');
	}

	return {
		authenticated: locals.authenticated
	};
};
