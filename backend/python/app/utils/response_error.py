class ResponseError(Exception):
    """
    Base class for custom response errors.
    """

    def __init__(self, status: int, message: str, errors: any = None):
        super().__init__(message)
        self.status = status
        self.errors = errors


class AuthorizationError(ResponseError):
    """
    Raised when a user is not authorized.
    """

    def __init__(self, message: str = "Not Authorized!", errors: any = None):
        super().__init__(401, message, errors)


class ForbiddenError(ResponseError):
    """
    Raised when a user tries to access a forbidden resource.
    """

    def __init__(self, message: str = "Forbidden!", errors: any = None):
        super().__init__(403, message, errors)


class NotFoundError(ResponseError):
    """
    Raised when a requested resource is not found.
    """

    def __init__(self, message: str = "Not Found!", errors: any = None):
        super().__init__(404, message, errors)


class ValidationError(ResponseError):
    """
    Raised when request validation fails.
    """

    def __init__(self, message: str = "Request Not Valid!", errors: any = None):
        super().__init__(400, message, errors)


class ApplicationError(ResponseError):
    """
    Raised for generic application errors.
    """

    def __init__(
        self,
        message: str = "Something went wrong. Check logs for detail errors!",
        errors: any = None,
    ):
        super().__init__(500, message, errors)
