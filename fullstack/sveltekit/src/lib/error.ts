import { ZodError } from 'zod';

export function handleError(
	errorLocation: string,
	error: unknown
): {
	errorMsg: string;
	errors?: any;
} {
	if (error instanceof ActionError) {
		return {
			errorMsg: error.message
		};
	}
	if (error instanceof ZodError) {
		return {
			errorMsg: 'Input not valid!',
			errors: error.errors
		};
	}

	console.error(`Error in ${errorLocation} =>`, error);
	return {
		errorMsg: 'Something went wrong!'
	};
}

export class ActionError extends Error {
	constructor(message: string) {
		super(message);
	}
}
