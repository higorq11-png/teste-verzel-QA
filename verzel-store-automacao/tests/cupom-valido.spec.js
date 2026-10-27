import { test, expect } from "@playwright/test";

const BASE_URL = "https://verzel-store.qa-test-verzel-store.workers.dev/";

const variacoesCupom = [
  {
    descricao: "cupom em letras maiúsculas",
    cupom: "BEMVINDO10",
    
  },
  {
    descricao: "cupom em letras minúsculas",
    cupom: "bemvindo10",
    
  },
  {
    descricao: "cupom com maiúsculas e minúsculas",
    cupom: "BemVinDo10",
    
  },

  {
    descricao: "cupom com espaço antes",
    cupom: " BEMVINDO10",
    
  },
  {
    descricao: "cupom com espaço depois",
    cupom: "BEMVINDO10 ",
    
  },
];

for (const variacao of variacoesCupom) {
  test(`deve aceitar ${variacao.descricao}`, async ({ page }) => {
    await page.goto(BASE_URL);

    await page
      .getByRole("article", { name: "Camiseta Essencial" })
      .getByRole("button")
      .click();

    await page.getByRole("link", { name: "Carrinho" }).click();

    await page
      .getByRole("textbox", { name: "Cupom de desconto" })
      .fill(variacao.cupom);

    await page.getByRole("button", { name: "Aplicar cupom" }).click();

    await expect(page.locator('[data-valor="subtotal"]')).toHaveText(
      "R$ 59,90",
    );

    
  });
}
