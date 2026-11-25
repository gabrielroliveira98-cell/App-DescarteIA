from datetime import datetime, timezone

from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text

from app.database import Base


class HistoricoItem(Base):
    __tablename__ = "historico"

    id = Column(Integer, primary_key=True, index=True)
    descricao = Column(Text, nullable=False)
    nome_residuo = Column(String(200), nullable=True)
    categoria = Column(String(60), nullable=False)
    reciclavel = Column(Boolean, nullable=True)
    instrucoes_descarte = Column(Text, nullable=True)
    dica = Column(Text, nullable=True)
    emoji = Column(String(32), nullable=True)
    data_registro = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
