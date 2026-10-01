# Arquitetura - DescarteIA

```
Usuário -> Frontend (React) -> Backend (FastAPI) -> Groq API
                                     |
                              histórico (SQLite)
```

O front não fala com a Groq direto. Antes a chamada era feita do navegador
mesmo, mas isso expunha a chave da IA pra qualquer um que abrisse o código do
site. Agora o front só conversa com o backend, e é o backend que guarda a
chave (no `.env`, fora do git) e faz a chamada pra Groq.

O histórico também mudou de lugar: antes ficava salvo no `localStorage` do
navegador, então cada aparelho tinha o seu próprio histórico, sem nenhum jeito
de ver tudo num lugar só. Agora fica salvo no backend, numa tabela só
(`historico`).

O front continua sendo o mesmo app React de antes - só trocamos pra onde ele
manda as requisições. Nada na tela mudou.
