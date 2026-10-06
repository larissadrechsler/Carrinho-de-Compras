import { test, expect } from "@playwright/test";

test.describe("Fluxos E2E - DummyStore", () => {
  test("Fluxo 1: Autenticação com sucesso e navegação para o Painel Admin", async ({
    page,
  }) => {
    // 1. Acessa a página inicial
    await page.goto("/");

    // 2. Procura botão/link de login ou navega para /login
    const loginButton = page.getByRole("button", { name: /entrar|login/i });

    if (await loginButton.isVisible()) {
      await loginButton.click();
    } else {
      await page.goto("/login");
    }

    await expect(page).toHaveURL("/login");

    // 3. Preenche os campos do formulário
    await page.getByLabel(/usuário/i).fill("emilys");
    await page.getByLabel(/senha/i).fill("emilyspass");

    // 4. Submete o formulário
    await page.getByRole("button", { name: /entrar|login/i }).click();

    // 5. Valida se chegou ao painel administrativo
    await expect(page).toHaveURL("/admin");
    await expect(
      page.getByRole("heading", { name: /painel de gestão de produtos/i }),
    ).toBeVisible();
  });

  test("Fluxo 2: Busca de produtos no catálogo público", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByPlaceholder(/buscar por nome do produto/i);
    await searchInput.fill("Phone");

    await expect(page.getByText(/iphone/i).first()).toBeVisible();
  });
});
