# Teste Técnico de QA — Verzel Store

Este repositório reúne os artefatos desenvolvidos para o teste técnico de QA da Verzel, incluindo cenários e evidências de execução, relatórios de bugs, testes de API e automações com Playwright.

## Organização dos artefatos

### Cenários de teste, execução e evidências

Para este teste individual, utilizei uma planilha Excel com links para as evidências, priorizando velocidade de elaboração e portabilidade. Em um ambiente de equipe, consideraria ferramentas como TestRail ou Xray integrado ao Jira, que oferecem maior praticidade para centralizar e acompanhar cenários, execuções e resultados.

### Bug reports

Os bugs identificados foram documentados em dois formatos:

- **Excel:** mantém o mesmo padrão dos demais artefatos. Na planilha de testes, a célula em que o bug é mencionado contém um link para o respectivo relatório.
- **PowerPoint:** apresenta os bugs e suas evidências em formato de apresentação, permitindo uma consulta visual sem a necessidade de abrir links externos.

### Testes de API

Os testes de API foram realizados no Postman. A coleção exportada com as requisições está no arquivo `Verzel Store - QA.postman_collection.json`.

### Testes automatizados

As automações foram desenvolvidas com **Playwright** e estão no diretório `verzel-store-automacao/`. Os testes cobrem regras de cupons, cálculo de descontos, frete grátis, limite de quantidade e aplicação de múltiplos cupons.

## Como acessar e executar os testes automatizados

### 1. Acessar os arquivos

1. Abra o [repositório do projeto no GitHub](https://github.com/higorq11-png/teste-verzel-QA).
2. Faça download da pasta `verzel-store-automacao/`.
3. Abra a pasta `tests/` para consultar os arquivos de automação.

Os arquivos de teste são:

| Arquivo | Objetivo |
|---|---|
| `cupom-valido.spec.js` | Testes relacionados à aplicação de cupom válido. |
| `desconto-correto.spec.js` | Verificação do cálculo do desconto aplicado. |
| `frete-gratis.spec.js` | Testes das regras e condições de frete grátis. |
| `limite-quantidade.spec.js` | Testes do limite de quantidade de itens. |
| `multiplos-cupons.spec.js` | Verificação do comportamento da API diante da aplicação de múltiplos cupons. |

### 2. Preparar o ambiente local

É necessário ter o **Node.js** instalado. Baixe a versão LTS em [nodejs.org](https://nodejs.org/).

Abra um terminal na pasta `verzel-store-automacao/`. Para isso, você pode abrir a pasta no VS Code e selecionar **Terminal → Novo Terminal**.

Instale as dependências do projeto:

```bash
npm install
```

Caso o navegador necessário ainda não esteja instalado para o Playwright, execute:

```bash
npx playwright install
```

### 3. Executar as automações

Para executar todos os testes:

```bash
npx playwright test
```

Para executar apenas um arquivo específico, utilize, por exemplo:

```bash
npx playwright test tests/NOME-DO-TESTE.spec.js
```



### 4. Consultar os resultados

A configuração atual utiliza o reporter `list`, que apresenta os resultados diretamente no terminal. Para visualizar um relatório HTML de uma execução, após executer os testes rode:

```bash
npx playwright show-report
```

O Playwright abrirá o relatório HTML no navegador, permitindo consultar os resultados da execução.

## Observações

- Os testes automatizados acessam a aplicação de QA da Verzel Store e sua API; portanto, a disponibilidade do ambiente remoto é necessária para a execução.
- Os resultados podem variar caso o ambiente de teste ou os dados da aplicação sejam alterados.
- Os arquivos de automação devem ser executados a partir do diretório `verzel-store-automacao/`, onde estão o `package.json` e a configuração do Playwright.


