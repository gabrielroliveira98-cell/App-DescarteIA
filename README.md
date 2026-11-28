# DescarteIA

> 📱 **Abrir o app no navegador:** https://gabrielroliveira98-cell.github.io/App-DescarteIA/ (funciona no PC e no celular; o primeiro acesso pode demorar uns 30 a 50 segundos enquanto a API acorda)

> 📊 **Apresentação (pitch deck):** [docs/pitch-deck.pdf](docs/pitch-deck.pdf)

> 🌐 **API no ar:** https://app-descarteia.onrender.com (teste rápido: [`/saude`](https://app-descarteia.onrender.com/saude) · documentação: [`/docs`](https://app-descarteia.onrender.com/docs))
>
> 🎥 **Vídeo da Entrega 4 (app conversando com a API):** https://drive.google.com/file/d/10YCbyaV_uLVKDlQfTbUGPQIIujuLbpcg/view?usp=sharing

## ODS Escolhido

**ODS 12 - Consumo e Produção Responsáveis**

O projeto DescarteIA está relacionado ao **ODS 12**, que tem como objetivo promover padrões de consumo e produção mais responsáveis.

Escolhemos esse ODS porque o aplicativo busca incentivar o descarte correto de resíduos e diminuir os impactos causados pelo descarte inadequado de materiais.

O aplicativo ajuda o usuário a descobrir como deve descartar diferentes tipos de resíduos, como pilhas, eletrônicos, óleo de cozinha, papelão, isopor e outros materiais. Dessa forma, o projeto busca contribuir para a redução da poluição, o aumento da reciclagem e o uso mais consciente dos recursos.

---

## O Problema Real

Um dos problemas encontrados é a dificuldade que muitas pessoas têm para descobrir **onde e como descartar corretamente determinados tipos de resíduos**.

Nem todo material pode ser colocado no lixo comum. Alguns resíduos precisam ser encaminhados para pontos de coleta específicos, enquanto outros podem ser reciclados ou precisam de cuidados especiais durante o descarte.

Por exemplo, uma pilha usada não deve ser descartada da mesma maneira que uma embalagem de papel limpa. O descarte incorreto de determinados materiais pode causar problemas ambientais, como a contaminação do solo e da água.

Além disso, as informações sobre descarte muitas vezes estão espalhadas em diferentes sites e nem sempre são fáceis de encontrar no momento em que a pessoa precisa delas.

O DescarteIA busca resolver esse problema oferecendo essas informações de maneira mais simples e rápida, permitindo que o usuário consulte um material e receba uma orientação sobre seu descarte.

---

## A Solução com IA

O **DescarteIA utiliza Inteligência Artificial por meio da API do Groq**.

A IA é utilizada para analisar a descrição do material informado pelo usuário e fornecer uma orientação sobre o descarte.

Por exemplo, o usuário pode informar:

> "Tenho uma pilha usada para descartar."

O aplicativo envia essa informação para o sistema, que utiliza a **API do Groq** para processar a solicitação. A Inteligência Artificial analisa o texto e pode retornar informações como:

- Categoria do resíduo;
- Se o material é reciclável;
- Forma correta de descarte;
- Orientação ou dica para o usuário.

A utilização da IA é o diferencial do projeto porque o aplicativo permite que o usuário descreva o material de forma natural. A Inteligência Artificial interpreta essa informação e gera uma resposta com orientações sobre o descarte.

### Como a IA funciona no projeto

O processo funciona da seguinte maneira:

**Usuário → Aplicativo → Backend → API do Groq → Inteligência Artificial → Backend → Aplicativo → Usuário**

O usuário informa o material que deseja descartar. O aplicativo envia essa informação para o **backend desenvolvido em Python com FastAPI**.

O backend envia a descrição para a **API do Groq**, que utiliza um modelo de Inteligência Artificial para analisar a solicitação e gerar uma resposta.

Depois, o backend recebe a resposta da IA e envia as informações de volta para o aplicativo, onde o usuário consegue visualizar a orientação.

O backend também é utilizado para proteger a chave da API, evitando que ela fique exposta diretamente no aplicativo.

Dessa forma, a Inteligência Artificial funciona como uma ferramenta de **análise e orientação**, ajudando o usuário a tomar uma decisão mais adequada sobre o descarte dos resíduos.

---

## Público-Alvo

O público-alvo principal do DescarteIA são **pessoas que possuem dúvidas sobre como descartar corretamente diferentes tipos de resíduos no dia a dia**.

Entre os principais usuários estão:

