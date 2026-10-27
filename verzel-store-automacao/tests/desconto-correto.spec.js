import { test, expect } from "@playwright/test";

const BASE_URL = "https://verzel-store.qa-test-verzel-store.workers.dev/";

function formatarMoeda(centavos) {
  const valor = (centavos / 100).toFixed(2);
  const [inteiro, decimal] = valor.split(".");
  const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `R$ ${inteiroFormatado},${decimal}`;
}

test("deve aplicar o cupom BEMVINDO10 aos produtos da API", async ({
  request,
  browser,
}) => {
  const respostaProdutos = await request.get(`${BASE_URL}api/produtos/`);
  expect(respostaProdutos.status()).toBe(200);
  const produtos = await respostaProdutos.json();
  expect(produtos.length).toBeGreaterThan(0);

  for (const produto of produtos) {
    await test.step(`Validar cupom para ${produto.nome}`, async () => {
      const respostaCalculo = await request.post(
        `${BASE_URL}api/carrinho/calcular`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            itens: [
              {
                produtoId: produto.id,
                quantidade: 1,
              },
            ],
            cupom: "BEMVINDO10",
          },
        },
      );

      expect(respostaCalculo.status()).toBe(200);
      const calculo = await respostaCalculo.json();
      expect(calculo.cupom.aplicado).toBe(true);
      const subtotalCentavos = Math.round(produto.preco * 100);
      const descontoCentavos = Math.round(subtotalCentavos * 0.1);
      const freteCentavos = subtotalCentavos >= 20000 ? 0 : 1990;
      const totalCentavos = subtotalCentavos - descontoCentavos + freteCentavos;

      expect(Math.round(calculo.subtotal * 100)).toBe(subtotalCentavos);

      expect(Math.round(calculo.desconto * 100)).toBe(descontoCentavos);

      expect(Math.round(calculo.frete * 100)).toBe(freteCentavos);

      expect(Math.round(calculo.total * 100)).toBe(totalCentavos);

      const contexto = await browser.newContext();

      try {
        const page = await contexto.newPage();

        await page.goto(BASE_URL);

        await page
          .getByRole("article", { name: produto.nome })
          .getByRole("button")
          .click();

        await page.getByRole("link", { name: "Carrinho" }).click();

        await page
          .getByRole("textbox", { name: "Cupom de desconto" })
          .fill("BEMVINDO10");

        await page.getByRole("button", { name: "Aplicar cupom" }).click();

        await expect(page.locator('[data-valor="subtotal"]')).toHaveText(
          formatarMoeda(subtotalCentavos),
        );

        await expect(page.locator('[data-valor="desconto"]')).toHaveText(
          `- ${formatarMoeda(descontoCentavos)}`,
        );

        await expect(page.locator('[data-valor="total"]')).toHaveText(
          formatarMoeda(totalCentavos),
        );
      } finally {
        await contexto.close();
      }
    });
  }
});

test("deve confirmar pedido com dados válidos pela interface", async ({
  page,
}) => {
  await page.goto(BASE_URL);

  await page
    .getByRole("article", { name: "Boné Aba Curva" })
    .getByRole("button")
    .click();

  await page.getByRole("link", { name: "Carrinho" }).click();

  await page.getByText("Finalizar compra", { exact: true }).click();

  await page.getByLabel("Nome completo").fill("Teste QA");
  await page.getByLabel("E-mail").fill("teste.qa@example.com");
  await page.getByLabel("CEP").fill("38400000");

  await page.getByRole("button", { name: "Confirmar pedido" }).click();

  await expect(
    page.getByText("Pedido confirmado", { exact: true }),
  ).toBeVisible();
});
