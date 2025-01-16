from typing import TYPE_CHECKING, List, Optional
import time
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.extensions import db
from app.models.groups import association_table


if TYPE_CHECKING:
    from app.models import User, Address, Group


class Contact(db.Model):
    __tablename__ = "contacts"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    full_name: Mapped[str] = mapped_column(nullable=False)
    nick_name: Mapped[Optional[str]] = mapped_column(nullable=True)
    phone_number: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[Optional[str]] = mapped_column(nullable=True)
    created_at: Mapped[int] = mapped_column(default=lambda: int(time.time()))
    updated_at: Mapped[int] = mapped_column(
        default=lambda: int(time.time()),
        onupdate=lambda: int(time.time()),
    )

    user: Mapped["User"] = relationship(back_populates="contacts")
    addresses: Mapped[List["Address"]] = relationship(
        back_populates="contact", cascade="all, delete-orphan"
    )
    groups: Mapped[List["Group"]] = relationship(
        secondary=association_table, back_populates="members"
    )