- **Estudantes:** que desejam aprender mais sobre reciclagem e descarte correto;
- **Famílias:** que precisam saber como descartar diferentes materiais encontrados em casa;
- **Moradores de condomínios:** que precisam separar corretamente os resíduos para a coleta seletiva;
- **Pessoas preocupadas com o meio ambiente:** que querem diminuir os impactos causados pelo descarte incorreto.

O aplicativo foi pensado para ser simples e acessível, permitindo que o usuário informe o material que deseja descartar e receba uma orientação de forma rápida.

Dessa maneira, o **DescarteIA** busca facilitar o acesso à informação e incentivar hábitos mais responsáveis de descarte e reciclagem.

---

## Estrutura do repositório

| Pasta | O que tem |
|---|---|
| `frontend/` | Aplicativo em React + Vite (2 telas: Analisar e Histórico) |
| `backend/` | API em Python + FastAPI, banco (SQLite local ou PostgreSQL na nuvem) e integração com o Groq |
| `docs/` | Diagramas C4, de classes e do banco de dados |

---

## Como rodar o projeto

### 1. Back-end (API)

Precisa de Python 3.12+ e de uma chave gratuita do Groq (https://console.groq.com/keys).

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Preencha `GROQ_API_KEY` no arquivo `.env` e suba a API:

```bash
uvicorn app.main:app --reload
```

A API fica em `http://localhost:8000` e a documentação das rotas em `http://localhost:8000/docs`.

### 2. Front-end (aplicativo)

Precisa do Node.js 18+. Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O app abre em `http://localhost:5173`. A API precisa estar rodando ao mesmo tempo.

---

## Como o aplicativo conversa com a API

O app tem só 2 telas, focadas na função principal:

- **Analisar**: o usuário descreve o resíduo e clica em **Analisar descarte**. O resultado aparece na mesma tela, com o botão **Salvar no histórico**.
- **Histórico**: lista o que já foi salvo e permite limpar a lista.

Toda a comunicação fica no arquivo `frontend/src/api.js`, usando `fetch`, que é a forma nativa do navegador de fazer requisições HTTP:

| Ação no app | Requisição | Rota da API |
|---|---|---|
| Clicar em "Analisar descarte" | `POST` | `/api/classificar` |
| Clicar em "Salvar no histórico" | `POST` | `/api/historico` |
| Abrir a tela Histórico | `GET` | `/api/historico` |
| Clicar em "Limpar histórico" | `DELETE` | `/api/historico` |

Exemplo do que o app envia ao clicar em **Analisar descarte**:

```json
{ "descricao": "pilha velha do controle" }
```

E o que a API devolve depois de consultar a IA do Groq:

```json
{
  "nome": "Pilha do controle",
  "categoria": "Pilha ou bateria",
  "reciclavel": true,
  "descarte": "Leve a um ponto de coleta de pilhas e baterias...",
  "dica": "Guarde as pilhas usadas em um pote fechado até levar ao ponto de coleta.",
  "emoji": "🔋"
}
```

O app nunca fala direto com o Groq. Ele só conversa com a nossa API, e é a API que guarda a chave do Groq e chama a IA. Assim a chave não fica exposta no código do aplicativo.

---

## Deploy na nuvem

O DescarteIA está hospedado em serviços gratuitos:

| Parte | Onde está | Por quê |
|---|---|---|
| API (FastAPI) | **Render** (plano free) | Faz o deploy direto do GitHub e roda Python sem configuração extra |
| Banco de dados | **Supabase** (PostgreSQL, plano free) | Postgres gratuito e com painel pra ver as tabelas pelo navegador |
| IA | **Groq** (plano free) | Já era usada desde a Entrega 3 |
| Aplicativo | Roda no computador ou no celular do usuário | O professor liberou não publicar nas lojas |

Como foi feito:

1. **Banco:** criamos um projeto no Supabase e copiamos a *connection string* do **Session pooler**. A tabela `historico` é criada sozinha pela API no primeiro start (`Base.metadata.create_all`).
2. **API:** no Render, criamos um *Web Service* ligado a este repositório, com a pasta `backend`, o comando de instalação e o comando de start. O arquivo `render.yaml` na raiz guarda essa mesma configuração, pra recriar o serviço se precisar.
3. **Variáveis de ambiente:** no painel do Render cadastramos `GROQ_API_KEY` e `DATABASE_URL`. Elas não ficam no código.
4. **Aplicativo:** o arquivo `frontend/.env.production` aponta o app pra URL pública da API, em vez do `localhost`.

Pra conferir se a API está no ar e conectada no banco da nuvem, basta abrir `/saude`. A resposta mostra `"banco": "postgresql"`.

> ⚠️ No plano gratuito o Render "dorme" depois de uns 15 minutos sem uso. A primeira requisição depois disso pode demorar perto de 1 minuto. Depois volta ao normal.

### Rodando o app apontando pra nuvem

```bash
cd frontend
npm install
npm run build
npm run preview
```

O `build` usa o `.env.production`, então o app já conversa com a API do Render. Pra abrir no celular (mesma rede Wi-Fi), use `npm run celular` e acesse pelo endereço `Network` que aparece no terminal.

---

## O DescarteIA como Software como Serviço (SaaS)

SaaS é quando o usuário usa um software que roda na nuvem, sem precisar instalar nem manter servidor nenhum. Ele só consome o serviço.

No DescarteIA isso acontece assim:

- **O usuário não instala nada além do app.** A IA, a API e o banco ficam na nuvem. Quem usa só abre o aplicativo e descreve o resíduo.
- **A inteligência fica no servidor.** O app não sabe classificar nada sozinho: ele manda a descrição pra API, que consulta o Groq e devolve a resposta.
- **Os dados ficam centralizados.** O histórico é salvo no banco da nuvem, não no aparelho. Se trocar de navegador ou de celular, o histórico continua lá.
- **Atualização sem o usuário fazer nada.** Se melhorarmos o prompt da IA ou corrigirmos um bug na API, basta um novo deploy. Todo mundo passa a usar a versão nova na hora.
- **A chave da IA fica protegida.** Ela está só nas variáveis de ambiente do Render, nunca no aplicativo.

---

## Retrospectiva do semestre

### O que deu certo

- A IA entende o jeito que as pessoas falam ("pet de coca", "pilha do controle") e sempre responde numa das 16 categorias fixas. Se a resposta vier com uma categoria que não existe, a API troca por "Outro".
- Os testes automáticos usam uma IA falsa, então dá pra testar a API inteira sem gastar chamada nem depender da internet.
- API e banco foram pra nuvem sem gastar nada (Render + Supabase no plano gratuito).
- Separar o front em vários arquivos (`api.js`, telas e componentes) deixou cada integrante trabalhar na sua parte sem conflito no Git.

### O que deu errado (ou deu muito trabalho)

- **Trocamos de IA três vezes.** O protótipo usava a Anthropic, que é paga. Passamos pro Gemini, que começou a devolver erro 503 de "alta demanda". Fechamos com o Groq, que é gratuito e respondeu bem.
- **Começamos o back-end em C#** e mudamos pra Python, que é a linguagem que estávamos usando na disciplina.
- **Commits que "não subiam":** o Git de uma das máquinas não tinha nome e e-mail configurados, então o `git commit` falhava e a gente achava que tinha enviado.
- **Banco na nuvem:** no SQLite tudo funcionava, mas no PostgreSQL um texto maior que o tamanho da coluna quebrava o salvamento. Tivemos que mudar os campos longos pra `text`.

### O que planejamos e não deu tempo

| Ideia | Situação |
|---|---|
| Login e cadastro de usuário (classe `Usuario`) | Não feito |
| Pontos de coleta próximos (classe `PontoColeta`) | Não feito |
| Classificar o resíduo por foto | Não feito |

---

## O futuro do DescarteIA

Com mais 6 meses e investimento, os próximos passos seriam:

1. **Classificação por foto:** apontar a câmera e a IA reconhece o resíduo.
2. **Mapa de pontos de coleta:** mostrar o local mais próximo pela localização do celular.
3. **Conta do usuário:** login, histórico pessoal e pontos por descarte correto.
4. **App nas lojas:** versão mobile nativa (React Native) na Play Store e na App Store.
5. **Parcerias com prefeituras e cooperativas:** elas mesmas cadastram pontos e horários de coleta.
6. **Dados para a cidade:** painel mostrando quais resíduos mais geram dúvida em cada região.

---

## Equipe

| Integrante | GitHub |
|---|---|
| Gabriel Rodrigues de Oliveira | [@gabrielroliveira98-cell](https://github.com/gabrielroliveira98-cell) |
| João Pedro Martins Santos (Jotapê) | [@JpMaartins](https://github.com/JpMaartins) |
| Larissa | [@LarissaOliveira245](https://github.com/LarissaOliveira245) |
| Naylson | [@naylson02](https://github.com/naylson02) |
| Renato | [@renatomauad-star](https://github.com/renatomauad-star) |
| Roberthy | [@roberthyassun-DEV](https://github.com/roberthyassun-DEV) |
| Artur | [@Amaral011](https://github.com/Amaral011) |
