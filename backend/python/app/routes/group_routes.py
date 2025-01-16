from flask import Blueprint, request, g

from app.schemas.group_schemas import GroupSchema, GroupMemberSchema
from app.services import group_services
from app.middlewares import auth_middleware


group_routes = Blueprint("group_routes", __name__, url_prefix="/group")


@group_routes.get(
    "/",
)
@auth_middleware
def get_groups():
    user = g.user

    result = group_services.get_groups(user)

    return {
        "message": "Groups fetched successfully",
        "data": result,
    }, 200


@group_routes.get(
    "/<int:id>",
)
@auth_middleware
def get_group(id: int):
    user = g.user

    result = group_services.get_group(user, id)

    return {
        "message": "Group fetched successfully",
        "data": result,
    }, 200


@group_routes.post(
    "/",
)
@auth_middleware
def add_group():
    user = g.user
    data = GroupSchema(**request.json)

    group_services.add_group(user, data)

    return {
        "message": "Group added successfully",
    }, 201


@group_routes.put(
    "/<int:id>",
)
@auth_middleware
def update_group(id):
    user = g.user
    data = GroupSchema(**request.json)

    group_services.update_group(user, id, data)

    return {
        "message": "Group updated successfully",
    }, 200


@group_routes.delete(
    "/<int:id>",
)
@auth_middleware
def delete_group(id):
    user = g.user

    group_services.delete_group(user, id)

    return {
        "message": "Group deleted successfully",
    }, 200


@group_routes.post(
    "/<int:id>/member",
)
@auth_middleware
def add_group_member(id):
    user = g.user
    data = GroupMemberSchema(**request.json)

    group_services.add_group_member(user, id, data)

    return {
        "message": "Group member added successfully",
    }, 201


@group_routes.delete(
    "/<int:id>/member",
)
@auth_middleware
def delete_group_member(id):
    user = g.user
    data = GroupMemberSchema(**request.json)

    group_services.delete_group_member(user, id, data)

    return {
        "message": "Group member deleted successfully",
    }, 200
