import { History, Recycle, AlertTriangle } from "lucide-react";
import { estiloDaCategoria } from "../estilosCategoria.js";

export default function CardResultado({ resultado, onSalvar, salvo }) {
  const s = estiloDaCategoria(resultado.categoria);

  return (
    <div className="resultado">
      <div className="resultado-badge" style={{ background: s.bg, boxShadow: `0 0 0 1px ${s.ring}33 inset` }}>
        <span className="resultado-emoji">{resultado.emoji || "♻️"}</span>
      </div>
      <h2 className="resultado-nome">{resultado.nome}</h2>
      <span className="resultado-categoria" style={{ background: s.bg, color: s.fg }}>{resultado.categoria}</span>

      <div className={`reciclavel ${resultado.reciclavel ? "sim" : "nao"}`}>
        {resultado.reciclavel ? <Recycle size={14} /> : <AlertTriangle size={14} />}
        {resultado.reciclavel ? "Reciclável" : "Requer descarte especial"}
      </div>

      <div className="info">
        <span className="info-label">Como descartar</span>
        <p className="info-texto">{resultado.descarte}</p>
      </div>

      {resultado.dica && (
        <div className="info dica">
          <span className="info-label">Dica</span>
          <p className="info-texto">{resultado.dica}</p>
        </div>
      )}

      {onSalvar && (
        <button className="salvar-btn" onClick={onSalvar} disabled={salvo}>
          <History size={15} />
          {salvo ? "Salvo no histórico" : "Salvar no histórico"}
        </button>
      )}

      <style>{`
        .resultado { margin-top:18px; text-align:center; background:#FFFFFF; border:1px solid #E3E9DE; border-radius:20px; padding:18px 16px; }
        .resultado-badge { width:64px; height:64px; margin:0 auto 12px; border-radius:18px; display:flex; align-items:center; justify-content:center; }
        .resultado-emoji { font-size:30px; line-height:1; }
        .resultado-nome { font-family:'Space Grotesk', sans-serif; font-weight:700; font-size:19px; color:#12241B; margin:0 0 8px; }
        .resultado-categoria { display:inline-block; font-weight:600; font-size:11px; padding:5px 11px; border-radius:999px; margin-bottom:12px; }

        .reciclavel { display:flex; align-items:center; justify-content:center; gap:6px; width:fit-content; margin:0 auto 16px; padding:7px 13px; border-radius:999px; font-weight:600; font-size:12px; }
        .reciclavel.sim { background:#E5F5EA; color:#1E6B3F; }
        .reciclavel.nao { background:#FCEFE1; color:#9A5A17; }

        .info { text-align:left; background:#FAFBF8; border:1px solid #E3E9DE; border-radius:14px; padding:12px 14px; margin-bottom:10px; }
        .info.dica { background:#FBF7EC; border-color:#EFE3C4; }
        .info-label { display:block; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.05em; color:#8A9A8C; margin-bottom:5px; }
        .info.dica .info-label { color:#A98C3F; }
        .info-texto { margin:0; font-size:13.5px; line-height:1.55; color:#2A362B; }

        .salvar-btn { width:100%; margin-top:6px; height:42px; border-radius:12px; border:1px solid #1C3D2E; background:#FFFFFF; color:#1C3D2E; font-family:'Inter', sans-serif; font-weight:600; font-size:13.5px; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; }
        .salvar-btn:hover:not(:disabled) { background:#1C3D2E; color:#EFF7EF; }
        .salvar-btn:disabled { opacity:0.55; cursor:default; }
      `}</style>
    </div>
  );
}
