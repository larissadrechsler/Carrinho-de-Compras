import { test, expect } from "@playwright/test";

test.describe("Fluxos E2E - DummyStore", () => {
  test("Fluxo 1: Autenticação com sucesso e navegação para o Painel Admin", async ({
    page,
  }) => {
    // 1. Navega para a raiz configurada no baseURL
    await page.goto("./");

    // 2. Procura botão de login
    const loginBtn = page.getByRole("button", { name: /entrar|login/i });
    if (await loginBtn.isVisible()) {
      await loginBtn.click();
    } else {
      await page.goto("./login");
    }

    // 3. Preenche campos de credenciais
    await page.locator("input").first().fill("emilys");
    await page.locator('input[type="password"]').fill("emilyspass");

    // 4. Submete
    await page.getByRole("button", { name: /entrar|login/i }).click();

    // 5. Valida carregamento
    await expect(page).toHaveURL(/.*admin/);
  });

  test("Fluxo 2: Busca de produtos no catálogo público", async ({ page }) => {
    await page.goto("./");

    const searchInput = page.locator("input").first();
    await searchInput.fill("Phone");

    await expect(page.getByText(/iphone/i).first()).toBeVisible({
      timeout: 15000,
    });
  });
});
