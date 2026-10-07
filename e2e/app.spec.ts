import { test, expect } from "@playwright/test";

test.describe("Fluxos E2E - DummyStore", () => {
  test("Fluxo 1: Autenticação com sucesso e navegação para o Painel Admin", async ({
    page,
  }) => {
    // 1. Usa caminho relativo para respeitar o baseURL
    await page.goto("./");

    const loginButton = page.getByRole("button", { name: /entrar|login/i });
    if (await loginButton.isVisible()) {
      await loginButton.click();
    } else {
      await page.goto("./login");
    }

    await page.getByLabel(/usuário/i).fill("emilys");
    await page.getByLabel(/senha/i).fill("emilyspass");
    await page.getByRole("button", { name: /entrar|login/i }).click();

    await expect(
      page.getByRole("heading", { name: /painel|produtos/i }),
    ).toBeVisible();
  });

  test("Fluxo 2: Busca de produtos no catálogo público", async ({ page }) => {
    await page.goto("./");

    const searchInput = page.getByPlaceholder(/buscar por nome do produto/i);
    await searchInput.fill("Phone");

    await expect(page.getByText(/iphone/i).first()).toBeVisible();
  });
});
