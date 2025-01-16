from flask import Blueprint, request, g
from app.schemas.contact_schemas import ContactSchema
from app.services import contact_services
from app.middlewares import auth_middleware


contact_routes = Blueprint("contact_routes", __name__, url_prefix="/contact")


@contact_routes.get(
    "/",
)
@auth_middleware
def get_contacts():
    user = g.user

    result = contact_services.get_contacts(user)

    return {
        "message": "Contacts fetched successfully",
        "data": result,
    }, 200


@contact_routes.get(
    "/<int:id>",
)
@auth_middleware
def get_contact(id: int):
    user = g.user

    result = contact_services.get_contact(user, id)

    return {
        "message": "Contact fetched successfully",
        "data": result,
    }, 200


@contact_routes.post(
    "/",
)
@auth_middleware
def add_contact():
    user = g.user
    data = ContactSchema(**request.json)

    contact_services.add_contact(user, data)

    return {
        "message": "Contact added successfully",
    }, 201


@contact_routes.put(
    "/<int:id>",
)
@auth_middleware
def update_contact(id):
    user = g.user
    data = ContactSchema(**request.json)

    contact_services.update_contact(user, id, data)

    return {
        "message": "Contact updated successfully",
    }, 200


@contact_routes.delete(
    "/<int:id>",
)
@auth_middleware
def delete_contact(id):
    user = g.user

    contact_services.delete_contact(user, id)

    return {
        "message": "Contact deleted successfully",
    }, 200
