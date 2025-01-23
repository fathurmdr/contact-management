import { DynamicServerError } from "next/dist/client/components/hooks-server-context";
import { ZodError } from "zod";

export function handleError(
  errorLocation: string,
  error: unknown,
): {
  errorMsg: string;
  errors?: any;
} {
  if (error instanceof DynamicServerError) {
    console.info(`Error in ${errorLocation} =>`, error.message);
    return {
      errorMsg: error.message,
    };
  }

  if (error instanceof ActionError || error instanceof FetchError) {
    return {
      errorMsg: error.message,
    };
  }
  if (error instanceof ZodError) {
    return {
      errorMsg: "Input not valid!",
      errors: error.message,
    };
  }

  console.error(`Error in ${errorLocation} =>`, error);
  return {
    errorMsg: "Something went wrong!",
  };
}

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class FetchError extends Error {
  constructor(message: string) {
    super(message);
  }
}
