import { test, expect } from "@playwright/test";

const BASE_URL = "https://verzel-store.qa-test-verzel-store.workers.dev/";

const cenarios = [
  {
    descricao: "deve cobrar frete abaixo de R$ 200,00",
    produtos: [
      { nome: "Mochila Urbana 20L", id: "P005", quantidade: 1 },
      { nome: "Garrafa Térmica 750ml", id: "P008", quantidade: 1 },
      { nome: "Boné Aba Curva", id: "P004", quantidade: 1 },
    ],
    subtotal: 199.9,
    frete: 19.9,
    freteGratis: false,
  },
  {
    descricao: "deve oferecer frete grátis em exatamente R$ 200,00",
    produtos: [
      { nome: "Mochila Urbana 20L", id: "P005", quantidade: 1 },
      { nome: "Garrafa Térmica 750ml", id: "P008", quantidade: 2 },
    ],
    subtotal: 200.0,
    frete: 0,
    freteGratis: true,
  },
  {
    descricao: "deve oferecer frete grátis acima de R$ 200,00",
    produtos: [
      { nome: "Mochila Urbana 20L", id: "P005", quantidade: 1 },
      { nome: "Garrafa Térmica 750ml", id: "P008", quantidade: 2 },
      { nome: "Boné Aba Curva", id: "P004", quantidade: 1 },
    ],
    subtotal: 249.9,
    frete: 0,
    freteGratis: true,
  },
];

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

for (const cenario of cenarios) {
  test(cenario.descricao, async ({ page, request }) => {
    const itens = cenario.produtos.map((produto) => ({
      produtoId: produto.id,
      quantidade: produto.quantidade,
    }));

    const resposta = await request.post(`${BASE_URL}api/carrinho/calcular`, {
      data: { itens },
    });

    expect(resposta.status()).toBe(200);

    const resultado = await resposta.json();

    expect(resultado.subtotal).toBe(cenario.subtotal);
    expect(resultado.frete).toBe(cenario.frete);
    expect(resultado.freteGratis).toBe(cenario.freteGratis);
    expect(resultado.total).toBe(cenario.subtotal + cenario.frete);

    await page.goto(BASE_URL);

    for (const produto of cenario.produtos) {
      for (let i = 0; i < produto.quantidade; i++) {
        await page
          .getByRole("article", { name: produto.nome })
          .getByRole("button")
          .click();
      }
    }

    await page.getByRole("link", { name: "Carrinho" }).click();

    await expect(page.locator('[data-valor="subtotal"]')).toHaveText(
      formatarMoeda(cenario.subtotal),
    );

    await expect(page.locator('[data-valor="total"]')).toHaveText(
      formatarMoeda(cenario.subtotal + cenario.frete),
    );
  });
}

test("deve manter o frete grátis quando o cupom reduz o subtotal para menos de R$ 200,00", async ({
  page,
  request,
}) => {
  const itens = [
    { produtoId: "P003", quantidade: 1 },
    { produtoId: "P006", quantidade: 1 },
  ];

  const resposta = await request.post(`${BASE_URL}api/carrinho/calcular`, {
    data: {
      itens,
      cupom: "BEMVINDO10",
    },
  });

  expect(resposta.ok()).toBeTruthy();

  const resultado = await resposta.json();

  expect(resultado.subtotal).toBe(219.8);
  expect(resultado.desconto).toBe(21.98);
  expect(resultado.cupom.aplicado).toBe(true);

  expect(resultado.frete).toBe(0);
  expect(resultado.freteGratis).toBe(true);
  expect(resultado.total).toBe(197.82);

  await page.goto(BASE_URL);

  await page
    .getByRole("article", { name: "Tênis Casual Urbano" })
    .getByRole("button")
    .click();

  await page
    .getByRole("article", { name: "Kit 3 Pares de Meias" })
    .getByRole("button")
    .click();

  await page.locator(".link-carrinho").click();

  await page
    .getByRole("textbox", { name: "Cupom de desconto" })
    .fill("BEMVINDO10");

  await page.getByRole("button", { name: "Aplicar cupom" }).click();

  await expect(page.locator('[data-valor="subtotal"]')).toHaveText(
    formatarMoeda(219.8),
  );

  await expect(page.locator('[data-valor="desconto"]')).toHaveText(
    "- R$ 21,98",
  );

  await expect(page.locator('[data-valor="total"]')).toHaveText(
    formatarMoeda(197.82),
  );
});
