# Contexto para IAs e agentes

Este arquivo é o ponto de entrada para assistentes de programação que trabalhem neste repositório, incluindo OpenAI Codex. Codex lê `AGENTS.md` para receber instruções do projeto; não é necessário manter um segundo arquivo `CODEX.md`. Leia este arquivo e [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) antes de alterar arquivos, e confirme sempre manifests e código atuais: arquivos e dependências podem ter mudado desde a última conversa.

## Identidade e objetivo

- Projeto: `art-liz-design-system`.
- Objetivo: criar um design system para os sistemas web pessoais e, quando necessário, UI Kits separados para projetos específicos.
- A pessoa usuária quer preservar decisões e contexto no próprio repositório, porque o histórico das conversas pode não estar disponível em sessões futuras.
- Responda em português do Brasil, a menos que a pessoa peça outro idioma.

## Fonte de verdade

Priorize as fontes nesta ordem:

1. Código, manifests e configuração atuais do repositório.
2. Este arquivo (`AGENTS.md`) para contexto e regras de colaboração com agentes.
3. [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) para arquitetura, fluxos e decisões registradas.
4. Histórico de conversa, se estiver disponível.

Quando uma decisão mudar, atualize a documentação correspondente no mesmo trabalho. Não presuma que uma resposta anterior ainda descreve o código atual.

## Arquitetura registrada

- Monorepo com npm workspaces: `apps/*` e `packages/*`.
- React + TypeScript.
- Emotion para estilos (`@emotion/react` e `@emotion/styled`).
- Vite para desenvolvimento e build.
- Vitest, Testing Library e jsdom para testes.
- Storybook com Vite para catálogo, documentação visual, addon de acessibilidade e testes de stories via Vitest em navegador.
- Ícones são consumidos pelo catálogo `Icons` do DS: componentes internos usam `import * as Icons from '../Icons'`; aplicações e o catálogo do Storybook usam `import { Icons } from '@art-liz/react'`. Button conserva slots ReactNode (`startIcon`/`endIcon`), preenchidos com elementos como `<Icons.PlusIcon />`. Phosphor é dependência de runtime apenas como implementação centralizada em `packages/react/src/Icons`; não importar o fornecedor fora dessa pasta. ESLint verifica essa fronteira. Assets Figma de Input/Checkbox permanecem intactos e são acessados por Icons/assets. Não usar caracteres como substitutos de ícones.
- Changesets para controle de versões. PRs de versionamento do github-actions[bot], da branch exata changeset-release/develop para develop no mesmo repositório, recebem auto-merge squash após os checks obrigatórios. A validação e o disparo dos checks ficam em scripts/release-automerge.mjs; não usar bypass administrativo nem reduzir os gates. A opção Allow auto-merge precisa estar habilitada no GitHub.
- `packages/create-app`: CLI npm que distribui um template monolítico React + Vite para projetos consumidores. A tela inicial demonstra os componentes atuais, com estilos próprios em HomePage.style.ts, criação local em Dialog, abas, preferências e estado Zustand. Os componentes são importados do pacote completo; não são copiados individualmente para o app.
- Pacotes publicáveis planejados: `@art-liz/tokens`, `@art-liz/react` e `@art-liz/create-app`.
- Publicação de homologação usa a tag npm `beta`; publicação estável usa `latest`. Os dois workflows instalam Chromium/Playwright antes do gate completo. Testes do create-app devem passar também após changeset version --snapshot beta: casos de stable/pré-release usam cópias com versões explícitas e não presumem que o manifest corrente seja estável.
- O workflow `publish-beta.yml` tem uma recuperação manual por `workflow_dispatch` com `publish-current=true` para publicar snapshots pré-release das versões atuais ainda ausentes do npm quando os changesets já foram consumidos.
- Versões pré-release de `@art-liz/create-app` usam dependências `@art-liz/react` e `@art-liz/tokens` na tag `beta` por padrão; versões estáveis usam `latest`. O usuário ainda pode sobrescrever com `--tag latest|beta`.
- O Storybook tem builds estáticos separados para homologação e produção e deploy automático no GitHub Pages via `.github/workflows/deploy-storybook.yml`.
- ESLint flat compartilhado na raiz, scripts de lint por workspace, Prettier com format-on-save e Husky/lint-staged seguido de check:commit no pre-commit (testes, stories, lint, formatação e build).
- UI Kits de projetos específicos devem ser pacotes independentes em `packages/` e depender do núcleo apenas quando isso fizer sentido.
- O fluxo GitFlow usa `develop` como branch padrão/homologação e `main` como produção; PRs para `main` só podem vir de `develop`, PRs para `develop` aceitam qualquer origem.
- `main` e `develop` estão protegidas contra push direto, force-push, exclusão e bypass administrativo; ambas exigem os checks `Quality gates` e `Allowed source branch`.
- O PR #11 (`initial_config` -> `develop`) foi mesclado e seus checks passaram; confirme o estado remoto antes de continuar o bootstrap.
- O template de GitFlow reutilizável fica em `templates/gitflow/README.md`; o bootstrap remoto cria rulesets, tem dry run em `scripts/setup-gitflow.sh` e permite substituir os rulesets de nome esperado apenas com `--replace-rulesets`.
- A exclusão automática de branches após merge está habilitada; rulesets de `main` e `develop` bloqueiam a exclusão dessas duas branches.
- Agentes especializados não são necessários neste estágio; não criar agentes, workflows ou automações extras sem necessidade clara.

