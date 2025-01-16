from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List


class AddressSchema(BaseModel):
    street: str
    city: Optional[str] = None
    district: Optional[str] = None
    subDistrict: Optional[str] = None
    postalCode: Optional[str] = None


class ContactSchema(BaseModel):
    fullName: str
    nickName: Optional[str] = None
    phoneNumber: str = Field(..., min_length=10)
    email: Optional[EmailStr] = None
    addresses: List[AddressSchema] = []
