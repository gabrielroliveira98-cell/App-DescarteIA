# API - DescarteIA

Base: `http://localhost:8000` (local) ou o endereço onde o backend estiver
rodando.

## POST /api/classificar

Classifica um resíduo a partir da descrição. Não salva nada.

Requisição:

```json
{ "descricao": "pilha velha do controle" }
```

Resposta:

```json
{
  "nome": "Pilha",
  "categoria": "Pilha ou bateria",
  "reciclavel": true,
  "descarte": "Entregue em pontos de coleta específicos em supermercados, farmácias ou lojas de eletrônicos.",
  "dica": "Nunca jogue no lixo comum.",
  "emoji": "🔋"
}
```

Se a IA falhar, devolve `502` com uma mensagem em `detail`.

## POST /api/historico

Salva um resultado no histórico. O corpo é a descrição original mais o mesmo
formato que `/api/classificar` devolve.

Requisição:

```json
{
  "descricao": "pilha velha do controle",
  "nome": "Pilha",
  "categoria": "Pilha ou bateria",
  "reciclavel": true,
  "descarte": "Entregue em pontos de coleta específicos em supermercados, farmácias ou lojas de eletrônicos.",
  "dica": "Nunca jogue no lixo comum.",
  "emoji": "🔋"
}
```

Resposta (`201`): o mesmo item, com `id` e `data_registro` a mais.

## GET /api/historico

Lista o histórico, mais recente primeiro.

Resposta:

```json
[
  {
    "id": 1,
    "descricao": "pilha velha do controle",
    "nome": "Pilha",
    "categoria": "Pilha ou bateria",
    "reciclavel": true,
    "descarte": "Entregue em pontos de coleta específicos em supermercados, farmácias ou lojas de eletrônicos.",
    "dica": "Nunca jogue no lixo comum.",
    "emoji": "🔋",
    "data_registro": "2026-10-01T22:03:02.126788"
  }
]
```

## DELETE /api/historico

Apaga tudo o que estava salvo. Devolve `204`, sem corpo.
