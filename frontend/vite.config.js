import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // no GitHub Pages o site fica em /App-DescarteIA/
  base: command === "build" ? "/App-DescarteIA/" : "/",
  server: { port: 5173 },
}));
