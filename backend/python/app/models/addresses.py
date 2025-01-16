from typing import TYPE_CHECKING, Optional
import time
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.extensions import db

if TYPE_CHECKING:
    from app.models import Contact


class Address(db.Model):
    __tablename__ = "addresses"

    id: Mapped[int] = mapped_column(primary_key=True)
    contact_id: Mapped[int] = mapped_column(ForeignKey("contacts.id"))
    street: Mapped[str] = mapped_column(nullable=False)
    city: Mapped[Optional[str]] = mapped_column(nullable=True)
    district: Mapped[Optional[str]] = mapped_column(nullable=True)
    sub_district: Mapped[Optional[str]] = mapped_column(nullable=True)
    postal_code: Mapped[Optional[str]] = mapped_column(nullable=True)
    created_at: Mapped[int] = mapped_column(default=lambda: int(time.time()))
    updated_at: Mapped[int] = mapped_column(
        default=lambda: int(time.time()),
        onupdate=lambda: int(time.time()),
    )

    contact: Mapped["Contact"] = relationship(back_populates="addresses")
