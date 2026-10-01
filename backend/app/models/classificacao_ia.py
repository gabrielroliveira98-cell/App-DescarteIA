from datetime import datetime, timezone

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class ClassificacaoIA(Base):
    __tablename__ = "classificacoes_ia"

    id = Column(Integer, primary_key=True, index=True)
    descarte_id = Column(Integer, ForeignKey("descartes.id"), nullable=False, unique=True)
    categoria_id = Column(Integer, ForeignKey("categorias_residuo.id"), nullable=True)

    nome_residuo = Column(String(120), nullable=True)
    reciclavel = Column(Boolean, nullable=True)
    instrucoes_descarte = Column(String(500), nullable=True)
    dica = Column(String(300), nullable=True)
    emoji = Column(String(8), nullable=True)
    confianca = Column(Float, nullable=True)  # a API de IA nao retorna esse valor

    prompt_utilizado = Column(Text, nullable=True)
    resposta_bruta = Column(Text, nullable=True)
    processado_em = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))

    descarte = relationship("Descarte", back_populates="classificacao")
    categoria_residuo = relationship("CategoriaResiduo", back_populates="classificacoes")

    @property
    def categoria(self) -> str | None:
        return self.categoria_residuo.nome if self.categoria_residuo else None
