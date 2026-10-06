import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Substitua "meu-projeto-dummyjson" pelo nome exato do seu repositório no GitHub
  base: "/meu-projeto-dummyjson/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    exclude: ["**/e2e/**", "**/node_modules/**"],
  },
});
