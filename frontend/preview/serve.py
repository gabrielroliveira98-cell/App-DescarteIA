import http.server
import functools
import os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

TEXT_TYPES = ("text/", "application/javascript")


class UTF8Handler(http.server.SimpleHTTPRequestHandler):
    def guess_type(self, path):
        if path.endswith(".jsx"):
            return "text/javascript"
        return super().guess_type(path)

    def send_header(self, keyword, value):
        if keyword.lower() == "content-type" and "charset" not in value:
            if any(value.startswith(t) for t in TEXT_TYPES):
                value = f"{value}; charset=utf-8"
        super().send_header(keyword, value)


if __name__ == "__main__":
    handler = functools.partial(UTF8Handler, directory=ROOT)
    with http.server.ThreadingHTTPServer(("localhost", 8765), handler) as httpd:
        print("Serving", ROOT, "on http://localhost:8765")
        httpd.serve_forever()
