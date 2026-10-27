# Teste Técnico de QA — Verzel Store

Este repositório reúne os artefatos desenvolvidos para o teste técnico de QA da Verzel, incluindo cenários e evidências de execução, relatórios de bugs, testes de API e automações com Playwright.

## Organização dos artefatos

### Cenários de teste, execução e evidências

Para este teste individual, utilizei uma planilha Excel com links para as evidências, priorizando velocidade de elaboração e portabilidade. Em um ambiente de equipe, consideraria ferramentas como TestRail ou Xray integrado ao Jira, que oferecem maior praticidade para centralizar e acompanhar cenários, execuções e resultados.

### Bug reports

Os bugs identificados foram documentados em dois formatos:

- **Excel:** mantém o mesmo padrão dos demais artefatos. Na planilha de testes, a célula em que o bug é mencionado contém um link para o respectivo relatório.
- **PowerPoint:** apresenta os bugs e suas evidências em formato de apresentação, permitindo uma consulta visual sem a necessidade de abrir links externos.

### Critérios de severidade e prioridade

Os casos de teste e os defeitos identificados foram classificados segundo duas escalas: severidade, com cinco níveis, e prioridade, com quatro níveis.

#### Severidade

A severidade representa o impacto do defeito sobre o funcionamento do sistema.

| Nível | Definição |
|---|---|
| Bloqueante | Impede uma operação essencial ou inviabiliza a continuidade de um fluxo crítico. |
| Crítica | Compromete gravemente uma regra de negócio ou funcionalidade importante. |
| Alta | Afeta significativamente uma funcionalidade ou produz resultados incorretos em um fluxo relevante. |
| Média | Apresenta impacto moderado, restrito a determinadas condições ou cenários. |
| Baixa | Apresenta impacto reduzido, sem comprometer os fluxos principais. |

#### Prioridade

A prioridade representa a urgência recomendada para a correção do defeito.

| Nível | Definição |
|---|---|
| Crítica | Exige correção imediata devido ao risco elevado ou ao comprometimento de uma operação essencial. |
| Alta | Deve ser corrigida prioritariamente, preferencialmente antes da próxima entrega. |
| Média | Deve ser corrigida conforme o planejamento, considerando riscos e recursos disponíveis. |
| Baixa | Pode ser postergada quando não representa risco significativo no curto prazo. |

As classificações são avaliadas separadamente: a severidade considera o impacto do defeito, enquanto a prioridade considera a urgência de sua correção.

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

Caso os navegadores necessários ainda não estejam instalados para o Playwright, execute:

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

A configuração atual utiliza o reporter `list`, que apresenta os resultados diretamente no terminal. Para visualizar o relatório HTML de uma execução, após executar os testes, rode:

```bash
npx playwright show-report
```

O Playwright abrirá o relatório HTML no navegador, permitindo consultar os resultados da execução.

## Observações

- Os testes automatizados acessam a aplicação de QA da Verzel Store e sua API; portanto, a disponibilidade do ambiente remoto é necessária para a execução.
- Os resultados podem variar caso o ambiente de teste ou os dados da aplicação sejam alterados.
- Os arquivos de automação devem ser executados a partir do diretório `verzel-store-automacao/`, onde estão o `package.json` e a configuração do Playwright.

## Conventional Commits

As mensagens de commit seguem a convenção Conventional Commits:

- `feat`: introduz uma nova funcionalidade na codebase.
- `fix`: corrige um bug na codebase.
- `test`: identifica alterações que afetam a estratégia, especificação, planejamento ou execução dos testes do projeto.
- `docs`: identifica alterações exclusivamente na documentação técnica, explicativa ou instrucional, sem modificar código ou testes.
- `refactor`: reestrutura ou limpa o código sem alterar seu comportamento externo.
- `chore`: identifica tarefas de manutenção e rotina que não alteram o código nem os testes.