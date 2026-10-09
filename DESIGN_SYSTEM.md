# Art-Liz Design System

Documentação de arquitetura, desenvolvimento e publicação do `art-liz-design-system`.

## Objetivo

O Art-Liz Design System é a base visual compartilhada pelos sistemas web pessoais. A intenção é manter componentes e decisões de design reutilizáveis no núcleo, permitindo criar UI Kits separados quando um projeto específico precisar de uma identidade ou comportamento próprio.

O repositório é um monorepo npm. Cada biblioteca publicável vive em `packages/`; aplicações de desenvolvimento e documentação vivem em `apps/`.

## Decisões atuais

- **Linguagem e UI:** React com TypeScript.
- **Estilização:** Emotion (`@emotion/react` e `@emotion/styled`).
- **Build:** Vite em modo de biblioteca para os pacotes e para aplicações.
- **Testes:** Vitest, Testing Library e jsdom.
- **Documentação visual:** Storybook com integração Vite.
- **Ícones:** Phosphor Icons (`@phosphor-icons/react`) no catálogo e nas stories; componentes React recebem ícones via `ReactNode` e não acoplam consumidores à biblioteca.
- **Gerenciador e publicação:** npm, npm workspaces e pacotes com escopo `@art-liz`.
- **Task runner:** scripts npm e workspaces; Nx/Turborepo não são necessários para a escala atual.
- **Versões:** Changesets para registrar mudanças e versionar pacotes.
- **Homologação e produção:** builds separados do Storybook e tags npm `beta` e `latest`.
- **GitFlow:** `develop` é a branch padrão/homologação; `main` representa produção. PRs para `main` só podem vir de `develop`; PRs para `develop` aceitam qualquer branch.
- **Qualidade:** ESLint flat compartilhado com comando por workspace, Prettier, format-on-save no VS Code e Husky/lint-staged no pre-commit.

Essas decisões descrevem a base atual. Novas dependências devem ser adicionadas quando houver uma necessidade concreta de produto ou desenvolvimento.

## Estrutura do repositório

```text
apps/
  playground/       Aplicação Vite para experimentar os pacotes como consumidor
  storybook/        Catálogo de componentes e documentação interativa
packages/
  create-app/       CLI npm e template monolítico para novos projetos React
  tokens/           Tokens de design sem dependência de React
  react/            Componentes React compartilhados e estilos Emotion
```

O glob `packages/*` permite adicionar UI Kits no futuro. Por exemplo, um kit específico pode ser criado como `packages/ui-kit-nome-do-projeto`, publicado separadamente e composto sobre `@art-liz/tokens` e `@art-liz/react`.

O pacote `@art-liz/create-app` contém o bin `create-app` e o scaffold em `template/`. O projeto gerado é um repositório React independente, não outro workspace do monorepo. Após a publicação do CLI e dos pacotes base, o uso será `npm create @art-liz/app@latest nome-do-projeto`; `--tag beta` seleciona dependências beta do Design System. Antes disso, o template pode ser exercitado localmente com `node packages/create-app/bin/create-app.js nome-do-projeto --no-install --no-git`. Novos projetos recebem as versões da tag no momento da criação; projetos existentes atualizam suas dependências explicitamente com npm. O template inclui Vite, React/TypeScript, React Router, Zustand, TanStack Query, Vitest/Testing Library, ESLint, Prettier e Husky/lint-staged. Storybook é opcional e fica fora do scaffold inicial.

## Responsabilidade dos pacotes

### `@art-liz/tokens`

Contém valores reutilizáveis e independentes de framework, como cores, espaçamentos, raios de borda, tipografia, sombras, foco, movimento, breakpoints e camadas de z-index. Os tokens atuais são um ponto inicial, não uma especificação visual definitiva.

Os tokens ficam organizados por família em `packages/tokens/src/`, por exemplo `colors.ts`, `spacing.ts`, `radii.ts`, `typography.ts`, `shadows.ts`, `focus.ts`, `motion.ts`, `breakpoints.ts` e `zIndices.ts`. O arquivo `index.ts` é o ponto público do pacote e agrega as famílias exportadas, preservando também o objeto `tokens`.

A família `colors` usa escalas de `50` a `900` para `neutral`, `primary`, `auxiliary`, `danger`, `warning`, `success` e `info`. Os tons `50` a `700` seguem a referência visual inicial; `800` e `900` completam cada escala com tons mais escuros equivalentes.

