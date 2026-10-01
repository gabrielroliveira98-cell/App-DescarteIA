from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app.models.status_descarte import StatusDescarte


class CriarDescarteRequest(BaseModel):
    descricao_informada: str = Field(
        ..., min_length=3, max_length=500, examples=["pilha velha do controle"]
    )


class ClassificacaoResponse(BaseModel):
    categoria: Optional[str] = None
    nome_residuo: Optional[str] = None
    reciclavel: Optional[bool] = None
    instrucoes_descarte: Optional[str] = None
    dica: Optional[str] = None
    emoji: Optional[str] = None
    processado_em: Optional[datetime] = None

    model_config = {"from_attributes": True}


class DescarteResponse(BaseModel):
    id: int
    descricao_informada: str
    status: StatusDescarte
    data_registro: datetime
    classificacao: Optional[ClassificacaoResponse] = None

    model_config = {"from_attributes": True}
