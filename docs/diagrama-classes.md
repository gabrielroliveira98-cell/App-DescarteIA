# Diagrama de Classes — DescarteIA

Reflete o que está implementado no backend até a Entrega 3.

```mermaid
classDiagram
    class Descarte {
        +int id
        +string descricaoInformada
        +StatusDescarte status
        +datetime dataRegistro
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
        +string nomeResiduo
        +bool reciclavel
        +string instrucoesDescarte
        +string dica
        +string emoji
        +float confianca
        +string promptUtilizado
        +string respostaBruta
        +datetime processadoEm
    }

    class CategoriaResiduo {
        +int id
        +string nome
        +string descricao
        +string instrucoesDescarte
        +string corIdentificacao
        +bool reciclavel
    }

    class GeminiClassificacaoIAService {
        -string apiKey
        +classificar(descricao) dict
    }

    Descarte "1" --> "1" ClassificacaoIA : gera
    ClassificacaoIA "*" --> "1" CategoriaResiduo : identifica
    ClassificacaoIA ..> GeminiClassificacaoIAService : usa
    Descarte --> StatusDescarte : possui
```

`Usuario` e `PontoColeta`, que apareciam na versão inicial deste diagrama (documento de visão), ainda não foram implementados — ficam para uma próxima entrega, quando o app tiver cadastro de usuário e busca por local de coleta.
