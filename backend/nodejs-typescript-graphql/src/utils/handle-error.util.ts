import { GraphQLError } from "graphql";
import { ZodError } from "zod";
import logger from "@/libs/logger";

export function handleGraphQLError(error: unknown) {
  if (error instanceof CustomGraphQLError) {
    throw error;
  }

  if (error instanceof ZodError) {
    throw new ValidationError("Request Not Valid!", error.issues);
  }

  logger.error({
    type: "graphql",
    error: error,
  });

  throw new ApplicationError();
}

export class CustomGraphQLError extends GraphQLError {
  constructor(code: string, message: string, errors?: any) {
    super(message, {
      extensions: {
        code,
        errors,
      },
    });
  }
}

export class AuthorizationError extends CustomGraphQLError {
  constructor(message: string = "Not Authorized!", errors?: any) {
    super("UNAUTHENTICATED", message, errors);
  }
}

export class ForbiddenError extends CustomGraphQLError {
  constructor(message: string = "Forbidden!", errors?: any) {
    super("FORBIDDEN", message, errors);
  }
}

export class ValidationError extends CustomGraphQLError {
  constructor(message: string = "Request Not Valid!", errors?: any) {
    super("BAD_USER_INPUT", message, errors);
  }
}

export class ApplicationError extends CustomGraphQLError {
  constructor(
    message: string = "Something went wrong. Check logs for detail errors!",
    errors?: any,
  ) {
    super("INTERNAL_SERVER_ERROR", message, errors);
  }
}