A tipografia define uma fonte padrão para componentes em `typography.fontFamilies.component`, mas permite troca pelo produto consumidor com a variável CSS `--art-liz-font-family`. Por exemplo, um projeto pode definir `:root { --art-liz-font-family: "Roboto", sans-serif; }` para aplicar outra fonte aos componentes sem alterar a biblioteca.

As cores também são exportadas como valores CSS sobrescrevíveis. `colors.primary[50]`, por exemplo, resolve para `var(--art-liz-color-primary-50, #f9ffff)`. Um consumidor pode trocar um token isolado:

```css
:root {
  --art-liz-color-primary-50: #faf5ff;
}
```

Ou pode trocar uma família inteira definindo todos os tons do grupo:

```css
:root {
  --art-liz-color-primary-50: #faf5ff;
  --art-liz-color-primary-100: #f3e8ff;
  --art-liz-color-primary-200: #e9d5ff;
  --art-liz-color-primary-300: #d8b4fe;
  --art-liz-color-primary-400: #c084fc;
  --art-liz-color-primary-500: #a855f7;
  --art-liz-color-primary-600: #9333ea;
  --art-liz-color-primary-700: #7e22ce;
  --art-liz-color-primary-800: #6b21a8;
  --art-liz-color-primary-900: #581c87;
}
```

Para documentação visual, o Storybook inclui páginas em `Tokens/*` para cores, tipografia, espaçamento, raios, sombras, foco, movimento, breakpoints e z-index. As páginas mostram valores, exemplos e playgrounds de sobrescrita quando aplicável.

### `@art-liz/react`

Contém componentes acessíveis e reutilizáveis para React. O pacote importa tokens e mantém React e Emotion como `peerDependencies`, evitando incorporá-los como cópias privadas da biblioteca no projeto consumidor.

Os componentes React ficam organizados em `packages/react/src/<Component>/`, com implementação, estilos, story e testes juntos. Cada pasta tem um `index.ts` e o `packages/react/src/index.ts` agrega a API pública do pacote.

O componente `Box` é um contêiner `div` com padding por tokens de espaçamento e opções de fundo, raio e sombra. Cada opção visual é independente e opcional; atributos nativos de `div` e `children` são encaminhados ao elemento.

O componente `Container` centraliza conteúdo com largura fluida e gutters horizontais de `spacing[4]` por padrão. A prop `maxWidth` escolhe um limite baseado nos breakpoints `sm`, `md`, `lg` e `xl`, ou `full` para ocupar toda a largura disponível; o padrão é `xl`. `background` aceita tokens escalares (`white`, `black`, `paper` etc.) e tokens de escala no formato `primary.600`; `padding` e `margin` aceitam valores da escala `spacing`, e `margin` também aceita `auto` (padrão centralizado). Use `Container` para limitar a largura da página e `Box` para compor superfícies dentro dele.

O componente `Text` aplica os padrões tipográficos definidos em `typography.textStyles`: `h1` (30/38), `h2` (24/32), `h3` (20/28), `title` (18/26), `subtitle` (16/24), `body` (14/22) e `caption` (12/18), em pixels com base de 16px. `variant` seleciona o padrão, `weight` escolhe um token de peso, `color` escolhe uma cor do sistema de tokens, `fontFamily` aceita aliases `component`/`sans`/`mono` ou uma stack CSS personalizada, e `as` escolhe o elemento HTML semântico (`h1`, `p`, `span` etc.). Fontes externas precisam ser carregadas pelo produto consumidor. A escala de tamanho continua centralizada em `typography.fontSizes`.

O componente inicial é `Button`, com aparências `primary`, `outline`, `ghost` e `link`; intents semânticos `primary`, `danger`, `success`, `info` e `warning`; tamanhos `small`, `medium` e `large`; slots opcionais `startIcon`/`endIcon`; suporte aos atributos nativos; e estados hover, pressed, focus-visible e disabled para todas as combinações. Cada par intent/variant define suas próprias cores para base, hover, active e disabled, sem propagar escolhas entre combinações. A paleta de `primary` preserva as escolhas visuais do projeto; contrastes devem ser avaliados de acordo com os tokens definidos pelo produto consumidor. Os rótulos do Button usam `Text`: `body` em `small`, `subtitle` em `medium` e `title` em `large`, herdando a cor do intent. Ícones decorativos são ocultos da árvore acessível; quando o Button não tem conteúdo textual, `aria-label` ou `aria-labelledby` é obrigatório. O tamanho do ícone é `md` em `small`, `xl` no padrão `medium` e `2xl` em `large`. Cada componente separa implementação (`Component.tsx`) e estilos Emotion (`Component.style.ts`); estilos podem importar tipos do componente usando `import type`.

