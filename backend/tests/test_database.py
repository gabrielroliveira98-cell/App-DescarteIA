from app.database import ajustar_url_banco


def test_url_postgres_antiga_e_corrigida():
    url = ajustar_url_banco("postgres://user:senha@host:5432/banco")
    assert url == "postgresql://user:senha@host:5432/banco"


def test_url_postgresql_continua_igual():
    url = "postgresql://user:senha@host:5432/banco"
    assert ajustar_url_banco(url) == url


def test_url_sqlite_continua_igual():
    assert ajustar_url_banco("sqlite:///./descarteia.db") == "sqlite:///./descarteia.db"
