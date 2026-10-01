import json
import os
from typing import Any, Dict

import httpx

from app.services.ia_classification_service import (
    ClassificacaoIAError,
    ClassificacaoIAServiceBase,
    montar_prompt_sistema,
)


class GeminiClassificacaoIAService(ClassificacaoIAServiceBase):
    BASE_URL = "https://generativelanguage.googleapis.com/v1beta"

    def __init__(self, api_key: str | None = None, model: str | None = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY", "")
        self.model = model or os.getenv("GEMINI_MODEL", "gemini-3.6-flash")

    def classificar(self, descricao: str) -> Dict[str, Any]:
        if not self.api_key:
            raise ClassificacaoIAError(
                "GEMINI_API_KEY nao configurado. Gere uma chave gratuita em "
                "aistudio.google.com/apikey e preencha GEMINI_API_KEY no .env."
            )

        prompt_sistema = montar_prompt_sistema()
        prompt_completo = f"{prompt_sistema}\n\nResíduo descrito pelo usuário: {descricao}"

        url = f"{self.BASE_URL}/models/{self.model}:generateContent?key={self.api_key}"
        body = {
            "contents": [{"parts": [{"text": prompt_completo}]}],
            "generationConfig": {"responseMimeType": "application/json"},
        }

        try:
            response = httpx.post(url, json=body, timeout=30.0)
        except httpx.RequestError as exc:
            raise ClassificacaoIAError(f"Falha de rede ao chamar o Gemini: {exc}") from exc

        if response.status_code != 200:
            raise ClassificacaoIAError(
                f"Gemini retornou erro {response.status_code}: {response.text[:300]}"
            )

        data = response.json()
        try:
            texto_bruto = data["candidates"][0]["content"]["parts"][0]["text"]
        except (KeyError, IndexError) as exc:
            raise ClassificacaoIAError(f"Resposta em formato inesperado do Gemini: {data}") from exc

        texto_limpo = texto_bruto.strip()
        if texto_limpo.startswith("```"):
            texto_limpo = texto_limpo.strip("`").removeprefix("json").strip()

        try:
            resultado = json.loads(texto_limpo)
        except json.JSONDecodeError as exc:
            raise ClassificacaoIAError(f"A IA nao retornou um JSON valido: {texto_bruto}") from exc

        resultado["prompt_utilizado"] = prompt_completo
        resultado["resposta_bruta"] = texto_bruto
        return resultado
