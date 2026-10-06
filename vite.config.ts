import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts", // Caminho atualizado para a pasta test na raiz
    exclude: ["**/e2e/**", "**/node_modules/**"], // Ignora o Playwright no Vitest
  },
});
