import { useState } from "react";
import { Leaf, Sparkles } from "lucide-react";
import { classificarResiduo, salvarNoHistorico } from "../api.js";
import CardResultado from "../componentes/CardResultado.jsx";

const EXEMPLOS = ["garrafa de refrigerante", "pilha velha", "caixa de papelão", "lâmpada queimada", "celular velho"];

export default function TelaAnalisar() {
  const [descricao, setDescricao] = useState("");
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [salvo, setSalvo] = useState(false);

  async function analisar(e) {
    e.preventDefault();
    setErro("");
    setResultado(null);
    setSalvo(false);
    setCarregando(true);
    try {
      const resposta = await classificarResiduo(descricao.trim());
      setResultado({ ...resposta, descricao: descricao.trim() });
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  async function salvar() {
    try {
      await salvarNoHistorico(resultado.descricao, resultado);
      setSalvo(true);
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div className="screen tela-analisar">
      <div className="hero">
        <div className="hero-marca">
          <Leaf size={22} />
        </div>
        <h1 className="hero-titulo">DescarteIA</h1>
        <p className="hero-sub">Descubra o destino certo para qualquer resíduo. Sem foto, só descreva.</p>
      </div>

      <form className="form-card" onSubmit={analisar}>
        <label className="form-label" htmlFor="descricao">O que você deseja descartar?</label>
        <textarea
          id="descricao"
          className="form-input"
          placeholder='Ex: "tenho uma pilha velha" ou "onde jogo uma lâmpada queimada?"'
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={3}
        />
        <button className="analisar-btn" type="submit" disabled={carregando || descricao.trim().length < 3}>
          {carregando ? (
            "Analisando..."
          ) : (
            <>
              <Sparkles size={16} />
              Analisar descarte
            </>
          )}
        </button>
        {erro && <p className="form-erro">{erro}</p>}
      </form>

      {resultado ? (
        <CardResultado resultado={resultado} onSalvar={salvar} salvo={salvo} />
      ) : (
        <div className="exemplos">
          <span className="exemplos-label">Experimente</span>
          <div className="chips">
            {EXEMPLOS.map((ex) => (
              <button key={ex} type="button" className="chip" onClick={() => setDescricao(ex)}>
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .tela-analisar { padding: 8px 20px 28px; }
        .hero { text-align:center; padding: 18px 8px 22px; }
        .hero-marca { width:48px; height:48px; margin:0 auto 14px; border-radius:14px; background:linear-gradient(155deg, #1C3D2E, #2E5B41); color:#DDF2E4; display:flex; align-items:center; justify-content:center; }
        .hero-titulo { font-family:'Space Grotesk', sans-serif; font-weight:700; font-size:24px; color:#12241B; margin:0 0 6px; }
        .hero-sub { font-size:13px; line-height:1.5; color:#5B6B5F; margin:0; padding:0 8px; }

        .form-card { background:#FFFFFF; border:1px solid #E3E9DE; border-radius:20px; padding:16px; }
        .form-label { display:block; font-weight:600; font-size:12px; color:#1C3D2E; margin-bottom:8px; }
        .form-input { width:100%; resize:none; border:1px solid #DCE4D7; border-radius:12px; padding:12px 13px; font-family:'Inter', sans-serif; font-size:14px; color:#1E2A20; background:#FAFBF8; box-sizing:border-box; }
        .form-input:focus-visible { outline:none; border-color:#52A37C; box-shadow:0 0 0 3px rgba(82,163,124,0.18); }
        .analisar-btn { width:100%; margin-top:12px; height:44px; border:none; border-radius:12px; background:#1C3D2E; color:#EFF7EF; font-family:'Inter', sans-serif; font-weight:600; font-size:14px; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; }
        .analisar-btn:hover:not(:disabled) { background:#234A38; }
        .analisar-btn:disabled { opacity:0.55; cursor:not-allowed; }
        .form-erro { margin:10px 2px 0; font-size:12px; color:#B4462F; }

        .exemplos { margin-top:22px; }
        .exemplos-label { font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:#8A9A8C; }
        .chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }
        .chip { border:1px solid #DCE4D7; background:#FFFFFF; color:#31432F; font-family:'Inter', sans-serif; font-size:12px; padding:8px 12px; border-radius:999px; cursor:pointer; }
        .chip:hover { border-color:#52A37C; color:#1C3D2E; }
      `}</style>
    </div>
  );
}
