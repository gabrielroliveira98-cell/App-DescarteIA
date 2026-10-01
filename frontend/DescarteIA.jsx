import React, { useState, useEffect, useRef } from "react";
import { Leaf, Search, History, ArrowLeft, Recycle, AlertTriangle, Sparkles, Trash2, ChevronRight } from "lucide-react";

// ---------- Helpers ----------

const CATEGORY_STYLES = {
  Plástico: { bg: "#E7F3EC", fg: "#1C3D2E", ring: "#52A37C" },
  Vidro: { bg: "#E9F5F1", fg: "#0F3D33", ring: "#2FA88C" },
  Metal: { bg: "#EEF2F5", fg: "#2B3A45", ring: "#7C93A6" },
  Papel: { bg: "#F2F0E6", fg: "#4A3F25", ring: "#B79A56" },
  Papelão: { bg: "#F2F0E6", fg: "#4A3F25", ring: "#B79A56" },
  Orgânico: { bg: "#F1F5E4", fg: "#3B4A1E", ring: "#8AA34C" },
  Rejeito: { bg: "#EFEFEF", fg: "#33362F", ring: "#9A9A8F" },
  Eletrônico: { bg: "#F0EDF7", fg: "#3A2E5C", ring: "#8B72C9" },
  "Pilha ou bateria": { bg: "#FDECEC", fg: "#7A1F1F", ring: "#D9534F" },
  Lâmpada: { bg: "#FFF8E1", fg: "#6B4E00", ring: "#E0B84B" },
  "Resíduo de saúde": { bg: "#FDEDF0", fg: "#7A1030", ring: "#D9578E" },
  "Óleo de cozinha": { bg: "#F3EDE3", fg: "#4A3418", ring: "#A9793C" },
  "Resíduo perigoso": { bg: "#FFF1E0", fg: "#7A3B00", ring: "#E08A2B" },
  Volumoso: { bg: "#EFEDF5", fg: "#3A3550", ring: "#8A80B0" },
  Têxtil: { bg: "#EAF2F5", fg: "#1E3A45", ring: "#5C93A6" },
  "Resíduo especial": { bg: "#FBF0E2", fg: "#5C3B12", ring: "#D9A05B" },
  Outro: { bg: "#F0F0EE", fg: "#33362F", ring: "#9A9A8F" },
};

function styleFor(category) {
  return CATEGORY_STYLES[category] || CATEGORY_STYLES.Outro;
}

