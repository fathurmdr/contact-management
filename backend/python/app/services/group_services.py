from app.extensions import db
from app.models import Group, Contact
from app.utils.response_error import NotFoundError, ValidationError


def get_groups(user):
    groups = Group.query.filter_by(user_id=user["id"]).all()

    groups_data = [
        {
            "id": group.id,
            "name": group.name,
            "description": group.description,
            "members": [
                {
                    "fullName": contact.full_name,
                    "nickName": contact.nick_name,
                    "phoneNumber": contact.phone_number,
                    "email": contact.email,
                    "addresses": [
                        {
                            "street": address.street,
                            "city": address.city,
                            "district": address.district,
                            "subDistrict": address.sub_district,
                            "postalCode": address.postal_code,
                        }
                        for address in contact.addresses
                    ],
                }
                for contact in group.members
            ],
        }
        for group in groups
    ]

    return groups_data


def get_group(user, group_id):
    group = Group.query.filter_by(id=group_id, user_id=user["id"]).first()

    if not group:
        raise NotFoundError("Group not found")

    group_data = {
        "id": group.id,
        "name": group.name,
        "description": group.description,
        "members": [
            {
                "fullName": contact.full_name,
                "nickName": contact.nick_name,
                "phoneNumber": contact.phone_number,
                "email": contact.email,
                "addresses": [
                    {
                        "street": address.street,
                        "city": address.city,
                        "district": address.district,
                        "subDistrict": address.sub_district,
                        "postalCode": address.postal_code,
                    }
                    for address in contact.addresses
                ],
            }
            for contact in group.members
        ],
    }

    return group_data


def add_group(user, group_data):
    group = Group(
        user_id=user["id"],
        name=group_data.name,
        description=group_data.description,
    )

    db.session.add(group)
    db.session.commit()


def update_group(user, group_id, group_data):
    group = Group.query.filter_by(id=group_id, user_id=user["id"]).first()

    if not group:
        raise NotFoundError("Group not found")

    group.name = group_data.name
    group.description = group_data.description

    db.session.commit()


def delete_group(user, group_id):
    group = Group.query.filter_by(id=group_id, user_id=user["id"]).first()

    if not group:
        raise NotFoundError("Group not found")

    db.session.delete(group)
    db.session.commit()


def add_group_member(user, group_id, group_member_data):
    group = Group.query.filter(
        Group.user_id == user["id"], Group.id == group_id
    ).first()

    if not group:
        raise NotFoundError("Group not found")

    if any(member.id == group_member_data.contactId for member in group.members):
        raise ValidationError("Group member already exists")

    # Cari kontak berdasarkan user_id dan contact_id
    contact = Contact.query.filter(
        Contact.user_id == user["id"], Contact.id == group_member_data.contactId
    ).first()

    if not contact:
        raise ValidationError("Contact not found")

    # Tambahkan anggota ke grup
    group.members.append(contact)
    db.session.commit()

    return {"message": "Group member added successfully"}


def delete_group_member(user, group_id, group_member_data):
    group = Group.query.filter_by(id=group_id, user_id=user["id"]).first()

    if not group:
        raise NotFoundError("Group not found")

    contact = (
        Contact.query.filter(Contact.id == group_member_data.contactId)
        .join(Group.members)
        .filter(Group.id == group_id)
        .first()
    )

    if contact:
        group.members.remove(contact)

    db.session.commit()
