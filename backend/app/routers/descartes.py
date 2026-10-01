from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.categoria_residuo import CategoriaResiduo
from app.models.classificacao_ia import ClassificacaoIA
from app.models.descarte import Descarte
from app.models.status_descarte import StatusDescarte
from app.schemas.descarte_schemas import CriarDescarteRequest, DescarteResponse
from app.services.gemini_classification_service import GeminiClassificacaoIAService
from app.services.ia_classification_service import ClassificacaoIAError

router = APIRouter(prefix="/descartes", tags=["descartes"])


def get_ia_service() -> GeminiClassificacaoIAService:
    return GeminiClassificacaoIAService()


@router.post("", response_model=DescarteResponse, status_code=201)
def criar_descarte(payload: CriarDescarteRequest, db: Session = Depends(get_db)):
    descarte = Descarte(descricao_informada=payload.descricao_informada, status=StatusDescarte.PENDENTE)
    db.add(descarte)
    db.commit()
    db.refresh(descarte)
    return descarte


@router.post("/{descarte_id}/classificar", response_model=DescarteResponse)
def classificar_descarte(
    descarte_id: int,
    db: Session = Depends(get_db),
    ia_service: GeminiClassificacaoIAService = Depends(get_ia_service),
):
    descarte = db.get(Descarte, descarte_id)
    if descarte is None:
        raise HTTPException(status_code=404, detail="Descarte nao encontrado.")
    if descarte.status == StatusDescarte.CLASSIFICADO:
        raise HTTPException(status_code=409, detail="Este descarte ja foi classificado.")

    try:
        resultado = ia_service.classificar(descarte.descricao_informada)
    except ClassificacaoIAError as exc:
        descarte.status = StatusDescarte.ERRO
        db.commit()
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    categoria = db.query(CategoriaResiduo).filter(CategoriaResiduo.nome == resultado.get("categoria", "Outro")).first()

    classificacao = ClassificacaoIA(
        descarte_id=descarte.id,
        categoria_id=categoria.id if categoria else None,
        nome_residuo=resultado.get("nome"),
        reciclavel=resultado.get("reciclavel"),
        instrucoes_descarte=resultado.get("descarte"),
        dica=resultado.get("dica"),
        emoji=resultado.get("emoji"),
        prompt_utilizado=resultado.get("prompt_utilizado"),
        resposta_bruta=resultado.get("resposta_bruta"),
    )
    descarte.status = StatusDescarte.CLASSIFICADO

    db.add(classificacao)
    db.commit()
    db.refresh(descarte)
    return descarte


@router.get("/{descarte_id}", response_model=DescarteResponse)
def obter_descarte(descarte_id: int, db: Session = Depends(get_db)):
    descarte = db.get(Descarte, descarte_id)
    if descarte is None:
        raise HTTPException(status_code=404, detail="Descarte nao encontrado.")
    return descarte
