import { ActionError, handleError } from '$lib/error';
import { signUpSchema } from '$lib/schemas/auth.schema';
import User from '$lib/server/models/user';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const actions = {
	default: async ({ request }) => {
		try {
			const data = await request.formData();

			const payload = Object.fromEntries(data);

			const signUpDto = signUpSchema.parse(payload);
			await User.transaction(async (trx) => {
				const existingUser = await User.query(trx)
					.where('email', signUpDto.email)
					.orWhere('phone_number', signUpDto.phoneNumber)
					.first()
					.forUpdate();

				if (existingUser) {
					throw new ActionError('Email or phone number already used');
				}

				const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

				await User.query(trx).insert({
					name: signUpDto.name,
					email: signUpDto.email,
					phone_number: signUpDto.phoneNumber,
					password: hashedPassword,
					bio: signUpDto.bio
				});
			});
		} catch (error) {
			return fail(400, handleError('signUp', error));
		}

		redirect(303, '/sign-in');
	}
} satisfies Actions;
