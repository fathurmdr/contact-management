from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    phoneNumber: str = Field(..., min_length=10)
    password: str = Field(..., min_length=6)
    bio: Optional[str] = None


class LoginSchema(BaseModel):
    emailOrPhoneNumber: str
    password: str = Field(..., min_length=6)
