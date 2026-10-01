# Diagrama do Banco de Dados - DescarteIA

MER das tabelas usadas no backend (SQLite via SQLAlchemy).

```mermaid
erDiagram
    DESCARTES {
        int id PK
        string descricao_informada
        string status
        datetime data_registro
    }

    CLASSIFICACOES_IA {
        int id PK
        int descarte_id FK
        int categoria_id FK
        string nome_residuo
        bool reciclavel
        string instrucoes_descarte
        string dica
        string emoji
        float confianca
        string prompt_utilizado
        string resposta_bruta
        datetime processado_em
    }

    CATEGORIAS_RESIDUO {
        int id PK
        string nome
        string descricao
        string instrucoes_descarte
        string cor_identificacao
        bool reciclavel
    }

    DESCARTES ||--|| CLASSIFICACOES_IA : "gera"
    CATEGORIAS_RESIDUO ||--o{ CLASSIFICACOES_IA : "classifica em"
```

`categoria_id` só fica nulo se a IA responder com um nome de categoria que não
existe na tabela `categorias_residuo` (não deveria acontecer, já que o prompt
lista as categorias válidas, mas o código trata esse caso). `confianca` sempre
fica nulo porque a API do Gemini não retorna esse valor.
