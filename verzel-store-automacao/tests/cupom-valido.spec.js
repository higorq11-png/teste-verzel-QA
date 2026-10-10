
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

const variacoesCupom = [
  {
    descricao: 'cupom em letras maiúsculas',
    cupom: 'BEMVINDO10',
    valido: true,
  },
  {
    descricao: 'cupom em letras minúsculas',
    cupom: 'bemvindo10',
    valido: true,
  },
  {
    descricao: 'cupom com maiúsculas e minúsculas',
    cupom: 'BemVinDo10',
    valido: true,
  },
  
  {
    descricao: 'cupom com espaço antes',
    cupom: ' BEMVINDO10',
    valido: true,
  },
  {
    descricao: 'cupom com espaço depois',
    cupom: 'BEMVINDO10 ',
    valido: true,
  },
];

for (const variacao of variacoesCupom) {
  test(`deve aceitar ${variacao.descricao}`, async ({ page }) => {
    
    await page.goto(BASE_URL);

    
    await page.getByRole('article', { name: 'Camiseta Essencial' }).getByRole('button').click();

    
    await page.locator('.link-carrinho').click();

    
    await page.getByRole('textbox', { name: 'Cupom de desconto' }).fill(variacao.cupom);

    await page.getByRole('button', { name: 'Aplicar cupom' }).click();

    
    await expect(page.locator('[data-valor="subtotal"]')).toHaveText('R$ 59,90');

    if (variacao.valido) {
      
      await expect(page.locator('[data-valor="desconto"]')).toHaveText('- R$ 5,99');
      
      await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 73,81');
    }
  });
}