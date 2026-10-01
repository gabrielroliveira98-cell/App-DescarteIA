def test_cria_descarte(client):
    response = client.post("/descartes", json={"descricao_informada": "pilha velha do controle"})
    assert response.status_code == 201
    body = response.json()
    assert body["status"] == "PENDENTE"
    assert body["classificacao"] is None


def test_classifica_descarte_com_ia_fake(client):
    criado = client.post("/descartes", json={"descricao_informada": "garrafa pet vazia"}).json()

    response = client.post(f"/descartes/{criado['id']}/classificar")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "CLASSIFICADO"
    assert body["classificacao"]["categoria"] == "Plástico"
    assert body["classificacao"]["reciclavel"] is True


def test_nao_classifica_duas_vezes(client):
    criado = client.post("/descartes", json={"descricao_informada": "lampada queimada"}).json()
    client.post(f"/descartes/{criado['id']}/classificar")

    segunda_tentativa = client.post(f"/descartes/{criado['id']}/classificar")
    assert segunda_tentativa.status_code == 409


def test_obter_descarte_inexistente_retorna_404(client):
    response = client.get("/descartes/9999")
    assert response.status_code == 404


def test_consulta_descarte_ja_classificado(client):
    criado = client.post("/descartes", json={"descricao_informada": "lata de aluminio"}).json()
    client.post(f"/descartes/{criado['id']}/classificar")

    response = client.get(f"/descartes/{criado['id']}")
    assert response.status_code == 200
    assert response.json()["classificacao"]["nome_residuo"] == "Garrafa PET"
