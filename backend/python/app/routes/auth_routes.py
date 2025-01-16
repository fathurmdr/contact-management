from flask import Blueprint, request
from app.schemas.auth_schemas import RegisterSchema, LoginSchema
from app.services import auth_services

auth_routes = Blueprint("auth_routes", __name__, url_prefix="/auth")


@auth_routes.post(
    "/register",
)
def register():
    data = RegisterSchema(**request.json)

    auth_services.register(data)

    return {"message": "User registered successfully"}, 201


@auth_routes.post(
    "/login",
)
def login():
    data = LoginSchema(**request.json)

    result = auth_services.login(data)

    return {"message": "User logged in successfully", "data": result}, 200
