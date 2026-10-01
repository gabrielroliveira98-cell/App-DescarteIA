import enum


class Categoria(str, enum.Enum):
    PAPEL = "Papel"
    PAPELAO = "Papelão"
    PLASTICO = "Plástico"
    VIDRO = "Vidro"
    METAL = "Metal"
    ORGANICO = "Orgânico"
    REJEITO = "Rejeito"
    ELETRONICO = "Eletrônico"
    PILHA_OU_BATERIA = "Pilha ou bateria"
    LAMPADA = "Lâmpada"
    RESIDUO_DE_SAUDE = "Resíduo de saúde"
    OLEO_DE_COZINHA = "Óleo de cozinha"
    RESIDUO_PERIGOSO = "Resíduo perigoso"
    VOLUMOSO = "Volumoso"
    TEXTIL = "Têxtil"
    OUTRO = "Outro"
