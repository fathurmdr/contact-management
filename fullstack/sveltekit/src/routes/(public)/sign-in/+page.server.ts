import dayjs from '$lib/dayjs';
import { ActionError, handleError } from '$lib/error';
import { signInSchema } from '$lib/schemas/auth.schema';
import Session from '$lib/server/models/session';
import User from '$lib/server/models/user';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const actions = {
	default: async ({ request, cookies }) => {
		try {
			const data = await request.formData();

			const payload = Object.fromEntries(data);

			const signInDto = signInSchema.parse(payload);
			const user = await User.query().where('email', signInDto.email).first();

			if (!user) {
				throw new ActionError('Email or password is incorrect');
			}

			const isPasswordValid = await bcrypt.compare(signInDto.password, user.password);

			if (!isPasswordValid) {
				throw new ActionError('Email or password is incorrect');
			}

			const session = await Session.query().insert({
				user_id: user.id,
				expires_at: dayjs().add(1, 'day').unix()
			});

			cookies.set('sessionId', session.id, {
				httpOnly: true,
				path: '/',
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				expires: dayjs.unix(session.expires_at).toDate()
			});
		} catch (error) {
			return fail(400, handleError('signIn', error));
		}

		redirect(303, '/contacts');
	}
} satisfies Actions;
