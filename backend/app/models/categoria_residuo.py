from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class CategoriaResiduo(Base):
    __tablename__ = "categorias_residuo"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(60), unique=True, nullable=False, index=True)
    descricao = Column(String(255), nullable=True)
    instrucoes_descarte = Column(String(500), nullable=True)
    cor_identificacao = Column(String(7), nullable=True)
    reciclavel = Column(Boolean, nullable=False, default=False)

    classificacoes = relationship("ClassificacaoIA", back_populates="categoria_residuo")
