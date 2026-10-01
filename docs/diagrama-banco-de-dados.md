# Diagrama do Banco de Dados - DescarteIA

Uma tabela só, sem relacionamento com outra tabela.

```mermaid
erDiagram
    HISTORICO {
        int id PK
        string descricao
        string nome_residuo
        string categoria
        bool reciclavel
        string instrucoes_descarte
        string dica
        string emoji
        datetime data_registro
    }
```

`categoria` é salva como texto (um dos 16 valores da enumeração `Categoria`),
não como uma tabela separada - não tem necessidade de gerenciar categorias
dinamicamente, elas são fixas no código.
