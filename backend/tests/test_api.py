def test_classifica_residuo(client):
    response = client.post("/api/classificar", json={"descricao": "garrafa pet vazia"})
    assert response.status_code == 200
    body = response.json()
    assert body["categoria"] == "Plástico"
    assert body["reciclavel"] is True


def test_salva_e_lista_historico(client):
    classificacao = client.post("/api/classificar", json={"descricao": "garrafa pet vazia"}).json()

    salvo = client.post(
        "/api/historico",
        json={"descricao": "garrafa pet vazia", **classificacao},
    )
    assert salvo.status_code == 201

    lista = client.get("/api/historico")
    assert lista.status_code == 200
    assert len(lista.json()) == 1
    assert lista.json()[0]["categoria"] == "Plástico"


def test_limpa_historico(client):
    classificacao = client.post("/api/classificar", json={"descricao": "pilha velha"}).json()
    client.post("/api/historico", json={"descricao": "pilha velha", **classificacao})

    limpar = client.delete("/api/historico")
    assert limpar.status_code == 204

    lista = client.get("/api/historico")
    assert lista.json() == []