Fontes: `packages/react/src/` e `packages/react/package.json`.

### Baseline de acessibilidade e validação

Componentes interativos usam elementos HTML nativos, labels explícitos para campos, nomes acessíveis para ações sem texto e foco visível pelos tokens de `focus`. Estados `disabled`, `required` e `readOnly` preservam a semântica nativa. Testes usam Testing Library e `user-event` para nomes acessíveis, ordem de Tab e ativação de botões por Enter/Espaço. jsdom valida comportamento e semântica, mas não renderiza o indicador visual de pseudo-classe; confirme o anel de foco em navegador no Storybook. O projeto ainda não inclui axe ou execução de navegador headless; contraste e aparência de foco permanecem verificações manuais até haver ferramenta e CI de navegador configurados.

### `@art-liz/storybook`

Aplicação privada de desenvolvimento que reúne stories dos pacotes. As stories ficam junto dos componentes para facilitar a manutenção e o Storybook as descobre pela configuração em `apps/storybook/.storybook/main.ts`.

### `@art-liz/playground`

Aplicação Vite privada usada para testar o pacote React em um consumidor real, fora do ambiente do Storybook.

## Ícones

Phosphor Icons (`@phosphor-icons/react`, licença MIT) é a biblioteca adotada para o catálogo visual e os exemplos do design system. É dependência de runtime de `apps/storybook` e dependência de desenvolvimento de `packages/react` para as stories co-localizadas; o pacote público `@art-liz/react` permanece agnóstico em runtime e recebe ícones como `ReactNode` por `startIcon`/`endIcon`.

