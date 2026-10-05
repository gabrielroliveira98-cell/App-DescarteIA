# DescarteIA

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
