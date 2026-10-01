import json
import os
from typing import Any, Dict

import httpx

from app.services.ia_classification_service import ClassificacaoIAError, montar_prompt_sistema


class GroqClassificacaoIAService:
    BASE_URL = "https://api.groq.com/openai/v1/chat/completions"

    def __init__(self, api_key: str | None = None, model: str | None = None):
        self.api_key = api_key or os.getenv("GROQ_API_KEY", "")
        self.model = model or os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")

    def classificar(self, descricao: str) -> Dict[str, Any]:
        if not self.api_key:
            raise ClassificacaoIAError(
                "GROQ_API_KEY nao configurado. Gere uma chave gratuita em console.groq.com/keys "
                "e preencha GROQ_API_KEY no .env."
            )

        body = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": montar_prompt_sistema()},
                {"role": "user", "content": descricao},
            ],
            "temperature": 0.2,
            "response_format": {"type": "json_object"},
        }

        try:
            response = httpx.post(
                self.BASE_URL,
                headers={"Authorization": f"Bearer {self.api_key}"},
                json=body,
                timeout=30.0,
            )
        except httpx.RequestError as exc:
            raise ClassificacaoIAError(f"Falha de rede ao chamar o Groq: {exc}") from exc

        if response.status_code != 200:
            raise ClassificacaoIAError(f"Groq retornou erro {response.status_code}: {response.text[:300]}")

        data = response.json()
        try:
            texto = data["choices"][0]["message"]["content"]
        except (KeyError, IndexError) as exc:
            raise ClassificacaoIAError(f"Resposta em formato inesperado do Groq: {data}") from exc

        try:
            return json.loads(texto)
        except json.JSONDecodeError as exc:
            raise ClassificacaoIAError(f"A IA nao retornou um JSON valido: {texto}") from exc
