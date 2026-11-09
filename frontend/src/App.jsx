import { useState } from "react";
import { Search, History } from "lucide-react";
import TelaAnalisar from "./telas/TelaAnalisar.jsx";

export default function App() {
  const [tela, setTela] = useState("analisar");

  return (
    <div className="app-shell">
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-screen">
          {tela === "analisar" && <TelaAnalisar />}
          {tela === "historico" && <p className="placeholder">Tela Histórico em construção</p>}
        </div>

        <nav className="tabbar">
          <button className={`tab ${tela === "analisar" ? "active" : ""}`} onClick={() => setTela("analisar")}>
            <Search size={18} />
            <span>Analisar</span>
          </button>
          <button className={`tab ${tela === "historico" ? "active" : ""}`} onClick={() => setTela("historico")}>
            <History size={18} />
            <span>Histórico</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
