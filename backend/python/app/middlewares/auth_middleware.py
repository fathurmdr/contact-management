from flask import g
from functools import wraps
from app.utils.response_error import AuthorizationError


def auth_middleware(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            if hasattr(g, "user") != True:
                raise AuthorizationError()
        except Exception as e:
            raise e

        return func(*args, **kwargs)

    return wrapper
