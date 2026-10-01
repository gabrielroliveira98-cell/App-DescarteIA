import os

os.environ["DATABASE_URL"] = "sqlite:///./test_descarteia.db"

import pytest
from fastapi.testclient import TestClient

from app.database import Base, SessionLocal, engine, get_db
from app.main import app
from app.routers.descartes import get_ia_service
from app.seed import seed_categorias
from app.services.ia_classification_service import ClassificacaoIAServiceBase


class FakeIAService(ClassificacaoIAServiceBase):
    def __init__(self):
        self.resultado = {
            "nome": "Garrafa PET",
            "categoria": "Plástico",
            "reciclavel": True,
            "descarte": "Descarte limpo na coleta seletiva de plastico.",
            "dica": "Amasse a garrafa para ocupar menos espaco.",
            "emoji": "🧴",
            "prompt_utilizado": "prompt de teste",
            "resposta_bruta": "{}",
        }

    def classificar(self, descricao: str) -> dict:
        return self.resultado


@pytest.fixture()
def fake_ia_service():
    return FakeIAService()


@pytest.fixture()
def client(fake_ia_service):
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    seed_categorias(db)
    db.close()

    def override_get_db():
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_ia_service] = lambda: fake_ia_service

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()
    engine.dispose()
    if os.path.exists("./test_descarteia.db"):
        os.remove("./test_descarteia.db")
