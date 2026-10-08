import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Usa a subpasta apenas no GitHub Actions, mantendo os testes locais normais
  base: command === "build" ? "/Carrinho-de-Compras/" : "/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    exclude: ["**/e2e/**", "**/node_modules/**"],
  },
}));
