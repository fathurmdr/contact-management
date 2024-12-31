export class ResponseError extends Error {
  status: number;
  errors: any;

  constructor(status: number, message: string, errors?: any) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export class AuthorizationError extends ResponseError {
  constructor(message: string = "Not Authorized!", errors?: any) {
    super(401, message, errors);
  }
}

export class ForbiddenError extends ResponseError {
  constructor(message: string = "Forbidden!", errors?: any) {
    super(403, message, errors);
  }
}

export class NotFoundError extends ResponseError {
  constructor(message: string = "Not Found!", errors?: any) {
    super(404, message, errors);
  }
}

export class ValidationError extends ResponseError {
  constructor(message: string = "Request Not Valid!", errors?: any) {
    super(400, message, errors);
  }
}

export class ApplicationError extends ResponseError {
  constructor(
    message: string = "Something went wrong. Check logs for detail errors!",
    errors?: any,
  ) {
    super(500, message, errors);
  }
}