## Mapa do repositório

- `packages/tokens`: valores de design compartilhados e sem dependência de React.
- `packages/react`: componentes React reutilizáveis, suas stories e testes.
- `packages/create-app`: CLI `@art-liz/create-app` e projeto modelo autocontido em `template/`.
- `apps/storybook`: configuração e execução local do Storybook.
- `apps/playground`: app Vite usado como consumidor de teste.
- `DESIGN_SYSTEM.md`: documentação completa para pessoas desenvolvedoras.
- `GITBOOK.md`: configuração, canais e estado da integração GitBook; os guias versionados ficam em `docs/gitbook/`, com sumário e configuração de espaço locais.
- `FIGMA_INVENTORY.md`: referência Figma, inventário com níveis de evidência, mapeamento e primeira etapa proposta; `docs/figma-inventory.json` preserva o snapshot e IDs para evitar consultas repetidas.
- `templates/gitflow/README.md`: instruções para adotar o fluxo em outros repositórios.
- `README.md`: início rápido e comandos mais usados.

## Comandos principais

Execute na raiz:

```sh
npm install
npm run storybook
npm run dev --workspace @art-liz/playground
npm test
npm run test:storybook
npm run lint
npm run format
npm run format:check
npm run check:commit
npm run ci
npm run build
npm run build:storybook:homolog
npm run build:storybook:prod
```

`npm run storybook` compila tokens e React antes de iniciar o servidor Storybook. `npm run test:storybook` também compila tokens e React antes de executar as stories em modo browser com Vitest e Playwright/Chromium. Preserve essa preparação: o catálogo Icons consome o export público de @art-liz/react em dist e o CI parte de checkout limpo. Os builds estáticos ficam em `storybook-static/homolog` e `storybook-static/prod`. Confira `package.json` antes de citar comandos, pois scripts podem ser alterados.

## Regras ao implementar

- Faça mudanças pequenas e alinhadas ao estilo e às abstrações existentes.
- Não invente APIs públicas, requisitos visuais ou decisões de arquitetura sem base no pedido, no código ou na documentação.
- Prefira tokens compartilhados a valores visuais duplicados. Os tokens atuais são iniciais, não uma especificação final.
- Componentes do pacote React devem ser genéricos e úteis a mais de um produto. Regras específicas de um sistema pertencem ao UI Kit correspondente.
- Alterações nos workflows e proteções do GitHub devem respeitar o fluxo GitFlow registrado e preservar os gates obrigatórios de CI.
- ESLint é compartilhado na raiz, mas cada workspace mantém um script `lint` de escopo local; Prettier é o formatador e o pre-commit executa lint-staged nos arquivos staged, seguido de npm run check:commit: testes dos pacotes, stories do Storybook, lint, format:check e build. Falhas interrompem o commit. O template do create-app segue a mesma regra, sem Storybook. Essa validação local foi solicitada pela pessoa usuária; não reduzi-la a lint-staged isolado.
- Não adicionar pre-push com a suíte completa: CI nos PRs e branches protegidas é a validação definitiva.
- Para formatar manualmente, use `npm run format`; para verificar sem modificar, use `npm run format:check`.
- Ao trabalhar como Codex, consulte os critérios da issue ativa, implemente na branch de trabalho baseada em `develop`, rode a verificação específica e o gate apropriado, e não faça commit/push/merge sem pedido explícito.
- Separe implementação e estilos dos componentes React: `Component.tsx` contém API e comportamento; `Component.style.ts` contém os estilos Emotion e seus elementos estilizados.
- Ao referenciar tipos do componente no arquivo de estilos, use `import type` para não criar uma dependência de runtime circular.
- Para novos componentes, avalie export público, story, teste de comportamento e uso no playground. Inclua também `Component.mdx` com a página Documentação vinculada às stories por `Meta of`: finalidade, importação, exemplo completo de uso e orientações relevantes.
- Mantenha React e Emotion como dependências peer do pacote de componentes; confira os manifests antes de mudar essa estratégia.
- Não publique pacotes, altere credenciais, faça deploy ou execute ações externas sem solicitação explícita.
- Não crie commits ou inicialize Git sem pedido. Este workspace já tem Git e remoto configurados; confirme branch atual, mudanças locais e permissões antes de operar no histórico ou no remoto.
- Nunca reverta mudanças do usuário. Antes de editar um arquivo que tenha sido alterado durante a sessão, leia seu estado atual e trabalhe sobre ele.
- Após uma alteração, rode a verificação mais específica disponível e informe o que foi validado e o que não foi.

