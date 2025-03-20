import dayjs from '$lib/dayjs';
import Session from '../models/session';

export const getAuth: (sessionId?: string) => Promise<Auth | undefined> = async (
	sessionId?: string
) => {
	if (!sessionId) {
		return;
	}
	const session = await Session.query()
		.withGraphFetched('user')
		.where('id', sessionId)
		.where('expires_at', '>', dayjs().unix())
		.first();

	if (!session || !session.user) {
		return;
	}

	return {
		sessionId: session.id,
		expiresAt: session.expires_at,
		user: {
			id: session.user.id,
			name: session.user.name,
			email: session.user.email,
			phoneNumber: session.user.phone_number,
			bio: session.user.bio
		}
	};
};
