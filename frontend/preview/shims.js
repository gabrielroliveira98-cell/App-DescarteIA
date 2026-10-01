// Local dev shims for DescarteIA.jsx — replaces the two host-provided APIs
// (window.storage + the direct Claude API fetch) so the component can run
// standalone in a plain browser, without any backend or API key.

// ---- window.storage polyfill (backed by localStorage) ----
window.storage = {
  async get(key) {
    const value = window.localStorage.getItem(key);
    return value == null ? null : { value };
  },
  async set(key, value) {
    window.localStorage.setItem(key, value);
  },
  async list(prefix) {
    const keys = Object.keys(window.localStorage).filter((k) => k.startsWith(prefix));
    return { keys };
  },
};

// ---- Mock classifier, intercepting the api.anthropic.com call ----
// DescarteIA.jsx calls the real Claude API directly from the browser with no
// API key, which only works inside a sandboxed host that proxies the request.
// Here we patch window.fetch to answer that one endpoint with a small
// keyword-based classifier — following the same category taxonomy and
// recognition rules as the production system prompt — so the UI is fully
// clickable offline, without needing real API access.
(function () {
  function normalize(s) {
    return (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, ""); // strip accents so "lâmpada" ~= "lampada"
  }

  // Ordered: hazardous / special-collection categories first (more specific),
  // then common recyclables, so overlapping words resolve sensibly.
  const RULES = [
    {
      categoria: "Pilha ou bateria",
      keys: ["pilha", "bateria", "pilhas", "baterias"],
      nome: "Pilha ou bateria",
      reciclavel: false,
      descarte: "Nunca descarte no lixo comum. Leve a um ponto de coleta de pilhas e baterias (muitos supermercados e lojas de eletrônicos têm coletores).",
      dica: "Pilhas e baterias vazam metais pesados que contaminam o solo e a água.",
      emoji: "🔋",
    },
    {
      categoria: "Lâmpada",
      keys: ["lampada", "led", "fluorescente", "incandescente"],
      nome: "Lâmpada",
      reciclavel: false,
      descarte: "Leve a um ecoponto ou loja parceira com coletor de lâmpadas. Não descarte no lixo comum nem quebre.",
      dica: "Lâmpadas fluorescentes contêm mercúrio, um metal tóxico.",
      emoji: "💡",
    },
    {
      categoria: "Resíduo de saúde",
      keys: ["seringa", "agulha", "remedio vencido", "medicamento vencido", "curativo", "material hospitalar", "absorvente"],
      nome: "Resíduo de saúde",
      reciclavel: false,
      descarte: "Leve a uma farmácia, unidade de saúde ou ponto de coleta específico para resíduos de saúde.",
      dica: "Nunca descarte agulhas ou seringas soltas no lixo comum — risco de acidente.",
      emoji: "🩹",
    },
    {
      categoria: "Óleo de cozinha",
      keys: ["oleo de cozinha", "oleo de fritura", "oleo usado", "oleo de frigideira"],
      nome: "Óleo de cozinha usado",
      reciclavel: false,
      descarte: "Armazene em uma garrafa ou recipiente fechado e leve a um ponto de coleta de óleo (muitos mercados e postos de gasolina recebem).",
      dica: "Nunca jogue óleo na pia ou no vaso sanitário — contamina a água e entope encanamentos.",
      emoji: "🛢️",
    },
    {
      categoria: "Resíduo perigoso",
      keys: ["tinta", "solvente", "produto quimico", "inseticida", "pesticida", "inflamavel"],
      nome: "Resíduo perigoso",
      reciclavel: false,
      descarte: "Não descarte no lixo comum. Procure um ponto de coleta de resíduos químicos/perigosos do seu município.",
      dica: "Embalagens contaminadas com produtos químicos concentrados exigem descarte especial.",
      emoji: "🧪",
    },
    {
      categoria: "Volumoso",
      keys: ["sofa", "colchao", "guarda-roupa", "guarda roupa", "armario", "movel", "moveis", "geladeira", "maquina de lavar", "fogao"],
      nome: "Item volumoso",
      reciclavel: false,
      descarte: "Procure a coleta de volumosos ou ecoponto da sua cidade — não descarte na calçada sem agendamento.",
      dica: "Se estiver em bom estado, considere doar antes de descartar.",
      emoji: "🛋️",
    },
    {
      categoria: "Têxtil",
      keys: ["roupa", "camiseta", "calca", "jaqueta", "sapato", "tenis", "tecido", "toalha", "lencol", "cobertor"],
      nome: "Item têxtil",
      reciclavel: false,
      descarte: "Se estiver em bom estado, doe. Se não tiver mais uso, procure um ponto de coleta têxtil, quando disponível.",
      dica: "Tecidos misturados ao lixo comum ocupam muito espaço em aterros.",
      emoji: "👕",
    },
    {
      categoria: "Eletrônico",
      keys: ["celular", "smartphone", "tablet", "computador", "notebook", "teclado", "mouse", "monitor", "televisao", " tv", "impressora", "cabo usb", "carregador", "fone de ouvido", "controle remoto", "videogame", "console", "roteador"],
      nome: "Eletrônico",
      reciclavel: false,
      descarte: "Leve a um ponto de coleta de lixo eletrônico (e-lixo) ou a lojas com coletores próprios — nunca no lixo comum.",
      dica: "Eletrônicos contêm metais recicláveis, mas exigem processo especial de reciclagem.",
      emoji: "🔌",
    },
    {
      categoria: "Rejeito",
      keys: ["papel higienico", "guardanapo sujo", "guardanapo contaminado", "fralda", "lenco usado", "esponja"],
      nome: "Rejeito",
      reciclavel: false,
      descarte: "Descarte no lixo comum — este item não tem aproveitamento na coleta seletiva.",
      dica: "Itens muito contaminados por fluidos ou alimentos não podem ser reciclados.",
      emoji: "🗑️",
    },
    {
      categoria: "Papelão",
      keys: ["papelao", "caixa de papelao", "caixa de cereal", "mudanca"],
      nome: "Papelão",
      reciclavel: true,
      descarte: "Desmonte a caixa, mantenha seca e descarte na coleta seletiva de papel.",
      dica: "Fitas adesivas e grampos devem ser removidos antes do descarte.",
      emoji: "📦",
    },
    {
      categoria: "Papel",
      keys: ["papel", "jornal", "revista", "caderno", "sulfite", "cartolina", "envelope", "folheto", "livro"],
      nome: "Papel",
      reciclavel: true,
      descarte: "Mantenha seco e limpo, e descarte na coleta seletiva de papel.",
      dica: "Papel engordurado ou sujo (ex: guardanapo) não é reciclável.",
      emoji: "📄",
    },
    {
      categoria: "Plástico",
      keys: ["pet", "garrafa pet", "garrafa de refrigerante", "garrafa de agua", "garrafa de suco", "plastico", "pote de plastico", "copo plastico", "sacola", "embalagem plastica", "tampa plastica", "margarina", "shampoo", "pvc", "cano", "plastico bolha", "brinquedo"],
      nome: "Plástico",
      reciclavel: true,
      descarte: "Lave, amasse e descarte na coleta seletiva (lixeira ou saco de recicláveis plásticos).",
      dica: "Separe a tampa — ela também é reciclável, mas de um tipo de plástico diferente.",
      emoji: "🧴",
    },
    {
      categoria: "Vidro",
      keys: ["vidro", "garrafa de vidro", "garrafa de cerveja", "garrafa de vinho", "pote de vidro", "pote de geleia", "frasco de vidro", "copo de vidro", "conserva"],
      nome: "Vidro",
      reciclavel: true,
      descarte: "Descarte na coleta seletiva de vidro; embrulhe cacos quebrados em papel antes de jogar fora.",
      dica: "Vidros de espelho, lâmpada e cerâmica NÃO são recicláveis junto com vidro comum.",
      emoji: "🍾",
    },
    {
      categoria: "Metal",
      keys: ["lata", "latinha", "aluminio", "panela", "prego", "parafuso", "ferragem", "sucata", "fio metalico"],
      nome: "Metal",
      reciclavel: true,
      descarte: "Lave e amasse a lata, e descarte na coleta seletiva de metais.",
      dica: "O alumínio é um dos materiais mais reciclados do Brasil — vale até dinheiro em ferros-velhos.",
      emoji: "🥫",
    },
    {
      categoria: "Orgânico",
      keys: ["organico", "resto de comida", "restos de comida", "casca", "fruta estragada", "legume", "verdura", "borra de cafe", "filtro de cafe", "osso", "carne", "peixe", "galho", "grama"],
      nome: "Resíduo orgânico",
      reciclavel: false,
      descarte: "Descarte no lixo orgânico comum ou, se possível, em uma composteira.",
      dica: "Restos de comida compostados viram adubo em poucas semanas.",
      emoji: "🍌",
    },
  ];

  function classify(query) {
    const q = normalize(query);
    const hit = RULES.find((rule) => rule.keys.some((k) => q.includes(normalize(k))));
    if (hit) {
      const { keys, ...result } = hit;
      return result;
    }
    return {
      nome: (query || "Item").slice(0, 40),
      categoria: "Outro",
      reciclavel: false,
      descarte: "Não consegui identificar esse item com confiança. Pode descrever o material dele ou para que ele é usado?",
      dica: "Quanto mais detalhes (material, formato, uso), mais preciso é o resultado.",
      emoji: "❓",
    };
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = async function (url, opts) {
    if (typeof url === "string" && url.includes("api.anthropic.com/v1/messages")) {
      let query = "";
      try {
        const body = JSON.parse(opts && opts.body ? opts.body : "{}");
        query = Array.isArray(body.messages) ? body.messages[0]?.content || "" : "";
      } catch (e) {
        // ignore malformed body, fall through with empty query
      }
      const result = classify(query);
      await new Promise((r) => setTimeout(r, 500)); // simulate latency
      return {
        ok: true,
        json: async () => ({ content: [{ type: "text", text: JSON.stringify(result) }] }),
      };
    }
    return originalFetch(url, opts);
  };
})();
