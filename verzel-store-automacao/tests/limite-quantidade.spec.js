import { test, expect } from "@playwright/test";

const BASE_URL = "https://verzel-store.qa-test-verzel-store.workers.dev/";

const cenarios = [
  {
    descricao: "deve aceitar 4 unidades do mesmo produto",
    quantidade: 4,
    statusEsperado: 200,
    codigoEsperado: null,
  },
  {
    descricao: "deve aceitar exatamente 5 unidades do mesmo produto",
    quantidade: 5,
    statusEsperado: 200,
    codigoEsperado: null,
  },
  {
    descricao: "não deve aceitar mais que 5 unidades do mesmo produto",
    quantidade: 6,
    statusEsperado: 422,
    codigoEsperado: "QUANTIDADE_MAXIMA_EXCEDIDA",
  },
];

for (const cenario of cenarios) {
  test(cenario.descricao, async ({ request }) => {
    const resposta = await request.post(`${BASE_URL}api/carrinho/calcular`, {
      data: {
        itens: [
          {
            produtoId: "P001",
            quantidade: cenario.quantidade,
          },
        ],
      },
    });
    expect(resposta.status()).toBe(cenario.statusEsperado);

    if (cenario.codigoEsperado !== null) {
      const corpo = await resposta.json();

      expect(corpo.codigo).toBe(cenario.codigoEsperado);
    }
  });
}
