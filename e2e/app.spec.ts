import { test, expect } from "@playwright/test";

test.describe("Fluxos E2E - DummyStore", () => {
  test("Fluxo 1: Autenticação com sucesso e navegação para o Painel Admin", async ({
    page,
  }) => {
    await page.goto("/");

    const loginBtn = page.getByRole("button", { name: /entrar|login/i });
    if (await loginBtn.isVisible()) {
      await loginBtn.click();
    } else {
      await page.goto("/login");
    }

    await page.locator("input").first().fill("emilys");
    await page.locator('input[type="password"]').fill("emilyspass");
    await page.getByRole("button", { name: /entrar|login/i }).click();

    await expect(page).toHaveURL(/.*admin/);
  });

  test("Fluxo 2: Busca de produtos no catálogo público", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.locator("input").first();
    await searchInput.fill("Phone");

    await expect(page.getByText(/iphone/i).first()).toBeVisible({
      timeout: 15000,
    });
  });
});
