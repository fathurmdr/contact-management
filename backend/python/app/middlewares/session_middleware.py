from flask import request, g, Flask
import time
from sqlalchemy.orm.exc import NoResultFound
from app.utils.response_error import ForbiddenError
from app.models import Session


def session_middleware(app: Flask):
    @app.before_request
    def handle_session():
        try:
            session_id = request.headers.get("x-session-id")
            if not session_id:
                return

            session = Session.query.filter_by(id=session_id).first()

            if session and session.user:
                if session.expires_at < int(time.time()):
                    raise ForbiddenError("Session expired")

                g.user = {
                    "id": session.user.id,
                    "name": session.user.name,
                    "email": session.user.email,
                    "phone_number": session.user.phone_number,
                    "bio": session.user.bio,
                }
        except NoResultFound:
            pass
        except Exception as e:
            raise e
