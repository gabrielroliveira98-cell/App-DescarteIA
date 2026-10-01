import enum


class StatusDescarte(str, enum.Enum):
    PENDENTE = "PENDENTE"
    CLASSIFICADO = "CLASSIFICADO"
    ERRO = "ERRO"
