
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

const itens = [
  {
    produtoId: 'P003',
    quantidade: 1,
  },
];

test('Evitar aplicação do cupom várias vezes', async ({request,}) => {  
  const respostaUnico = await request.post(`${BASE_URL}api/carrinho/calcular`,{data: {itens, cupom: 'BEMVINDO10',},});

  expect(respostaUnico.ok()).toBeTruthy();

  const resultadoUnico = await respostaUnico.json();

  expect(resultadoUnico.desconto).toBeCloseTo(18.99, 2);
  expect(resultadoUnico.cupom.aplicado).toBe(true);

  const respostaDuplicado = await request.post(`${BASE_URL}api/carrinho/calcular`,{data: {itens, cupom: 'BEMVINDO10,BEMVINDO10',},});
  expect(respostaDuplicado.ok()).toBeTruthy();
  const resultadoDuplicado = await respostaDuplicado.json();
  const respostaLista = await request.post(`${BASE_URL}api/carrinho/calcular`,{data: {
        itens,
        cupons: ['BEMVINDO10', 'BEMVINDO10'],
      },
    }
  );

  expect(respostaLista.ok()).toBeTruthy();
  const resultadoLista = await respostaLista.json();
  expect(resultadoDuplicado.desconto,'A repetição do código não deve aumentar o desconto.').toBeLessThanOrEqual(resultadoUnico.desconto);
  expect(resultadoLista.desconto,'A lista de cupons não deve acumular descontos.').toBeLessThanOrEqual(resultadoUnico.desconto);  
  expect(resultadoDuplicado.total).toBeGreaterThanOrEqual(resultadoUnico.total);
  expect(resultadoLista.total).toBeGreaterThanOrEqual(resultadoUnico.total);
});
