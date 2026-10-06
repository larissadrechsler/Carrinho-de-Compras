import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";

// Injeta os matchers do jest-dom (toBeInTheDocument, toHaveValue, etc.) no expect do Vitest
expect.extend(matchers);

// Mock do window.matchMedia exigido pelo Mantine UI no ambiente JSDOM
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
