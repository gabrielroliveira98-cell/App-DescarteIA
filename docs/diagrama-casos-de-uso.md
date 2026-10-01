# Diagrama de Casos de Uso — DescarteIA

```mermaid
flowchart TB
    Usuario((Usuário))
    Admin((Administrador))

    subgraph Sistema["DescarteIA"]
        UC1([Cadastrar-se])
        UC2([Fazer login])
        UC3([Enviar foto do resíduo])
        UC4([Classificar resíduo via IA])
        UC5([Ver instruções de descarte])
        UC6([Consultar pontos de coleta])
        UC7([Ver histórico de descartes])
        UC8([Gerenciar categorias de resíduo])
    end

    Usuario --> UC1
    Usuario --> UC2
    Usuario --> UC3
    UC3 --> UC4
    UC4 --> UC5
    Usuario --> UC6
    Usuario --> UC7

    Admin --> UC2
    Admin --> UC8
```

## Descrição resumida dos casos de uso

| Caso de Uso | Ator | Descrição |
|---|---|---|
| Cadastrar-se | Usuário | Cria uma conta no aplicativo |
| Fazer login | Usuário / Admin | Autentica-se no sistema |
| Enviar foto do resíduo | Usuário | Envia imagem/descrição do item a ser descartado |
| Classificar resíduo via IA | Sistema | Usa a API da Anthropic para identificar a categoria |
| Ver instruções de descarte | Usuário | Recebe orientação de como descartar corretamente |
| Consultar pontos de coleta | Usuário | Vê locais próximos que aceitam aquele tipo de resíduo |
| Ver histórico de descartes | Usuário | Consulta descartes já registrados |
| Gerenciar categorias de resíduo | Administrador | Cadastra/edita categorias e instruções |
