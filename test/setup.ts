import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

// Só injeta os matchers se estiver rodando sob o Vitest
if (typeof expect !== "undefined" && expect.extend) {
  expect.extend(matchers);
}

// Mock do window.matchMedia exigido pelo Mantine UI
if (typeof window !== "undefined") {
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
}