## Workspace local

Pacotes internos usam workspaces e seus `exports` podem apontar para `dist`. Se o Vite não resolver um pacote depois de alterar ou instalar dependências, confirme que o pacote foi compilado e reinicie o dev server; para o playground:

```sh
npm run dev --workspace @art-liz/playground -- --force
```

Não trate o reinício como correção de código se um build limpo também falhar: nesse caso investigue package names, workspaces, `exports`, artefatos e lockfile.

## Baseline e validações históricas

- O pacote de tokens exporta cores, espaçamentos e raios iniciais.
- O pacote React contém o componente `Button`, com aparências `primary`, `outline`, `ghost` e `link`, e intents semânticos `primary`, `danger`, `success`, `info` e `warning`.
- O pacote React contém 37 componentes após as duas expansões em lote, incluindo `Box`, `Container`, `Text`, `Input` e `Checkbox`; a lista atual está em `packages/react/src/index.ts` e `COMPONENTS.md`. Input segue as alturas Figma 24/36/40px e usa `onClear` para limpeza controlada; Checkbox tem `indeterminate` nativo. `Text` aplica as variantes tipográficas de `typography.textStyles`.
- As 34 famílias do inventário Figma têm correspondência funcional base. A última rodada inclui Cascader, DateTimePicker nativo, Transfer, Chart de barras, FilterItem, AuditStatus, Message, Popconfirm e Result; contratos/limites em `docs/remaining-component-scope.md`. Somente Input e Checkbox têm capturas detalhadas locais; o ajuste visual das 31 famílias novas permanece pendente, conforme a prioridade de tokens atuais autorizada pela pessoa usuária.
- O Storybook tem stories de Button, addon de acessibilidade, testes de stories via Vitest/Playwright e scripts de build estático para homologação e produção.
- Os testes, lint, build integrado e builds estáticos do Storybook passaram na validação inicial.
- A resolução de `@art-liz/react` no playground exigiu reiniciar o servidor Vite depois da instalação dos workspaces; o comando com `--force` passou a transformar o import para o artefato local.
- O repositório fixa npm `11.6.2` em `package.json` e nos workflows para manter instalações limpas reproduzíveis entre macOS e Linux. O workflow stable atualiza para `npm@11.21.0` apenas antes de `npm dist-tag`, porque essa operação via OIDC exige npm 11.21.0+.
- Esses resultados são registros históricos, não garantias de que o estado atual continua igual. Reexecute as verificações relevantes antes de afirmar que ainda passam.

## Movimento e documentação futura

