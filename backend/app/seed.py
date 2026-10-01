from sqlalchemy.orm import Session

from app.categorias_data import CATEGORIAS
from app.models.categoria_residuo import CategoriaResiduo


def seed_categorias(db: Session) -> None:
    if db.query(CategoriaResiduo).count() > 0:
        return

    for dados in CATEGORIAS:
        db.add(CategoriaResiduo(**dados))
    db.commit()
