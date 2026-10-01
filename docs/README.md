# 📄 Documentação Técnica — DescarteIA

Esta pasta contém os diagramas UML do projeto **DescarteIA**, desenvolvido para a disciplina de Análise e Desenvolvimento de Sistemas (ADS).

## Como usar

1. Extraia esta pasta (`docs/`) dentro do seu repositório Git.
2. Adicione e faça commit normalmente:

```bash
git add docs/
git commit -m "docs: adiciona diagramas UML do projeto"
git push
```

3. Os diagramas são escritos em **Mermaid** e renderizam automaticamente ao abrir os arquivos `.md` no GitHub — não precisa de nenhuma ferramenta externa.

## Conteúdo

| Arquivo | Descrição |
|---|---|
| [`diagrama-classes.md`](docs/diagrama-classes.md) | Diagrama de Classes UML — estrutura de dados e regras do sistema |
| [`diagrama-casos-de-uso.md`](docs/diagrama-casos-de-uso.md) | Diagrama de Casos de Uso — interações do usuário com o sistema |
| [`diagrama-sequencia.md`](docs/diagrama-sequencia.md) | Diagrama de Sequência — fluxo de classificação de resíduo via IA |

## Sobre o projeto

O **DescarteIA** é um protótipo de aplicativo mobile que utiliza a API da Anthropic (Claude) com técnicas de Prompt Engineering para identificar o tipo de resíduo a partir de uma foto/descrição e orientar o usuário sobre a forma correta de descarte.
