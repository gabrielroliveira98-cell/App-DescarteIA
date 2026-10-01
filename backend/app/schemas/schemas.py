from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ClassificarRequest(BaseModel):
    descricao: str = Field(..., min_length=3, max_length=500, examples=["pilha velha do controle"])


class ClassificacaoResponse(BaseModel):
    nome: str
    categoria: str
    reciclavel: bool
    descarte: str
    dica: str
    emoji: str


class SalvarHistoricoRequest(BaseModel):
    descricao: str
    nome: str
    categoria: str
    reciclavel: bool
    descarte: str
    dica: str
    emoji: str


class HistoricoItemResponse(BaseModel):
    id: int
    descricao: str
    nome: Optional[str] = None
    categoria: str
    reciclavel: Optional[bool] = None
    descarte: Optional[str] = None
    dica: Optional[str] = None
    emoji: Optional[str] = None
    data_registro: datetime