O catálogo `Foundations/Icons` importa ícones por subpath para reduzir o trabalho do Vite e mostra um ícone por vez. Seus controles selecionam o nome do ícone, o tamanho pela escala `typography.fontSizes` (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`), peso (`thin`, `light`, `regular`, `bold`, `fill`, `duotone`) e origem da cor: paleta semântica do DS ou HEX customizado para casos especiais. O line-height do preview acompanha o tamanho selecionado. Phosphor usa `currentColor` por padrão, então ícones nos botões acompanham a cor do texto; `size="1em"` mantém alinhamento com a tipografia do botão.

Ícones decorativos nos slots do Button recebem `aria-hidden`. Um Button sem conteúdo textual precisa de nome acessível por `aria-label` ou `aria-labelledby`. Evite controles Storybook para elementos React: crie o JSX da story no `render`, pois Controls serializam args.

## Instalação e desenvolvimento

Execute a partir da raiz do repositório:

```sh
npm install
```

Inicie o playground:

```sh
npm run dev --workspace @art-liz/playground
```

Inicie o Storybook:

```sh
npm run storybook
```

O comando de Storybook compila tokens e componentes antes de iniciar o servidor em <http://localhost:6006>.

## Criar ou alterar um componente

1. Crie `packages/react/src/Component/` e coloque a API e o comportamento em `Component.tsx`.
2. Coloque os estilos Emotion em `Component.style.ts` e reutilize tokens sempre que aplicável.
3. Se estilos precisarem dos tipos definidos pelo componente, importe-os usando `import type`.
4. Exporte o componente e seus tipos no `index.ts` da pasta e reexporte-os em `packages/react/src/index.ts`.
5. Adicione ou atualize uma story ao lado do componente para documentar variantes e estados.
6. Adicione testes focados no comportamento observável em `packages/react/src/`.
7. Use o playground para confirmar a integração fora do Storybook.

Componentes compartilhados devem evitar decisões específicas de um único sistema. Se uma solução depender do domínio ou identidade de um projeto, considere colocá-la em um UI Kit próprio.

## Testes, lint e builds

```sh
npm test
npm run lint
npm run format
npm run format:check
npm run build
npm run ci
```

- `npm test` compila tokens e executa os testes Vitest do pacote React.
- `npm run lint` executa ESLint em cada workspace e valida sintaxe do script shell.
- `npm run format` aplica Prettier; `npm run format:check` verifica o padrão sem modificar arquivos.
- `npm run build` compila tokens, empacota o React e compila o playground.

Os pacotes React e tokens são compilados antes do Storybook para que os workspaces consumam seus artefatos `dist`.

`npm run ci` reúne os gates locais que o workflow do GitHub executa: testes, lint, formatação, build integrado e builds do Storybook para homologação e produção. O check reportado pelo workflow chama-se `Quality gates`.

O VS Code aplica Prettier ao salvar arquivos cobertos por `.vscode/settings.json` e recomenda as extensões Prettier e ESLint. Husky/lint-staged executa ESLint autofix e Prettier somente nos arquivos staged durante o pre-commit. Não há pre-push: a validação completa é feita pelo CI obrigatório em PRs.

## Ícones

O Storybook mantém um catálogo de ícones Phosphor em `Foundations/Icons`, com controles para cor, tamanho e peso (`thin`, `light`, `regular`, `bold`, `fill`, `duotone`). As stories importam ícones por subpath para não carregar o barrel completo. `@art-liz/react` declara Phosphor como dependência de desenvolvimento para compilar suas stories; consumidores passam seus próprios componentes de ícone pelos slots genéricos `startIcon` e `endIcon`, sem dependência de Phosphor em runtime.

## Trabalho com Codex

O Codex deve começar por `AGENTS.md`, que registra instruções persistentes do repositório e aponta para esta documentação. O código e os manifests atuais prevalecem sobre o histórico de conversas. Para uma tarefa vinculada a issue, confira critérios de aceite, trabalhe em branch baseada em `develop`, preserve alterações locais e execute os checks relevantes antes de propor PR. Não publique, faça deploy, altere rulesets remotos, nem crie commit/merge sem autorização explícita.

## GitFlow e template de branches

O contrato do fluxo e os arquivos reutilizáveis estão em `.github/workflows/` e `templates/gitflow/README.md`.

- `main`: produção; aceita apenas PRs cuja origem seja `develop`.
- `develop`: homologação e branch padrão; aceita PRs de qualquer branch.
- Ambas: PR obrigatório, checks `Quality gates` e `Allowed source branch`, sem bypass administrativo, force-push ou exclusão.

O workflow `PR branch policy` falha se um PR destinado a `main` vier de outra branch que não `develop`. O script `scripts/setup-gitflow.sh` cria rulesets via API REST, pode criar `develop`, ativa exclusão automática de branches mescladas e define `develop` como default por último. Ele executa dry run por padrão e requer `--apply` mais confirmação literal. Rulesets existentes com os nomes esperados só são substituídos com `--replace-rulesets`.

No estado remoto confirmado em 2026-09-29, `develop` é a branch padrão e `main` continua sendo produção. Ambas têm rulesets ativos exigindo PR e os checks `Quality gates` e `Allowed source branch`, sem bypass, force-push ou exclusão. `delete_branch_on_merge` está habilitado. O PR #11 (`initial_config` -> `develop`) foi mesclado com os dois checks aprovados. Confirme o GitHub antes de assumir que esse estado não mudou. O script reutilizável cria rulesets de repositório e mantém os existentes por padrão; use `--replace-rulesets` apenas após revisar o diff/configuração.

## Storybook: homologação e produção

Gere os dois exports estáticos separadamente:

```sh
npm run build:storybook:homolog
npm run build:storybook:prod
```

Saídas:

- Homologação: `storybook-static/homolog`
- Produção: `storybook-static/prod`

Os comandos produzem o Storybook estático para publicação em destinos de hospedagem distintos. Atualmente, ambos usam a mesma configuração e as mesmas stories; a separação é de artefato/destino, não de conteúdo. Nenhum provedor de hospedagem ou pipeline de deploy está configurado ainda.

## Publicação npm

Os pacotes destinados à publicação são:

- `@art-liz/tokens`
- `@art-liz/react`
- `@art-liz/create-app`

Os três pacotes declaram acesso público. É necessário ter uma conta npm autenticada e permissão para publicar no escopo `@art-liz`. Nenhuma publicação é feita automaticamente até a primeira publicação estável dos três pacotes, a configuração dos Trusted Publishers no npm e a ativação da variável de repositório `NPM_RELEASES_ENABLED=true`.

Antes de habilitar os workflows, valide os tarballs em instalação limpa:

```sh
npm run release:verify
```

Como o escopo npm ainda não foi inicializado, a primeira publicação estável é manual e só deve ocorrer depois dessa validação. Publique `tokens`, depois `react` e por fim `create-app`:

```sh
npm publish --workspace @art-liz/tokens --access public
npm publish --workspace @art-liz/react --access public
npm publish --workspace @art-liz/create-app --access public
```

Em seguida, configure cada pacote no npm para Trusted Publishing com os workflows `publish-beta.yml`/ambiente `npm-beta` e `publish-stable.yml`/ambiente `npm-production`. O publisher precisa permitir `npm publish`; a primeira publicação de cada configuração confiável deve acontecer em até dois dias após criá-la.

## Releases automatizados

Cada mudança publicável recebe um Changeset. O workflow `changesets-version.yml` abre/atualiza uma PR de versionamento em `develop`. O workflow `publish-beta.yml` usa `changeset version --snapshot beta` e publica snapshots `0.0.0-beta-*` na dist-tag `beta`; as versões snapshot não são commitadas. A promoção aprovada de `develop` para `main` aciona `publish-stable.yml`, que publica as versões estáveis com a dist-tag `latest` após aprovação no environment protegido `npm-production`.

Configure no GitHub o environment `npm-beta` e o environment `npm-production` com required reviewers. Mantenha `NPM_RELEASES_ENABLED` ausente/falso até concluir a publicação inicial e cadastrar os Trusted Publishers. Para a action de versionamento criar PRs, habilite em Settings → Actions → General a opção que permite ao GitHub Actions criar PRs. PRs criadas com `GITHUB_TOKEN` podem não iniciar outros workflows automaticamente; nesse caso, rode `Quality gates` pelo `workflow_dispatch` ou configure um GitHub App token.

Não configure `NPM_TOKEN`: os jobs de publicação usam OIDC e limitam `id-token: write` ao job que publica. O workflow beta publica `tokens`/`react`/`create-app`; o workflow estável usa os manifests versionados pela PR de Changesets e publica na ordem declarada pelas dependências. A issue #6 permanece aberta até confirmar acesso ao escopo e concluir a primeira instalação a partir do registry.

O beta usa snapshots efêmeros (`0.0.0-beta-*`) e dist-tag `beta`; stable publica versões sem snapshot como `latest`. Para interromper releases automáticos, remova ou desative a variável `NPM_RELEASES_ENABLED`. Um snapshot beta problemático é substituído por outro; uma versão stable é corrigida com novo Changeset patch e promoção aprovada para `main`.

Instalação pelo consumidor:

```sh
npm install @art-liz/react@beta
npm install @art-liz/react
```

O primeiro comando seleciona a versão beta; o segundo seleciona a versão estável. Como `@art-liz/react` depende de `@art-liz/tokens`, publique os tokens antes de publicar uma versão do React que dependa deles.

## Resolução de pacotes locais

Os workspaces npm vinculam os pacotes do monorepo localmente. Os campos `exports` dos pacotes apontam para os artefatos compilados em `dist`, portanto compile os pacotes antes de usar o Storybook, fazer o build do playground ou publicar.

Se o Vite não resolver um import local após uma instalação ou alteração nas dependências, encerre o servidor antigo e reinicie com otimização forçada:

```sh
npm run dev --workspace @art-liz/playground -- --force
```

Esse passo limpa a otimização/cache de dependências do processo de desenvolvimento. Ele não substitui a compilação dos pacotes quando os arquivos de `dist` ainda não existem.

## UI Kits futuros

UI Kits específicos devem ser adicionados como pacotes independentes em `packages/`, com nome e escopo consistentes, por exemplo `@art-liz/ui-kit-nome-do-projeto`. Um kit pode depender de tokens e componentes base, acrescentando composições, regras ou identidade próprias do sistema correspondente.

Antes de criar um UI Kit, confirme que existe um conjunto real de componentes ou decisões que não pertence ao núcleo. Isso evita criar pacotes vazios e evita acoplar requisitos de um sistema aos consumidores dos demais.

## Agentes e automação

Agentes especializados não são necessários para a fase atual. Codex e outros agentes devem usar o contexto em `AGENTS.md` e seguir a separação por pacote. CI e rulesets GitFlow já estão configurados; deploy do Storybook e publicação npm automatizada ainda dependem de decisões sobre ambientes, hosting e credenciais.

## Itens ainda em aberto

- Definir escalas completas de tipografia, cores, espaçamento e elevação.
- Definir temas e estratégia para modo claro/escuro, se os produtos precisarem.
- Estabelecer critérios de acessibilidade e compatibilidade de navegadores para os componentes.
- Ampliar cobertura de testes e validação dos artefatos npm.
- Escolher hospedagem e configurar deploy separado do Storybook de homologação e produção.
- Confirmar disponibilidade e controle do escopo `@art-liz` no npm antes da primeira publicação.
