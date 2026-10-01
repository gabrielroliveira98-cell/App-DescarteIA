from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

from app.database import Base, SessionLocal, engine  # noqa: E402
from app.routers import descartes  # noqa: E402
from app.seed import seed_categorias  # noqa: E402


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_categorias(db)
    finally:
        db.close()
    yield


app = FastAPI(
    title="DescarteIA API",
    description="Backend do DescarteIA - classificacao de residuos via IA.",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(descartes.router)


@app.get("/")
def raiz():
    return {"status": "ok", "app": "DescarteIA API"}
