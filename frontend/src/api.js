const API_URL = "http://localhost:8000";

async function lerErro(res, mensagemPadrao) {
  const corpo = await res.json().catch(() => ({}));
  return new Error(corpo.detail || mensagemPadrao);
}

export async function classificarResiduo(descricao) {
  const res = await fetch(`${API_URL}/api/classificar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descricao }),
  });
  if (!res.ok) throw await lerErro(res, "Não consegui classificar o resíduo.");
  return res.json();
}

export async function salvarNoHistorico(descricao, classificacao) {
  const res = await fetch(`${API_URL}/api/historico`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descricao, ...classificacao }),
  });
  if (!res.ok) throw await lerErro(res, "Não consegui salvar no histórico.");
  return res.json();
}

export async function buscarHistorico() {
  const res = await fetch(`${API_URL}/api/historico`);
  if (!res.ok) throw await lerErro(res, "Não consegui carregar o histórico.");
  return res.json();
}

export async function limparHistorico() {
  const res = await fetch(`${API_URL}/api/historico`, { method: "DELETE" });
  if (!res.ok) throw await lerErro(res, "Não consegui limpar o histórico.");
}
