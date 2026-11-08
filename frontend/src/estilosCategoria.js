const ESTILOS = {
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
  Outro: { bg: "#F0F0EE", fg: "#33362F", ring: "#9A9A8F" },
};

export function estiloDaCategoria(categoria) {
  return ESTILOS[categoria] || ESTILOS.Outro;
}
