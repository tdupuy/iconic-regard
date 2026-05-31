import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Vérifier si l'utilisateur a un cookie de session valide
	const sessionToken = event.cookies.get('auth_session');
	
	if (sessionToken) {
		// Marquer l'utilisateur comme authentifié
		event.locals.authenticated = true;
	} else {
		event.locals.authenticated = false;
	}

	return resolve(event);
};
