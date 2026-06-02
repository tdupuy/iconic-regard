import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// La protection se fait au niveau du layout
	return {};
};
