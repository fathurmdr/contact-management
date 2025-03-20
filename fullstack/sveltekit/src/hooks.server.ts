import { getAuth } from '$lib/server/utils/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('sessionId');

	const auth = await getAuth(sessionId);

	event.locals.auth = auth;

	return await resolve(event);
};
