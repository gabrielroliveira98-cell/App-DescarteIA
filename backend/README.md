# DescarteIA - Backend

Backend do DescarteIA, app que ajuda a identificar resíduos e orientar o
descarte correto no Brasil. Existe pra tirar a chave do Groq do front e
guardar o histórico num lugar só, em vez de cada navegador ter o seu.

## Rotas

| Rota | O que faz |
|---|---|
| `POST /api/classificar` | Recebe a descrição do item e devolve a classificação da IA |
| `POST /api/historico` | Salva um resultado no histórico |
| `GET /api/historico` | Lista o histórico salvo |
| `DELETE /api/historico` | Limpa o histórico |

## Classes principais

| Classe | Tipo | Papel |
|---|---|---|
| `Categoria` | Enum | As 16 categorias de resíduo |
| `HistoricoItem` | Entidade (ORM) | Um item salvo no histórico |
| `GroqClassificacaoIAService` | Serviço | Chama a API do Groq e devolve a classificação |
| `ClassificarRequest` | DTO (Pydantic) | Corpo esperado por `POST /api/classificar` |
| `ClassificacaoResponse` | DTO (Pydantic) | Formato da classificação (igual em todas as rotas) |
| `SalvarHistoricoRequest` | DTO (Pydantic) | Corpo esperado por `POST /api/historico` |
| `HistoricoItemResponse` | DTO (Pydantic) | Formato de cada item do histórico |

`Usuario` e `PontoColeta`, que apareciam no diagrama de classes original, ainda
não foram implementados.

## Banco de dados

Uma tabela só:

- `historico`: id, descricao, nome_residuo, categoria, reciclavel,
  instrucoes_descarte, dica, emoji, data_registro

## Como rodar localmente

Pré-requisito: Python 3.12+ e uma chave gratuita do Groq (cria em
https://console.groq.com/keys, sem cartão de crédito).

```bash
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # Linux/Mac
pip install -r requirements.txt

copy .env.example .env        # Windows
# cp .env.example .env        # Linux/Mac
```

Abre o `.env` e preenche `GROQ_API_KEY` com a chave.

```bash
uvicorn app.main:app --reload
```

Sobe em `http://localhost:8000`. O banco SQLite (`descarteia.db`) é criado
sozinho no primeiro start. Swagger pra testar as rotas na mão:
`http://localhost:8000/docs`.

Testar pelo terminal:

```bash
curl -X POST http://localhost:8000/api/classificar -H "Content-Type: application/json" -d "{\"descricao\": \"pet de coca vazia\"}"
```

## Rodar os testes

```bash
pip install pytest
pytest -v
```

Os testes usam um dublê no lugar da IA real - nenhum teste chama o Groq de
verdade.
