# DescarteIA — Backend

Backend do **DescarteIA**, app que ajuda a identificar resíduos e orientar o
descarte correto no Brasil. A taxonomia de categorias e o prompt de
classificação vieram do protótipo `DescarteIA.jsx`/`docs/` já existentes no
projeto, adaptados para usar Gemini em vez da Anthropic.

## Funcionalidades

1. **Cadastrar um Descarte** — `POST /descartes`
2. **Enviar para a IA classificar** — `POST /descartes/{id}/classificar`
3. **Consultar o resultado salvo** — `GET /descartes/{id}`

## Classes principais

| Classe | Tipo | Papel |
|---|---|---|
| `Descarte` | Entidade (ORM) | Item a ser descartado |
| `StatusDescarte` | Enum | PENDENTE / CLASSIFICADO / ERRO |
| `CategoriaResiduo` | Entidade (ORM) | Catálogo de categorias (Plástico, Vidro, Eletrônico...) |
| `ClassificacaoIA` | Entidade (ORM) | Resultado que a IA devolveu para um Descarte |
| `GeminiClassificacaoIAService` | Serviço | Chama a API do Gemini e devolve a classificação |
| `CriarDescarteRequest` | DTO (Pydantic) | Corpo esperado por `POST /descartes` |
| `DescarteResponse` | DTO (Pydantic) | Formato de resposta da API |
| `ClassificacaoResponse` | DTO (Pydantic) | Formato da classificação dentro da resposta |

`Usuario` e `PontoColeta` (do diagrama de classes original) ainda não foram
implementados.

## Banco de dados

```
categorias_residuo (1) ---- (N) classificacoes_ia (1) ---- (1) descartes
```

- `descartes`: id, descricao_informada, status, data_registro
- `classificacoes_ia`: id, descarte_id (FK, único), categoria_id (FK), nome_residuo,
  reciclavel, instrucoes_descarte, dica, emoji, confianca (fica nulo — a API de IA
  não retorna esse valor), prompt_utilizado, resposta_bruta, processado_em
- `categorias_residuo`: id, nome, descricao, instrucoes_descarte, cor_identificacao,
  reciclavel

## Como rodar localmente

### 1. Pré-requisitos
- Python 3.12+ (já vem com `pip`)
- Uma chave gratuita do Gemini: crie conta em https://aistudio.google.com e
  gere uma chave em https://aistudio.google.com/apikey (sem cartão de crédito)

### 2. Instalar dependências

```bash
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # Linux/Mac
pip install -r requirements.txt
```

### 3. Configurar

```bash
copy .env.example .env        # Windows
# cp .env.example .env        # Linux/Mac
```

Abra o `.env` e preencha `GEMINI_API_KEY` com a chave gerada no passo 1.

### 4. Rodar a API

```bash
uvicorn app.main:app --reload
```

A API sobe em `http://localhost:8000`. O banco SQLite (`descarteia.db`) e a
tabela de categorias são criados automaticamente no primeiro start.

Documentação interativa (Swagger): `http://localhost:8000/docs`

### 5. Testar o fluxo completo

```bash
# 1. Cria um descarte
curl -X POST http://localhost:8000/descartes -H "Content-Type: application/json" -d "{\"descricao_informada\": \"pet de coca vazia\"}"

# 2. Classifica (troque 1 pelo id retornado acima)
curl -X POST http://localhost:8000/descartes/1/classificar

# 3. Consulta o resultado salvo
curl http://localhost:8000/descartes/1
```

### 6. Rodar os testes automatizados

```bash
pip install pytest
pytest -v
```

Os testes usam um dublê (`FakeIAService`) no lugar da IA real — nenhum teste
automatizado chama a API de IA de verdade.

## Troubleshooting

- **"GEMINI_API_KEY nao configurado"**: falta preencher o `.env` (passo 3) e
  reiniciar o `uvicorn`.
- **Erro 502/503 ao classificar**: erro de rede ou instabilidade temporária da
  API do Gemini — a mensagem de erro retornada traz o detalhe, e costuma
  funcionar tentando de novo.
- **Erro 409 "ja foi classificado"**: um Descarte só pode ser classificado uma
  vez (evita reprocessar e gastar cota da IA à toa).
