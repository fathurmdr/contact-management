from typing import TYPE_CHECKING, List, Optional
import time
from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.extensions import db

if TYPE_CHECKING:
    from app.models import User, Contact

association_table = Table(
    "group_members",
    db.Model.metadata,
    Column("group_id", ForeignKey("groups.id"), primary_key=True),
    Column("contact_id", ForeignKey("contacts.id"), primary_key=True),
)


class Group(db.Model):
    __tablename__ = "groups"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[Optional[str]] = mapped_column(nullable=True)
    created_at: Mapped[int] = mapped_column(default=lambda: int(time.time()))
    updated_at: Mapped[int] = mapped_column(
        default=lambda: int(time.time()),
        onupdate=lambda: int(time.time()),
    )

    user: Mapped["User"] = relationship(back_populates="groups")
    members: Mapped[List["Contact"]] = relationship(
        secondary=association_table, back_populates="groups"
    )
