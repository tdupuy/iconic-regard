import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const uid1 = url.searchParams.get('uid1');
	const uid2 = url.searchParams.get('uid2');

	if ((uid1 && !uid2) || (!uid1 && uid2)) {
		const message = encodeURIComponent(
			"Impossible d'accéder à la page, sûrement une erreur de manipulation mais tu peux quand même venir m'en parler"
		);
		throw redirect(303, `/admin/customers?mergeError=${message}`);
	}

	return { uid1, uid2 };
};
