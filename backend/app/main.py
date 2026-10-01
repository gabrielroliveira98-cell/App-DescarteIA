from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

from app.database import Base, engine  # noqa: E402
from app.routers import api  # noqa: E402

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DescarteIA API",
    description="Backend do DescarteIA - classificacao de residuos via IA.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api.router)


@app.get("/")
def raiz():
    return {"status": "ok", "app": "DescarteIA API"}
