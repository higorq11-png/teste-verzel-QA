
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

const cenarios = [
  {
    descricao: 'deve aceitar 4 unidades do mesmo produto',
    quantidade: 4,
    esperado: true,
  },
  {
    descricao: 'deve aceitar exatamente 5 unidades do mesmo produto',
    quantidade: 5,
    esperado: true,
  },
  {
    descricao: 'não deve aceitar mais que 5 unidades do mesmo produto',
    quantidade: 6,
    esperado: false,
  },
];

for (const cenario of cenarios) {test(cenario.descricao, async ({ request }) => {

    const resposta = await request.post(`${BASE_URL}api/carrinho/calcular`,{
        data: {
          itens: [
            {
              produtoId: 'P001',
              quantidade: cenario.quantidade,
            },
          ],
        },
      }
    );    
    expect(resposta.ok()).toBe(cenario.esperado);
  });
}