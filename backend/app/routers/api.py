from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.historico_item import HistoricoItem
from app.schemas.schemas import (
    ClassificacaoResponse,
    ClassificarRequest,
    HistoricoItemResponse,
    SalvarHistoricoRequest,
)
from app.services.groq_classification_service import GroqClassificacaoIAService
from app.services.ia_classification_service import ClassificacaoIAError

router = APIRouter(prefix="/api")


def get_ia_service() -> GroqClassificacaoIAService:
    return GroqClassificacaoIAService()


def para_resposta(item: HistoricoItem) -> HistoricoItemResponse:
    return HistoricoItemResponse(
        id=item.id,
        descricao=item.descricao,
        nome=item.nome_residuo,
        categoria=item.categoria,
        reciclavel=item.reciclavel,
        descarte=item.instrucoes_descarte,
        dica=item.dica,
        emoji=item.emoji,
        data_registro=item.data_registro,
    )


@router.post("/classificar", response_model=ClassificacaoResponse)
def classificar(payload: ClassificarRequest, ia_service: GroqClassificacaoIAService = Depends(get_ia_service)):
    try:
        resultado = ia_service.classificar(payload.descricao)
    except ClassificacaoIAError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    return resultado


@router.get("/historico", response_model=list[HistoricoItemResponse])
def listar_historico(db: Session = Depends(get_db)):
    itens = db.query(HistoricoItem).order_by(HistoricoItem.data_registro.desc()).all()
    return [para_resposta(item) for item in itens]


@router.post("/historico", response_model=HistoricoItemResponse, status_code=201)
def salvar_historico(payload: SalvarHistoricoRequest, db: Session = Depends(get_db)):
    item = HistoricoItem(
        descricao=payload.descricao,
        nome_residuo=payload.nome,
        categoria=payload.categoria,
        reciclavel=payload.reciclavel,
        instrucoes_descarte=payload.descarte,
        dica=payload.dica,
        emoji=payload.emoji,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return para_resposta(item)


@router.delete("/historico", status_code=204)
def limpar_historico(db: Session = Depends(get_db)):
    db.query(HistoricoItem).delete()
    db.commit()
