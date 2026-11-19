import { useEffect, useState } from "react";
import { ArrowLeft, ChevronRight, Trash2 } from "lucide-react";
import { buscarHistorico, limparHistorico } from "../api.js";
import { estiloDaCategoria } from "../estilosCategoria.js";
import CardResultado from "../componentes/CardResultado.jsx";

export default function TelaHistorico() {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [selecionado, setSelecionado] = useState(null);

  useEffect(() => {
    buscarHistorico()
      .then(setItens)
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, []);

  async function limpar() {
    try {
      await limparHistorico();
      setItens([]);
    } catch (err) {
      setErro(err.message);
    }
  }

  if (selecionado) {
    return (
      <div className="screen tela-historico">
        <button className="voltar-btn" onClick={() => setSelecionado(null)}>
          <ArrowLeft size={16} />
          Voltar para o histórico
        </button>
        <CardResultado resultado={selecionado} />
      </div>
    );
  }

  return (
    <div className="screen tela-historico">
      <div className="historico-topo">
        <h1 className="historico-titulo">Histórico</h1>
        {itens.length > 0 && (
          <button className="limpar-btn" onClick={limpar}>
            Limpar histórico
          </button>
        )}
      </div>

      {erro && <p className="historico-erro">{erro}</p>}

      {carregando ? (
        <p className="historico-vazio">Carregando…</p>
      ) : itens.length === 0 ? (
        <div className="historico-vazio-box">
          <Trash2 size={26} color="#A9B6AA" />
          <p className="historico-vazio">Nada por aqui ainda. Analise um resíduo e salve para começar seu histórico.</p>
        </div>
      ) : (
        <ul className="historico-lista">
          {itens.map((item) => (
            <li key={item.id}>
              <button className="historico-linha" onClick={() => setSelecionado(item)}>
                <span className="historico-emoji" style={{ background: estiloDaCategoria(item.categoria).bg }}>
                  {item.emoji || "♻️"}
                </span>
                <span className="historico-texto">
                  <span className="historico-nome">{item.nome}</span>
                  <span className="historico-cat">{item.categoria}</span>
                </span>
                <ChevronRight size={16} color="#A9B6AA" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .tela-historico { padding: 8px 20px 28px; }
        .historico-topo { display:flex; align-items:center; justify-content:space-between; margin:10px 0 16px; }
        .historico-titulo { font-family:'Space Grotesk', sans-serif; font-weight:700; font-size:22px; color:#12241B; margin:0; }
        .limpar-btn { border:none; background:none; font-family:'Inter', sans-serif; font-size:12px; font-weight:600; color:#B4462F; cursor:pointer; }
        .limpar-btn:hover { text-decoration:underline; }
        .historico-erro { font-size:12px; color:#B4462F; }
        .historico-vazio-box { display:flex; flex-direction:column; align-items:center; gap:12px; padding:60px 20px; text-align:center; }
        .historico-vazio { font-size:13px; color:#7C8B7E; margin:0; line-height:1.5; }
        .historico-lista { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:8px; }
        .historico-linha { width:100%; display:flex; align-items:center; gap:12px; background:#FFFFFF; border:1px solid #E3E9DE; border-radius:14px; padding:11px 13px; cursor:pointer; text-align:left; }
        .historico-linha:hover { border-color:#C8D8C6; }
        .historico-emoji { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:17px; flex-shrink:0; }
        .historico-texto { flex:1; display:flex; flex-direction:column; gap:1px; min-width:0; }
        .historico-nome { font-family:'Inter', sans-serif; font-weight:600; font-size:13.5px; color:#1E2A20; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .historico-cat { font-family:'Inter', sans-serif; font-size:11.5px; color:#8A9A8C; }
        .voltar-btn { display:flex; align-items:center; gap:6px; margin-top:10px; border:none; background:#EEF3EA; color:#1C3D2E; font-family:'Inter', sans-serif; font-weight:600; font-size:12.5px; padding:8px 12px; border-radius:10px; cursor:pointer; }
      `}</style>
    </div>
  );
}
