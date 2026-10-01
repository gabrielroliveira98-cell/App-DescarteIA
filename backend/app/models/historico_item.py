from datetime import datetime, timezone

from sqlalchemy import Boolean, Column, DateTime, Integer, String

from app.database import Base


class HistoricoItem(Base):
    __tablename__ = "historico"

    id = Column(Integer, primary_key=True, index=True)
    descricao = Column(String(500), nullable=False)
    nome_residuo = Column(String(120), nullable=True)
    categoria = Column(String(60), nullable=False)
    reciclavel = Column(Boolean, nullable=True)
    instrucoes_descarte = Column(String(500), nullable=True)
    dica = Column(String(300), nullable=True)
    emoji = Column(String(8), nullable=True)
    data_registro = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
