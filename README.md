# ♻️ DescarteIA

**Aplicativo móvel** onde o usuário informa, pelo chat, **o que deseja
descartar** — e uma Inteligência Artificial orienta **como e onde fazer o
descarte correto** daquele item.

> **Status:** em planejamento. Esta etapa entrega a governança do projeto
> (repositório + Kanban + issues), o Documento de Visão e Escopo (este
> README) e a modelagem inicial (Diagrama de Classes). O desenvolvimento do
> aplicativo começa na próxima etapa.

## Documento de Visão e Escopo

### Nome do projeto

**DescarteIA**

### O problema real

Muita gente não sabe o destino correto de itens do dia a dia — pilhas,
eletrônicos, óleo de cozinha, remédios vencidos, entre outros — e acaba
descartando tudo no lixo comum. Isso contamina solo e água (no caso de
resíduos perigosos) e desperdiça material que poderia ser reciclado. A causa
não é falta de vontade: é falta de uma forma **rápida e confiável** de saber
o que fazer com aquele item específico, sem precisar pesquisar em várias
fontes diferentes.

### ODS escolhido

- **ODS 12 — Consumo e Produção Responsáveis** (principal): o projeto ataca
  diretamente a meta de redução da geração de resíduos por meio de
  prevenção, reciclagem e reuso, dando ao cidadão comum uma ferramenta
  prática para descartar corretamente no dia a dia.
- **ODS 11 — Cidades e Comunidades Sustentáveis** (relacionado): ao orientar
  o descarte correto em escala, o app contribui para uma gestão mais
  sustentável dos resíduos urbanos.

### A solução com IA

A IA é o diferencial do aplicativo, combinando duas camadas:

1. **Sistema de classificação/recomendação** — a partir da descrição livre do
   item (texto digitado pelo usuário), a IA identifica a categoria de
   resíduo correspondente (reciclável comum, perigoso, orgânico, eletrônico
   etc.), sem exigir que o usuário conheça essa categoria de antemão.
2. **IA generativa de texto** — a partir da categoria identificada, a IA
   gera a orientação de descarte em linguagem natural, conversacional e
   personalizada à pergunta do usuário, em vez de devolver uma resposta
   engessada de banco de dados.

Essa combinação é o que permite a experiência de chat: o usuário não
preenche formulário nem navega por categorias — ele só descreve o item, com
suas próprias palavras.

### Público-alvo

Pessoas em geral que usam o celular no dia a dia e querem descartar algo
corretamente sem pesquisar em várias fontes — com foco inicial em estudantes
e moradores de áreas urbanas, público mais engajado com sustentabilidade e
já habituado a apps de chat/mensagens no smartphone.

## Funcionalidades principais

- Chat para o usuário informar o item a ser descartado.
- Classificação automática do item por categoria de resíduo.
- Orientação de como e onde descartar corretamente cada categoria.
- Dicas educativas sobre o impacto ambiental do descarte incorreto.
- (Futuro) Histórico de itens consultados e localização de pontos de coleta
  próximos.

## Governança e gestão do projeto

- **Repositório**: este é o repositório principal do projeto.
- **Kanban**: acompanhamento das tarefas no quadro
  [DescarteIA (Projects)](https://github.com/users/gabrielroliveira98-cell/projects/5),
  com as colunas `To Do`, `In Progress`, `Review` e `Done`. As 7 issues
  iniciais já estão no quadro, na coluna `To Do`.
- **Issues**: cada tarefa inicial vira uma issue, atribuída a um integrante
  (ver divisão de tarefas abaixo) e adicionada ao quadro Kanban.

## Integrantes do grupo

| Nome |
|---|
| Gabriel |
| Arthur |
| Nayslon |
| João Pedro |
| Renato |
| Larissa |
| Roberthy |

## Divisão de tarefas

Cada integrante tem uma frente de responsabilidade principal para a próxima
etapa (desenvolvimento), registrada como uma [Issue](../../issues) no
repositório:

| Integrante | Frente | Responsabilidade |
|---|---|---|
| Gabriel | Arquitetura & IA | Definir a arquitetura geral do app e integrar a IA de classificação ao chat |
| Arthur | Frontend | Desenvolver a interface do chat |
| Nayslon | Backend | Desenvolver a API que liga o chat à IA |
| João Pedro | Modelagem de dados | Modelar o banco de dados e finalizar o Diagrama de Classes |
| Renato | Conteúdo / Regras de descarte | Levantar e estruturar as regras de descarte por categoria de resíduo |
| Larissa | UX/UI | Criar o protótipo visual do aplicativo |
| Roberthy | Documentação & Testes | Escrever a documentação técnica e o plano de testes |

Mapeando para as três frentes sugeridas para esta etapa:

- **Documento de Visão (ODS/pesquisa)**: Renato, Roberthy, Larissa.
- **Modelagem técnica (Diagrama de Classes / POO)**: João Pedro, Gabriel, Nayslon.
- **Ambiente GitHub / Kanban**: Arthur, com apoio de Gabriel na configuração inicial.

> Como o repositório ainda não tem os integrantes adicionados como
> colaboradores (falta o usuário do GitHub de cada um), as issues abaixo
> identificam o responsável pelo nome no título — assim que todos entrarem
> como colaboradores, é só atribuí-las (assignee) normalmente.

## Issues abertas

Uma issue inicial por integrante, cobrindo a frente de trabalho da tabela
acima — veja a aba [Issues](../../issues) do repositório.

## Estrutura do repositório

```
README.md          # este arquivo
docs/               # documentos do projeto (requisitos, atas, pesquisa etc.)
  diagrama-classes.md   # estrutura inicial do Diagrama de Classes
```

## Próximos passos

1. Adicionar todos os integrantes como colaboradores do repositório.
2. Cada um evoluir sua issue e abrir Pull Requests para o trabalho realizado.
3. Evoluir o Diagrama de Classes em `docs/diagrama-classes.md` conforme o
   modelo de dados for definido.
4. Iniciar o desenvolvimento do aplicativo.

