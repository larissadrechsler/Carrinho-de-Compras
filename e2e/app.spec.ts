import { test, expect } from "@playwright/test";

test.describe("Fluxos E2E - DummyStore", () => {
  test("Fluxo 1: Autenticação com sucesso e navegação para o Painel Admin", async ({
    page,
  }) => {
    // 1. Acessa a página de login diretamente ou via home
    await page.goto("./login");

    // 2. Preenche os campos do formulário
    await page.getByLabel(/usuário/i).fill("emilys");
    await page.getByLabel(/senha/i).fill("emilyspass");

    // 3. Submete
    await page.getByRole("button", { name: /entrar|login/i }).click();

    // 4. Valida se chegou no painel
    await expect(
      page.getByRole("heading", { name: /painel|produtos/i }),
    ).toBeVisible({ timeout: 15000 });
  });

  test("Fluxo 2: Busca de produtos no catálogo público", async ({ page }) => {
    await page.goto("./");

    const searchInput = page.getByPlaceholder(/buscar por nome do produto/i);
    await searchInput.fill("Phone");

    await expect(page.getByText(/iphone/i).first()).toBeVisible({
      timeout: 15000,
    });
  });
});
