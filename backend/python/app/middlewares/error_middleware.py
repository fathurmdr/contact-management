from flask import jsonify, Flask
from werkzeug.exceptions import HTTPException
from app.utils.response_error import ResponseError
from pydantic import ValidationError


def error_middleware(app: Flask):
    @app.errorhandler(Exception)
    def handle_exception(error):
        app.logger.error(error)

        if isinstance(error, ValidationError):
            return (
                jsonify(
                    {
                        "errorMsg": "Request Not Valid!",
                        "errors": error.errors(),
                    }
                ),
                400,
            )

        if isinstance(error, ResponseError):
            if error.errors:
                return (
                    jsonify(
                        {
                            "errorMsg": error.args[0],
                            "errors": error.errors,
                        }
                    ),
                    error.status,
                )

            return (
                jsonify(
                    {
                        "errorMsg": error.args[0],
                    }
                ),
                error.status,
            )

        if isinstance(error, HTTPException):
            return (
                jsonify(
                    {
                        "errorMsg": error.description,
                    }
                ),
                error.code,
            )

        return (
            jsonify(
                {
                    "errorMsg": "Something went wrong. Check logs for detail errors!",
                }
            ),
            500,
        )
