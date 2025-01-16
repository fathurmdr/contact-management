from app.extensions import db
from app.models import Contact, Address
from app.utils.response_error import NotFoundError


def get_contacts(user):
    contacts = Contact.query.filter_by(user_id=user["id"]).all()

    contacts_data = [
        {
            "id": contact.id,
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
        for contact in contacts
    ]

    return contacts_data


def get_contact(user, contact_id):
    contact = Contact.query.filter_by(id=contact_id, user_id=user["id"]).first()

    if not contact:
        raise NotFoundError("Contact not found")

    contact_data = {
        "id": contact.id,
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

    return contact_data


def add_contact(user, contact_data):
    contact = Contact(
        user_id=user["id"],
        full_name=contact_data.fullName,
        nick_name=contact_data.nickName,
        phone_number=contact_data.phoneNumber,
        email=contact_data.email,
        addresses=[
            Address(
                street=address.street,
                city=address.city,
                district=address.district,
                sub_district=address.subDistrict,
                postal_code=address.postalCode,
            )
            for address in contact_data.addresses
        ],
    )
    db.session.add(contact)
    db.session.commit()


def update_contact(user, contact_id, contact_data):
    contact = Contact.query.filter_by(id=contact_id, user_id=user["id"]).first()

    if not contact:
        raise NotFoundError("Contact not found")

    contact.full_name = contact_data.fullName
    contact.nick_name = contact_data.nickName
    contact.phone_number = contact_data.phoneNumber
    contact.email = contact_data.email

    contact.addresses.clear()

    for address in contact_data.addresses:
        contact.addresses.append(
            Address(
                street=address.street,
                city=address.city,
                district=address.district,
                sub_district=address.subDistrict,
                postal_code=address.postalCode,
            )
        )

    db.session.commit()


def delete_contact(user, contact_id):
    contact = Contact.query.filter_by(id=contact_id, user_id=user["id"]).first()

    if not contact:
        raise NotFoundError("Contact not found")

    db.session.delete(contact)
    db.session.commit()
