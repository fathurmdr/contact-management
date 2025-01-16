import bcrypt
import time
from app.models import User, Session
from app.schemas.auth_schemas import RegisterSchema, LoginSchema
from app.utils.response_error import ValidationError, AuthorizationError
from app.extensions import db


def register(register_data: RegisterSchema):
    with db.session.begin():
        existing_user = User.query.filter(
            (User.email == register_data.email)
            | (User.phone_number == register_data.phoneNumber)
        ).first()

        if existing_user:
            raise ValidationError("Email or phone number already used")

        hashed_password = bcrypt.hashpw(
            register_data.password.encode("utf-8"), bcrypt.gensalt()
        )

        new_user = User(
            name=register_data.name,
            email=register_data.email,
            phone_number=register_data.phoneNumber,
            password=hashed_password.decode("utf-8"),
            bio=register_data.bio,
        )
        db.session.add(new_user)
        db.session.commit()


def login(login_data: LoginSchema):
    user = User.query.filter(
        (User.email == login_data.emailOrPhoneNumber)
        | (User.phone_number == login_data.emailOrPhoneNumber)
    ).first()

    if not user:
        raise AuthorizationError("Email, phone number, or password is incorrect")

    if not bcrypt.checkpw(
        login_data.password.encode("utf-8"), user.password.encode("utf-8")
    ):
        raise AuthorizationError("Email, phone number, or password is incorrect")

    new_session = Session(user_id=user.id, expires_at=int(time.time()) + 86400)
    db.session.add(new_session)
    db.session.commit()

    return {
        "sessionId": new_session.id,
        "expiresAt": new_session.expires_at,
    }