async function classifyResidue(query) {
  const system = `Você é o motor de classificação do DescarteIA, um app que ajuda pessoas a identificar resíduos e descobrir a forma correta de descarte no Brasil.

Reconheça o resíduo mesmo quando o usuário usar nomes populares, abreviações, erros de digitação ou descrições informais (ex: "pet de coca" = Garrafa PET, "latinha" = lata de alumínio, "pilha do controle" = pilha). Considere o contexto da frase inteira, não apenas uma palavra isolada.

Classifique sempre em UMA destas categorias:
- Papel (papel sulfite, caderno, jornal, revista, cartolina, envelope, folheto, livro, papel de presente)
- Papelão (caixa de papelão, caixa de cereal, papelão de mudança) — não recicláveis se muito contaminados com gordura ou alimentos
- Plástico (garrafa PET, potes, copos, sacolas, tampas, PVC, embalagens, brinquedos)
- Vidro (garrafas, potes, frascos — alerte para acondicionar cacos quebrados com segurança)
- Metal (latas, alumínio, panelas, pregos, parafusos, ferragens, sucata)
- Orgânico (restos de comida, cascas, borra de café, ossos, folhas, galhos pequenos)
- Rejeito (papel higiênico usado, guardanapo contaminado, fralda, absorvente, esponja — sem aproveitamento na coleta seletiva comum)
- Eletrônico (celular, computador, TV, cabos, carregadores, controles, consoles — NUNCA na coleta reciclável comum, indicar ponto de coleta de e-lixo)
- Pilha ou bateria (pilhas, baterias de qualquer tipo — NUNCA lixo comum ou reciclável, indicar ponto de coleta específico)
- Lâmpada (LED, fluorescente, incandescente — indicar ponto de coleta apropriado)
- Resíduo de saúde (seringas, agulhas, medicamentos vencidos, curativos — indicar farmácia, unidade de saúde ou coleta apropriada)
- Óleo de cozinha (óleo de fritura usado — nunca jogar na pia ou vaso sanitário; armazenar em recipiente fechado e levar a ponto de coleta)
- Resíduo perigoso (tinta, solvente, produtos químicos concentrados, inseticidas, inflamáveis — orientação específica, não é reciclável comum)
- Volumoso (móveis, colchão, sofá, eletrodomésticos grandes — indicar coleta de volumosos, ecoponto ou serviço municipal)
- Têxtil (roupas, calçados, tecidos, toalhas, lençóis — sugerir doação se em bom estado, ou ponto de coleta têxtil)
- Outro (quando nenhuma categoria acima se aplicar claramente)

Lembre-se: material reciclável e local correto de descarte são coisas diferentes. Uma garrafa PET é plástico reciclável comum; já um celular é eletrônico e precisa de ponto de coleta específico, mesmo contendo materiais recicláveis.

Nunca invente informação. Se a descrição for vaga demais para identificar o resíduo com confiança, ainda assim responda com o JSON abaixo usando categoria "Outro", e escreva no campo "descarte" uma pergunta simples e objetiva pedindo mais detalhes (ex: material, formato ou uso do objeto) em vez de uma instrução de descarte.

Responda APENAS com um JSON válido, sem markdown, sem texto extra, no formato exato:
{
  "nome": "Nome curto do resíduo (ex: Garrafa PET)",
  "categoria": "uma das categorias listadas acima",
  "reciclavel": true ou false,
  "descarte": "1-2 frases objetivas explicando como descartar corretamente no Brasil (ou a pergunta de esclarecimento, se aplicável)",
  "dica": "1 frase curta com uma dica ou cuidado extra",
  "emoji": "um único emoji que represente o resíduo"
}
Use linguagem simples, sem termos técnicos, para que qualquer pessoa entenda.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: query }],
    }),
  });

  const data = await response.json();
  const textBlock = data?.content?.find((b) => b.type === "text");
  const raw = (textBlock?.text || "").trim();
  const cleaned = raw.replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
  return JSON.parse(cleaned);
}

// ---------- Small UI pieces ----------

function TopBar({ title, onBack }) {
  return (
    <div className="topbar">
      {onBack ? (
        <button className="icon-btn" onClick={onBack} aria-label="Voltar">
          <ArrowLeft size={18} />
        </button>
      ) : (
        <div className="brandmark">
          <Leaf size={16} />
        </div>
      )}
      <span className="topbar-title">{title}</span>
      <div style={{ width: 32 }} />
      <style>{`
        .topbar { display:flex; align-items:center; gap:10px; padding:14px 16px; }
        .topbar-title { flex:1; text-align:center; font-family:'Space Grotesk', sans-serif; font-weight:600; font-size:14px; letter-spacing:0.02em; color:#1C3D2E; }
        .icon-btn { width:32px; height:32px; border-radius:10px; border:none; background:#EEF3EA; color:#1C3D2E; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .15s ease; }
        .icon-btn:hover { background:#E1EBDD; }
        .icon-btn:focus-visible { outline:2px solid #52A37C; outline-offset:2px; }
        .brandmark { width:32px; height:32px; border-radius:10px; background:#1C3D2E; color:#EFF7EF; display:flex; align-items:center; justify-content:center; }
      `}</style>
    </div>
  );
}

// ---------- Screens ----------

function HomeScreen({ query, setQuery, onAnalyze, loading, error, examples }) {
  return (
    <div className="screen home-screen">
      <div className="hero">
        <div className="hero-mark">
          <Leaf size={22} />
        </div>
        <h1 className="hero-title">DescarteIA</h1>
        <p className="hero-sub">Descubra o destino certo para qualquer resíduo. Sem foto — só descreva.</p>
      </div>

      <form
        className="query-card"
        onSubmit={(e) => {
          e.preventDefault();
          onAnalyze();
        }}
      >
        <label className="query-label" htmlFor="residue-input">O que você deseja descartar?</label>
        <textarea
          id="residue-input"
          className="query-input"
          placeholder='Ex: "tenho uma pilha velha" ou "onde jogo uma lâmpada queimada?"'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={3}
        />
        <button className="analyze-btn" type="submit" disabled={loading || !query.trim()}>
          {loading ? (
            <span className="btn-loading">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </span>
          ) : (
            <>
              <Sparkles size={16} />
              Analisar descarte
            </>
          )}
        </button>
        {error && <p className="query-error">{error}</p>}
      </form>

      <div className="examples">
        <span className="examples-label">Experimente</span>
        <div className="chip-row">
          {examples.map((ex) => (
            <button key={ex} type="button" className="chip" onClick={() => setQuery(ex)}>
              {ex}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .home-screen { padding: 8px 20px 28px; }
        .hero { text-align:center; padding: 18px 8px 22px; }
        .hero-mark { width:48px; height:48px; margin:0 auto 14px; border-radius:14px; background:linear-gradient(155deg, #1C3D2E, #2E5B41); color:#DDF2E4; display:flex; align-items:center; justify-content:center; box-shadow: 0 8px 20px -8px rgba(28,61,46,0.55); }
        .hero-title { font-family:'Space Grotesk', sans-serif; font-weight:700; font-size:24px; letter-spacing:-0.01em; color:#12241B; margin:0 0 6px; }
        .hero-sub { font-family:'Inter', sans-serif; font-size:13px; line-height:1.5; color:#5B6B5F; margin:0; padding:0 8px; }

        .query-card { background:#FFFFFF; border:1px solid #E3E9DE; border-radius:20px; padding:16px; box-shadow: 0 12px 30px -18px rgba(28,61,46,0.28); }
        .query-label { display:block; font-family:'Inter', sans-serif; font-weight:600; font-size:12px; color:#1C3D2E; margin-bottom:8px; }
        .query-input { width:100%; resize:none; border:1px solid #DCE4D7; border-radius:12px; padding:12px 13px; font-family:'Inter', sans-serif; font-size:14px; color:#1E2A20; background:#FAFBF8; box-sizing:border-box; transition:border-color .15s ease, box-shadow .15s ease; }
        .query-input:focus-visible { outline:none; border-color:#52A37C; box-shadow:0 0 0 3px rgba(82,163,124,0.18); }
        .analyze-btn { width:100%; margin-top:12px; height:44px; border:none; border-radius:12px; background:#1C3D2E; color:#EFF7EF; font-family:'Inter', sans-serif; font-weight:600; font-size:14px; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; transition:transform .12s ease, background .15s ease; }
        .analyze-btn:hover:not(:disabled) { background:#234A38; }
        .analyze-btn:active:not(:disabled) { transform: scale(0.98); }
        .analyze-btn:disabled { opacity:0.55; cursor:not-allowed; }
        .analyze-btn:focus-visible { outline:2px solid #52A37C; outline-offset:2px; }
        .query-error { margin:10px 2px 0; font-family:'Inter', sans-serif; font-size:12px; color:#B4462F; }

        .btn-loading { display:flex; gap:4px; }
        .btn-loading .dot { width:5px; height:5px; border-radius:50%; background:#EFF7EF; animation: blink 1.1s infinite ease-in-out; }
        .btn-loading .dot:nth-child(2) { animation-delay:0.15s; }
        .btn-loading .dot:nth-child(3) { animation-delay:0.3s; }
        @keyframes blink { 0%, 80%, 100% { opacity:0.25; } 40% { opacity:1; } }

        .examples { margin-top:22px; }
        .examples-label { font-family:'Inter', sans-serif; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:#8A9A8C; }
        .chip-row { display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }
        .chip { border:1px solid #DCE4D7; background:#FFFFFF; color:#31432F; font-family:'Inter', sans-serif; font-size:12px; padding:8px 12px; border-radius:999px; cursor:pointer; transition:border-color .15s ease, color .15s ease; }
        .chip:hover { border-color:#52A37C; color:#1C3D2E; }
        .chip:focus-visible { outline:2px solid #52A37C; outline-offset:2px; }

        @media (prefers-reduced-motion: reduce) {
          .btn-loading .dot { animation:none; opacity:1; }
        }
      `}</style>
    </div>
  );
}

function ResultScreen({ result, onBack, onSave, saved }) {
  if (!result) return null;
  const s = styleFor(result.categoria);
  return (
    <div className="screen result-screen">
      <TopBar title="Resultado" onBack={onBack} />
      <div className="result-body">
        <div className="result-badge" style={{ background: s.bg, color: s.fg, boxShadow: `0 0 0 1px ${s.ring}33 inset` }}>
          <span className="result-emoji">{result.emoji || "♻️"}</span>
        </div>
        <h2 className="result-name">{result.nome}</h2>
        <span className="result-category" style={{ background: s.bg, color: s.fg }}>{result.categoria}</span>

        <div className={`recyclable-pill ${result.reciclavel ? "yes" : "no"}`}>
          {result.reciclavel ? <Recycle size={14} /> : <AlertTriangle size={14} />}
          {result.reciclavel ? "Reciclável" : "Requer descarte especial"}
        </div>

        <div className="info-block">
          <span className="info-label">Como descartar</span>
          <p className="info-text">{result.descarte}</p>
        </div>

        {result.dica && (
          <div className="info-block tip-block">
            <span className="info-label">Dica</span>
            <p className="info-text">{result.dica}</p>
          </div>
        )}

        <button className="save-btn" onClick={onSave} disabled={saved}>
          <History size={15} />
          {saved ? "Salvo no histórico" : "Salvar no histórico"}
        </button>
      </div>

      <style>{`
        .result-body { padding: 6px 20px 28px; text-align:center; }
        .result-badge { width:72px; height:72px; margin:8px auto 16px; border-radius:20px; display:flex; align-items:center; justify-content:center; }
        .result-emoji { font-size:32px; line-height:1; }
        .result-name { font-family:'Space Grotesk', sans-serif; font-weight:700; font-size:21px; color:#12241B; margin:0 0 8px; }
        .result-category { display:inline-block; font-family:'Inter', sans-serif; font-weight:600; font-size:11px; padding:5px 11px; border-radius:999px; margin-bottom:14px; }

        .recyclable-pill { display:flex; align-items:center; justify-content:center; gap:6px; width:fit-content; margin:0 auto 20px; padding:8px 14px; border-radius:999px; font-family:'Inter', sans-serif; font-weight:600; font-size:12px; }
        .recyclable-pill.yes { background:#E5F5EA; color:#1E6B3F; }
        .recyclable-pill.no { background:#FCEFE1; color:#9A5A17; }

        .info-block { text-align:left; background:#FFFFFF; border:1px solid #E3E9DE; border-radius:16px; padding:14px 16px; margin-bottom:12px; }
        .tip-block { background:#FBF7EC; border-color:#EFE3C4; }
        .info-label { display:block; font-family:'Inter', sans-serif; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.05em; color:#8A9A8C; margin-bottom:6px; }
        .tip-block .info-label { color:#A98C3F; }
        .info-text { margin:0; font-family:'Inter', sans-serif; font-size:13.5px; line-height:1.55; color:#2A362B; }

        .save-btn { width:100%; margin-top:8px; height:44px; border-radius:12px; border:1px solid #1C3D2E; background:#FFFFFF; color:#1C3D2E; font-family:'Inter', sans-serif; font-weight:600; font-size:13.5px; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; transition:background .15s ease, color .15s ease; }
        .save-btn:hover:not(:disabled) { background:#1C3D2E; color:#EFF7EF; }
        .save-btn:disabled { opacity:0.55; cursor:default; }
        .save-btn:focus-visible { outline:2px solid #52A37C; outline-offset:2px; }
      `}</style>
    </div>
  );
}

function HistoryScreen({ items, onBack, onOpen, loadingList }) {
  return (
    <div className="screen history-screen">
      <TopBar title="Histórico" onBack={onBack} />
      <div className="history-body">
        {loadingList ? (
          <p className="history-empty">Carregando…</p>
        ) : items.length === 0 ? (
          <div className="history-empty-wrap">
            <Trash2 size={26} color="#A9B6AA" />
            <p className="history-empty">Nada por aqui ainda. Analise um resíduo para começar seu histórico.</p>
          </div>
        ) : (
          <ul className="history-list">
            {items.map((item, i) => {
              const s = styleFor(item.categoria);
              return (
                <li key={i}>
                  <button className="history-row" onClick={() => onOpen(item)}>
                    <span className="history-emoji" style={{ background: s.bg }}>{item.emoji || "♻️"}</span>
                    <span className="history-text">
                      <span className="history-name">{item.nome}</span>
                      <span className="history-cat">{item.categoria}</span>
                    </span>
                    <ChevronRight size={16} color="#A9B6AA" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <style>{`
        .history-body { padding: 4px 20px 28px; }
        .history-empty-wrap { display:flex; flex-direction:column; align-items:center; gap:12px; padding:60px 20px; text-align:center; }
        .history-empty { font-family:'Inter', sans-serif; font-size:13px; color:#7C8B7E; margin:0; line-height:1.5; }
        .history-list { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:8px; }
        .history-row { width:100%; display:flex; align-items:center; gap:12px; background:#FFFFFF; border:1px solid #E3E9DE; border-radius:14px; padding:11px 13px; cursor:pointer; text-align:left; transition:border-color .15s ease; }
        .history-row:hover { border-color:#C8D8C6; }
        .history-row:focus-visible { outline:2px solid #52A37C; outline-offset:2px; }
        .history-emoji { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:17px; flex-shrink:0; }
        .history-text { flex:1; display:flex; flex-direction:column; gap:1px; min-width:0; }
        .history-name { font-family:'Inter', sans-serif; font-weight:600; font-size:13.5px; color:#1E2A20; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .history-cat { font-family:'Inter', sans-serif; font-size:11.5px; color:#8A9A8C; }
      `}</style>
    </div>
  );
}

// ---------- Root ----------

export default function DescarteIA() {
  const [screen, setScreen] = useState("home"); // home | result | history
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [saved, setSaved] = useState(false);
  const scrollRef = useRef(null);

  const examples = [
    "garrafa de refrigerante",
    "pilha velha",
    "caixa de papelão",
    "lâmpada queimada",
    "celular velho",
  ];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [screen]);

  async function loadHistory() {
    setLoadingList(true);
    try {
      const res = await window.storage.list("descarteia:item:");
      const keys = res?.keys || [];
      const entries = await Promise.all(
        keys.map(async (k) => {
          try {
            const r = await window.storage.get(k);
            return r ? JSON.parse(r.value) : null;
          } catch {
            return null;
          }
        })
      );
      const valid = entries.filter(Boolean).sort((a, b) => (b.ts || 0) - (a.ts || 0));
      setHistory(valid);
    } catch {
      setHistory([]);
    } finally {
      setLoadingList(false);
    }
  }

  async function handleAnalyze() {
    setError("");
    setLoading(true);
    setSaved(false);
    try {
      const parsed = await classifyResidue(query.trim());
      setResult(parsed);
      setScreen("result");
    } catch (e) {
      setError("Não consegui interpretar agora. Tente descrever de outra forma.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!result) return;
    const entry = { ...result, ts: Date.now() };
    try {
      await window.storage.set(`descarteia:item:${entry.ts}`, JSON.stringify(entry));
      setSaved(true);
    } catch {
      setError("Não consegui salvar no histórico agora.");
    }
  }

  function openHistoryItem(item) {
    setResult(item);
    setSaved(true);
    setScreen("result");
  }

  function goHistory() {
    loadHistory();
    setScreen("history");
  }

  return (
    <div className="app-shell">
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-screen" ref={scrollRef}>
          {screen === "home" && (
            <HomeScreen
              query={query}
              setQuery={setQuery}
              onAnalyze={handleAnalyze}
              loading={loading}
              error={error}
              examples={examples}
            />
          )}
          {screen === "result" && (
            <ResultScreen
              result={result}
              onBack={() => setScreen(history.length || screen === "result" ? "home" : "home")}
              onSave={handleSave}
              saved={saved}
            />
          )}
          {screen === "history" && (
            <HistoryScreen
              items={history}
              onBack={() => setScreen("home")}
              onOpen={openHistoryItem}
              loadingList={loadingList}
            />
          )}
        </div>

        <nav className="tabbar">
          <button
            className={`tab ${screen === "home" ? "active" : ""}`}
            onClick={() => setScreen("home")}
          >
            <Search size={18} />
            <span>Analisar</span>
          </button>
          <button
            className={`tab ${screen === "history" ? "active" : ""}`}
            onClick={goHistory}
          >
            <History size={18} />
            <span>Histórico</span>
          </button>
        </nav>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        .app-shell {
          min-height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px 12px;
          background:
            radial-gradient(120% 90% at 50% -10%, #EAF3E7 0%, #F6F8F3 55%, #F6F8F3 100%);
          box-sizing: border-box;
        }

        .phone {
          width: 100%;
          max-width: 380px;
          height: 760px;
          max-height: 90vh;
          background: #F6F8F3;
          border-radius: 40px;
          border: 1px solid #E1E9DC;
          box-shadow: 0 30px 60px -30px rgba(20,40,28,0.35), 0 0 0 8px #FFFFFF, 0 0 0 9px #DEE6D8;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .phone-notch {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 90px;
          height: 20px;
          background: #12241B;
          border-radius: 999px;
          z-index: 5;
        }

        .phone-screen {
          flex: 1;
          overflow-y: auto;
          padding-top: 34px;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .phone-screen::-webkit-scrollbar { display: none; }

        .screen {
          font-family: 'Inter', sans-serif;
          animation: rise 0.35s ease;
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .screen { animation: none; }
        }

        .tabbar {
          display: flex;
          border-top: 1px solid #E1E9DC;
          background: #FFFFFF;
        }
        .tab {
          flex: 1;
          border: none;
          background: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 10px 0 14px;
          font-family: 'Inter', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          color: #A9B6AA;
          cursor: pointer;
          transition: color .15s ease;
        }
        .tab.active { color: #1C3D2E; }
        .tab:focus-visible { outline: 2px solid #52A37C; outline-offset: -2px; }
      `}</style>
    </div>
  );
}
