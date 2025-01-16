from pydantic import BaseModel
from typing import Optional


class GroupSchema(BaseModel):
    name: str
    description: Optional[str] = None


class GroupMemberSchema(BaseModel):
    contactId: int
