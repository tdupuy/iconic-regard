import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	// Supprimer le cookie de session
	cookies.delete('auth_session', { path: '/' });

	// Retourner une réponse vide, la redirection se fait côté client
	return new Response('OK');
};

