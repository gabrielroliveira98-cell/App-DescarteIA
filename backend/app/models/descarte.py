from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Enum, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.status_descarte import StatusDescarte


class Descarte(Base):
    __tablename__ = "descartes"

    id = Column(Integer, primary_key=True, index=True)
    descricao_informada = Column(String(500), nullable=False)
    status = Column(Enum(StatusDescarte), nullable=False, default=StatusDescarte.PENDENTE)
    data_registro = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))

    classificacao = relationship(
        "ClassificacaoIA", back_populates="descarte", uselist=False, cascade="all, delete-orphan"
    )
