# DescarteIA

## 🎯 ODS Escolhido
**ODS 12 – Consumo e Produção Responsáveis**

Escolhemos esse ODS porque ele fala sobre reduzir o desperdício e melhorar a forma como a gente descarta o que produz. É basicamente o problema que o nosso app resolve: ajudar as pessoas a descartar o lixo do jeito certo, sem gerar mais resíduo do que precisa e sem contaminar o que poderia ser reciclado.

## 🚨 O Problema Real
Muita gente não sabe onde jogar cada tipo de lixo. Pilha, eletrônico, óleo de cozinha, isopor, plástico, papelão sujo de comida... cada coisa tem um jeito certo de descartar, mas ninguém sabe na hora, e a informação é difícil de achar (geralmente só existe em site de prefeitura, difícil de encontrar, ou espalhada em vários lugares diferentes).

Isso causa alguns problemas no dia a dia:
- Lixo reciclável se mistura com lixo comum e acaba estragando o lote inteiro (não dá mais pra reciclar depois).
- Coisas perigosas, como pilha, remédio vencido e eletrônico, são jogadas no lixo comum e acabam poluindo o solo e a água.
- Aterros sanitários ficam mais cheios do que precisavam, porque muita coisa que era pra ser reciclada ou reaproveitada vai parar lá.
- As pessoas até têm boa vontade de descartar certo, mas desistem porque é complicado descobrir como.

## 🤖 A Solução com IA
O DescarteIA usa a IA (API do Google Gemini) como o "cérebro" do app, pra tirar a dúvida do usuário na hora:

1. O usuário descreve o item que quer jogar fora.
2. A IA identifica que tipo de resíduo é aquilo (reciclável, orgânico, perigoso, eletrônico, etc.).
3. A IA explica pro usuário onde e como descartar aquilo certinho (ponto de coleta, ecoponto, cooperativa, lixo comum mesmo, etc.), de um jeito simples e direto.
4. O app guarda um histórico das classificações que o usuário já fez, então dá pra ele ver quantas vezes descartou certo e ter noção do próprio impacto.

A ideia central é resolver na hora aquela dúvida clássica de "onde eu jogo isso?", sem precisar pesquisar no Google, perguntar em grupo de WhatsApp ou simplesmente jogar no lixo comum por não saber.

## 📱 Como o App Funciona

O DescarteIA é bem direto ao ponto: o usuário abre o app, digita (ou descreve) o que ele quer descartar, e a IA responde na hora com a classificação e a orientação correta. Não tem cadastro complicado nem monte de telas — o foco é resolver a dúvida rápido.

**Passo a passo de uso:**

1. **Tela inicial**: o usuário vê um campo simples tipo "O que você quer descartar hoje?" e digita algo, tipo "pilha usada" ou "garrafa pet".
2. **Classificação pela IA**: o app manda essa descrição pra IA (via API do Gemini), que analisa o item e identifica a categoria dele — reciclável, orgânico, resíduo perigoso, eletrônico, etc.
3. **Resposta com orientação**: a IA devolve uma explicação simples de como descartar aquilo certo (ex: "pilhas não vão no lixo comum, procure um ponto de coleta de eletrônicos ou supermercados que aceitam pilhas usadas").
4. **Histórico salvo**: toda consulta que o usuário faz fica guardada no histórico do app, então ele consegue ver depois tudo que já pesquisou e como descartou.
5. **Acompanhamento**: com o tempo, o usuário consegue enxergar quantos itens já classificou certo, criando um hábito mais consciente de descarte.

**Por trás dos panos (tecnicamente):**

- O front-end é feito em **React**, com uma interface simples e responsiva pra funcionar bem tanto no celular quanto no navegador.
- A parte de "inteligência" do app é feita chamando a **API do Google Gemini**, que recebe a descrição do item e devolve a classificação + orientação de descarte em linguagem natural. Usamos o Gemini porque tem uma camada gratuita generosa (sem cartão de crédito e sem prazo de expiração), ideal pra um projeto acadêmico.
- A chave da API é guardada em variável de ambiente (`.env`), nunca commitada no repositório.
- O histórico das consultas é salvo localmente no navegador do usuário (local storage), então mesmo sem um banco de dados complexo, o usuário não perde o que já pesquisou.
- A estrutura do sistema foi pensada em POO (Programação Orientada a Objetos), com entidades bem definidas como Usuário, Consulta, ClassificadorIA, ItemResiduo, CategoriaResiduo e OrientacaoDescarte — isso facilita expandir o app no futuro (por exemplo, adicionando reconhecimento de imagem em vez de só texto, ou um back-end dedicado com banco de dados).

No fim das contas, o app funciona como um "assistente de bolso" pra descarte de lixo: você não precisa saber as regras de reciclagem de cor, só precisa perguntar.

## 👥 Público-Alvo
- Pessoas que moram em cidade e não sabem separar o lixo direito no dia a dia.
- Estudantes e famílias que querem ajudar o meio ambiente mas não têm essa informação na mão.
- Condomínios e síndicos que querem melhorar a coleta seletiva do prédio.
- Cooperativas de reciclagem, que passam a receber material mais limpo, separado e organizado.
- Prefeituras e órgãos ambientais, que no futuro poderiam usar dados do app pra entender onde tem mais descarte errado na cidade.

## 💡 Por que esse projeto faz diferença
Hoje em dia quase todo mundo tem celular, mas quase ninguém tem por hábito consultar informação de descarte antes de jogar algo fora — é rápido demais, e a pessoa já jogou no lixo comum antes de parar pra pensar. O DescarteIA tenta encaixar essa consulta no momento exato da dúvida, tornando o processo tão simples quanto perguntar e receber a resposta na hora, o que aumenta a chance real de mudança de comportamento.
png)
