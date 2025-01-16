from flask import Flask
from app.extensions import db
from app.config import Config
from app.routes import auth_routes, contact_routes, group_routes
from app.middlewares import error_middleware, session_middleware


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.url_map.strict_slashes = False

    db.init_app(app)

    error_middleware(app)
    session_middleware(app)

    app.register_blueprint(auth_routes)
    app.register_blueprint(contact_routes)
    app.register_blueprint(group_routes)

    return app
