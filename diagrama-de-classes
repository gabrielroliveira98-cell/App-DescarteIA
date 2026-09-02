# Diagrama de Classes — DescarteIA

> Ajuste os atributos e métodos conforme a implementação real do projeto (`models.py` / entidades do app).

```mermaid
classDiagram
    class Usuario {
        +int id
        +string nome
        +string email
        +string senhaHash
        +datetime dataCadastro
        +cadastrar() void
        +login(email, senha) bool
        +consultarHistorico() List~Descarte~
    }

    class Descarte {
        +int id
        +int usuarioId
        +string imagemUrl
        +string descricaoInformada
        +datetime dataRegistro
        +StatusDescarte status
        +registrar() void
        +vincularClassificacao(classificacao) void
    }

    class StatusDescarte {
        <<enumeration>>
        PENDENTE
        CLASSIFICADO
        ERRO
    }

    class ClassificacaoIA {
        +int id
        +int descarteId
        +string categoriaIdentificada
        +float confianca
        +string promptUtilizado
        +string respostaBruta
        +datetime processadoEm
        +classificar(imagem) CategoriaResiduo
    }

    class CategoriaResiduo {
        +int id
        +string nome
        +string descricao
        +string instrucoesDescarte
        +string corIdentificacao
        +bool reciclavel
    }

    class ServicoAnthropicAPI {
        <<service>>
        -string apiKey
        +enviarPrompt(imagem, contexto) string
        +montarPromptClassificacao(dados) string
    }

    class PontoColeta {
        +int id
        +string nome
        +string endereco
        +float latitude
        +float longitude
        +string[] categoriasAceitas
        +buscarProximos(localizacao) List~PontoColeta~
    }

    Usuario "1" --> "*" Descarte : realiza
    Descarte "1" --> "1" ClassificacaoIA : gera
    ClassificacaoIA "*" --> "1" CategoriaResiduo : identifica
    ClassificacaoIA ..> ServicoAnthropicAPI : utiliza
    Descarte --> StatusDescarte : possui
    CategoriaResiduo "1" --> "*" PontoColeta : direcionado para
```

## Legenda

- `<|--` Herança
- `o--` Agregação
- `*--` Composição
- `-->` Associação direcionada
- `..>` Dependência
- `"1"`, `"*"` Multiplicidade