- Transições compartilhadas ficam em packages/react/src/internal/motion.style.ts e usam os tokens existentes. Preservar prefers-reduced-motion, inert/aria-hidden na saída e as APIs nativas de dialog/popover. As animações de saída dependem de manter os componentes montados; CSS discreto é um aprimoramento progressivo.
- Alert aceita open (padrão true); Badge tem size small/medium/large (padrão small); Tooltip tem os seis intents semânticos (neutral padrão). As respectivas páginas MDX documentam os contratos.
- O plano GitBook está na issue #37 e nas tarefas #38 a #43, incluindo diagramas Mermaid. A estrutura inicial da issue #38 fica em docs/gitbook/, com SUMMARY.md, .gitbook.yaml e gitbook-docs.yaml para Site Git Sync. Na interface, Project directory é docs/gitbook/; o espaço usa content.directory ./ e a chave estável art-liz-docs. A pessoa mantenedora confirmou a sincronização inicial de Documentação com develop por captura em 19/10/2026, no commit a32a4b90 (PR #49). Atualize os guias afetados na mesma PR de uma mudança de API. Busca, links e responsividade não foram auditados pelo agente; atualização incremental, canal estável em main e publicação ainda precisam de validação/configuração. Consulte GITBOOK.md; não afirmar que o portal foi publicado nem fechar #38 apenas pela confirmação da conexão.
- A pessoa mantenedora confirmou o funcionamento da prévia inicial. Os guias da issue #39 cobrem instalação/peers, CLI, primeiro projeto com formulário/Icons/rota, atualização e desenvolvimento local. A combinação publicada usada no roteiro é CLI beta 0.0.0-beta-20261019054917, React 1.1.0 e tokens 0.2.0; não presumir que latest contém as APIs novas (na consulta, CLI 0.2.1 e React 1.0.0). O roteiro passou em app temporário gerado pelo CLI publicado: typecheck e check:commit, com cinco testes, lint, formatação e build. Resultados e limites ficam em GITBOOK.md. As páginas novas só chegam ao GitBook depois do merge e precisam de nova revisão na prévia.
- Os guias da issue #39 foram integrados pela PR #50 (bb9cad58). A issue #40 acrescenta seis páginas de fundamentos em docs/gitbook/, incluindo variáveis CSS de cores/fonte, valores fixos dos demais tokens, ausência de contrato global de ThemeProvider, Icons e acessibilidade. Os links foram conferidos no índice publicado do Storybook. Branco sobre primary.600 tem contraste de fallback aproximado de 2,12:1; documentar esse limite não corrige nem certifica o DS. As páginas novas dependem de merge e revisão no GitBook; consulte a validação e os limites em GITBOOK.md.
- Validação dos fundamentos (#40): sete snippets extraídos para consumidor temporário com React 1.1.0/tokens 0.2.0 publicados, typecheck e check:commit aprovados (nove testes, lint, formatação e build). CSS verificado por SSR; links de stories e sumário com 15 páginas conferidos. Isso não substitui a revisão visual no navegador/GitBook nem uma auditoria integral de acessibilidade.
- A pessoa usuária autorizou ampliar as próximas etapas na mesma branch docs/gitbook-foundations. As issues #41–#43 têm catálogo dos 37 componentes, quatro receitas, estado/limites, arquitetura/GitFlow/releases com três Mermaid e PNGs, contribuição e manutenção; o sumário tem 25 páginas. Consumidor publicado: 11 testes, lint, formatação e build/TS aprovados. Chromium verificou fluxos nativos, foco, teclado, movimento reduzido e 1280/390/320px; axe apontou duas ocorrências de contraste, sem mudança no runtime. As imagens Mermaid 11.12.0 foram inspecionadas. Conferir o portal atualizado após merge, inclusive busca e Mermaid, antes de concluir as issues. Evidências e responsáveis em GITBOOK.md/manutencao.md.
- Configuração remota conferida em 20/10/2026: main/develop exigem PR e os dois checks, sem bypass e sem reviews obrigatórias. npm-beta não tinha protection rules; npm-production tinha branch_policy, sem required reviewers. Não afirmar que existe aprovação humana obrigatória de environment apenas porque a documentação histórica recomendava isso. Nenhuma configuração remota foi alterada nesta etapa.

## Pendências conhecidas

Consulte a seção "Itens ainda em aberto" de `DESIGN_SYSTEM.md`. Entre as pendências estão escala visual completa e critérios de acessibilidade/cobertura.

A consulta Figma de 18/10/2026 está em [FIGMA_INVENTORY.md](FIGMA_INVENTORY.md). Foram listadas 50 páginas e inspecionados Button, Input, Checkbox, Radio e Toggle em seis chamadas de leitura, além da evidência anterior de Steps. Input Basic e Checkbox foram implementados a partir dos contextos completos e imagens em `docs/figma/`, além de Button, Text, Box e Container. Há stories, testes e formulário no playground. Radio, Switch e outras 20 famílias já possuem implementações base. A pessoa usuária autorizou em 18/10/2026 priorizar os tokens e padrões atuais para esse lote, com ajuste visual ao Figma posterior; não exigir nova captura para continuar essa implementação base. A branch foi renomeada para `feat/component-library-expansion`. Consulte os snapshots e IDs antes de gastar novas chamadas. As capturas são imutáveis; não alterar seus bytes/hashes ao formatar. Fonte configurável, largura fluida, anel de foco e texto de erro em danger.800 são adaptações do projeto; não afirmar paridade completa ou conformidade de contraste sem validação específica.

Ao concluir um trabalho que altere essas decisões ou pendências, atualize este resumo e `DESIGN_SYSTEM.md` para que a próxima sessão possa continuar sem depender desta conversa.
