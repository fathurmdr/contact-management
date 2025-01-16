import os


class Config:
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = os.getenv("PORT", "3000")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
