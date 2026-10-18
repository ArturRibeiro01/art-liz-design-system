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
- **Documentação visual:** Storybook com integração Vite, docs, acessibilidade e testes de stories via Vitest em navegador.
- **Ícones:** catálogo público `Icons` do DS, usado por componentes, stories e aplicações. A integração Phosphor fica restrita a `packages/react/src/Icons`; slots públicos continuam aceitando `ReactNode`.
- **Gerenciador e publicação:** npm, npm workspaces e pacotes com escopo `@art-liz`.
- **Task runner:** scripts npm e workspaces; Nx/Turborepo não são necessários para a escala atual.
- **Versões:** Changesets para registrar mudanças e versionar pacotes.
- **Homologação e produção:** builds separados do Storybook e tags npm `beta` e `latest`.
- **GitFlow:** `develop` é a branch padrão/homologação; `main` representa produção. PRs para `main` só podem vir de `develop`; PRs para `develop` aceitam qualquer branch.
- **Qualidade:** ESLint flat compartilhado com comando por workspace, Prettier, format-on-save no VS Code e Husky/lint-staged no pre-commit.

Essas decisões descrevem a base atual. Novas dependências devem ser adicionadas quando houver uma necessidade concreta de produto ou desenvolvimento.

## Tela inicial do create-app

O template consome todos os exports da biblioteca pelo pacote `@art-liz/react`; não precisa de registro nem cópia por componente. A tela inicial usa Container, Box, Text, Badge, AuditStatus, Steps, Tabs, Form, Input, Select, Switch, Message, Tag, Popover, Tooltip, Dialog, ButtonGroup, Button e Link. O diálogo cria um projeto demonstrativo em estado local, o formulário aplica preferências à demonstração e o contador usa Zustand com incremento/reset. A navegação continua com React Router, e o provider do TanStack Query permanece configurado.

A apresentação está separada em `src/pages/HomePage.style.ts`, com tokens, layout responsivo e exemplos locais sem envio de dados. Os estilos próprios do template não alteram as APIs nem o tema global dos componentes. O template mantém dependências por tag (latest para CLI estável, beta para pré-release, com --tag como override). A nova tela deve ser distribuída junto da versão do pacote React que contém os novos exports; release:verify gera um projeto pelo tarball do CLI, instala os tarballs locais de React/tokens e executa typecheck, testes, lint e build. Nenhum pacote é publicado por essa verificação.

Validação em 18/10/2026: gate completo com npm 11.6.2, incluindo 144 testes React, quatro testes do CLI, 95 stories e três testes do app gerado por tarball, lint, formatação, builds e renderização SSR dos ícones em consumidor limpo. A revisão no navegador verificou criação/validação/foco no diálogo, navegação e estado compartilhado, reset, preferências, marcadores, popover/tooltip e layout a 320/390px sem rolagem horizontal. Axe não apontou violações WCAG A/AA nas três abas da nova tela. Isso não substitui auditoria integral de navegadores ou acessibilidade.

## Referência Figma e evolução dos componentes

A referência visual consultada é o [arquivo Figma fornecido, aberto na página Steps](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=4-1856), identificado visualmente como TapTap Design System. O [inventário e mapeamento](FIGMA_INVENTORY.md), registrado em 18/10/2026, lista as 50 páginas e distingue páginas catalogadas de componentes efetivamente inspecionados. O [snapshot estrutural](docs/figma-inventory.json) preserva IDs e propriedades para economizar futuras chamadas à integração.

O pacote já contém 37 componentes, incluindo Button, Text, Box, Container, Input e Checkbox e a expansão em lote descrita abaixo. A primeira etapa de formulários usa os [contextos e capturas locais](docs/figma/README.md) de Input Basic (`11:7949`) e Checkbox (`10:2274`), extraídos por `get_design_context`. Radio, Switch e outras 20 famílias foram adicionados em uma expansão baseada nos tokens atuais, autorizada pela pessoa usuária; o ajuste visual dirigido dessas famílias ao Figma fica para depois. Os snapshots preservam a referência original; os componentes acrescentam comportamento nativo, composição de labels/mensagens e foco visível. A fonte continua configurável, sem impor PingFang SC aos consumidores.

## Expansão da biblioteca em lote

Em 18/10/2026, a pessoa usuária priorizou construir a maioria dos componentes com os tokens e padrões existentes, deixando o ajuste fino ao Figma para depois. A branch de trabalho passou a ser `feat/component-library-expansion`. Essa decisão substitui o requisito de extrair capturas completas antes de implementar cada nova família nesta expansão. Input e Checkbox conservam suas referências completas; os demais componentes não declaram paridade com as variantes Figma.

Foram acrescentados Radio, Switch (correspondência de Toggle), Textarea, Select, Slider, Upload, Form, ButtonGroup, Link (correspondência de Anchor), Badge, Tag, Alert, Breadcrumb, Pagination, Tabs, Steps, Table, Dialog, Drawer, Popover, Dropdown e Tooltip. Essa primeira expansão cobriu uma base funcional para 25 das 34 famílias de componentes catalogadas, além das primitivas Text, Box e Container. As APIs e exemplos ficam em [COMPONENTS.md](COMPONENTS.md).

- Campos usam HTML nativo, refs, labels, descrições e validação/participação em formulário do navegador. Select não é um combobox pesquisável; Upload seleciona arquivos locais e não envia dados. Form oferece composição visual sobre `form`, sem gerenciador de estado ou validação próprio.
- Tabs tem seleção controlada/não controlada, IDs associados e foco móvel por setas/Home/End, ignorando abas desabilitadas. Pagination recebe `page`, `pageCount` e `onPageChange`, com faixa compacta de números. Breadcrumb, Steps e Table preservam semântica de listas, etapa atual, caption e cabeçalhos.
- Dialog e Drawer usam `dialog.showModal()` para modalidade e restauração do acionador, complementado por contenção de Tab/Shift+Tab nas extremidades do diálogo. São controlados por `open`/`onClose`, fecham por Escape e opcionalmente pelo backdrop, e preservam o overflow anterior do body com contagem para sobreposições simultâneas.
- Popover e Dropdown usam a Popover API nativa (`showPopover`/`hidePopover`) para camada superior, Escape e clique externo. O estado é interno e `onOpenChange` informa transições. Dropdown implementa setas, Home/End, busca por texto e saída por Tab; Tooltip aceita um acionador React que encaminhe `aria-describedby`, mostra em hover/foco e dispensa por Escape.
- Essas sobreposições exigem navegadores com suporte às APIs nativas utilizadas; não foi adicionado polyfill ou promessa de suporte a navegadores legados. As novas cores de texto e foco usam tons com maior contraste dentro das escalas existentes; warning usa texto neutro escuro.
- Implementação e estilos continuam separados, com helpers privados em `packages/react/src/internal`. React e Emotion permanecem peers. Na revisão posterior dos ícones, Phosphor passou a ser dependência de runtime, conforme a decisão registrada na seção Ícones.

Todas as famílias têm stories com acessibilidade como erro de teste. Os controles e componentes de navegação/feedback têm testes de comportamento; os fluxos das sobreposições são verificados em Chromium real. A galeria de consumo fica em `apps/playground/src/ComponentGallery.tsx`. As capturas Figma originais continuam imutáveis.

### Conclusão das famílias catalogadas

Na mesma branch, a rodada seguinte acrescentou Cascader, DateTimePicker, Transfer, Chart, FilterItem, AuditStatus, Message, Popconfirm e Result. São nove implementações base pelos tokens existentes, com contratos e limites em [docs/remaining-component-scope.md](docs/remaining-component-scope.md). O pacote agora cobre uma base funcional para as 34 famílias do inventário, além das três primitivas; isso não representa cobertura de todas as variantes nem equivalência visual ao Figma.

Cascader compõe Selects nativos e submete somente folhas válidas. Transfer compõe busca e checkboxes em duas listas e submete os IDs do destino. Ambos aceitam estado controlado/não controlado, grupos desabilitados e reset de formulário. DateTimePicker reutiliza Input para os tipos nativos date/time/datetime-local; o calendário depende do navegador. Chart oferece barras horizontais, valores negativos/zero, estado vazio e leitura textual. Popconfirm oferece confirmação não modal pela Popover API, foco inicial em Cancelar e retorno de foco nas ações. Message é feedback em fluxo sem fila/timer; AuditStatus e Result recebem significado e ícones do consumidor.

Os exemplos desta rodada ficam em `apps/playground/src/RemainingComponentsGallery.tsx`. As capturas detalhadas do Figma ainda se limitam a Input e Checkbox; o restante exige consultas dirigidas antes dos ajustes visuais.

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

O pacote `@art-liz/create-app` contém o bin `create-app` e o scaffold em `template/`. O projeto gerado é um repositório React independente, não outro workspace do monorepo. Após a publicação do CLI e dos pacotes base, o uso estável será `npm create @art-liz/app@latest nome-do-projeto`. Versões estáveis do CLI usam `@art-liz/react` e `@art-liz/tokens` na tag `latest` por padrão; versões pré-release do CLI usam `beta` por padrão para testar uma combinação consistente de scaffolder e bibliotecas. Em qualquer versão, `--tag latest|beta` sobrescreve essa escolha. Antes disso, o template pode ser exercitado localmente com `node packages/create-app/bin/create-app.js nome-do-projeto --no-install --no-git`. Novos projetos recebem as versões da tag no momento da criação; projetos existentes atualizam suas dependências explicitamente com npm. O template inclui Vite, React/TypeScript, React Router, Zustand, TanStack Query, Vitest/Testing Library, ESLint, Prettier e Husky/lint-staged. Storybook é opcional e fica fora do scaffold inicial.

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

O componente `Input` usa um input HTML nativo com ref, atributos de formulário e modos controlado/não controlado. `label`, `helpText` e `error` são associados por IDs e `aria-describedby`, preservando descrições externas; `error` também ativa `aria-invalid`. `size` aceita `small` (24px, Caption), `medium` (36px, Body, padrão) e `large` (40px, Subtitle). Essas alturas seguem o Figma e diferem intencionalmente do Button existente. A largura acompanha o contêiner, e mensagens longas participam do fluxo normal.

`clearable` habilita a ação de limpar em campos textuais editáveis, visível quando preenchidos e com foco no controle. O botão participa do teclado, possui nome acessível por `clearLabel` e devolve foco ao input. Em modo não controlado, limpa o valor nativo; no controlado, o consumidor atualiza `value` em `onClear`. A limpeza chama `onClear` e não sintetiza eventos `onChange`; estes continuam correspondendo à edição nativa. Reset de formulário permanece nativo. Tipos não textuais, `readOnly` e `disabled` não expõem essa ação.

O componente `Checkbox` usa input `type="checkbox"`, ref nativa, `checked`/`defaultChecked`, `name`, `value`, `required`, `disabled` e label associado. `indeterminate` aplica a propriedade DOM: o indicador é um quadrado de 8px dentro da caixa de 16px, conforme o Figma. A ativação nativa resolve a seleção parcial; grupos controlados devem recalcular `indeterminate` a partir dos itens selecionados. Sem label visível, o consumidor precisa fornecer nome acessível externo. Textos longos quebram com a caixa alinhada à primeira linha; cores forçadas usam a aparência nativa do navegador.

Os SVGs originais de check e limpar ficam no pacote React, são usados como máscaras nas dimensões dos respectivos slots e são incorporados pelo build, sem URLs temporárias. Esses dois controles preservam os assets da referência; os outros símbolos internos usam Phosphor. Cores vêm dos tokens atuais. O foco por teclado acrescenta o anel existente de `focus`, inclusive em estados sem desenho de foco na referência. Os snapshots em `docs/figma/` e os SVGs originais ficam fora do Prettier para preservar bytes, hashes e proveniência.

A mensagem de erro de Input usa `danger.800` para corrigir o contraste insuficiente de `danger.600` no texto de 12/14px da referência; a borda de erro mantém `danger.600`. A paleta de bordas e placeholders e o anel global de foco continuam seguindo os tokens existentes e precisam de revisão de contraste não textual antes de declarar conformidade integral de acessibilidade.

O componente `Box` é um contêiner `div` com padding por tokens de espaçamento e opções de fundo, raio e sombra. Cada opção visual é independente e opcional; atributos nativos de `div` e `children` são encaminhados ao elemento.

O componente `Container` centraliza conteúdo com largura fluida e gutters horizontais de `spacing[4]` por padrão. A prop `maxWidth` escolhe um limite baseado nos breakpoints `sm`, `md`, `lg` e `xl`, ou `full` para ocupar toda a largura disponível; o padrão é `xl`. `background` aceita tokens escalares (`white`, `black`, `paper` etc.) e tokens de escala no formato `primary.600`; `padding` e `margin` aceitam valores da escala `spacing`, e `margin` também aceita `auto` (padrão centralizado). Use `Container` para limitar a largura da página e `Box` para compor superfícies dentro dele.

O componente `Text` aplica os padrões tipográficos definidos em `typography.textStyles`: `h1` (30/38), `h2` (24/32), `h3` (20/28), `title` (18/26), `subtitle` (16/24), `body` (14/22) e `caption` (12/18), em pixels com base de 16px. `variant` seleciona o padrão, `weight` escolhe um token de peso, `color` escolhe uma cor do sistema de tokens, `fontFamily` aceita aliases `component`/`sans`/`mono` ou uma stack CSS personalizada, e `as` escolhe o elemento HTML semântico (`h1`, `p`, `span` etc.). Fontes externas precisam ser carregadas pelo produto consumidor. A escala de tamanho continua centralizada em `typography.fontSizes`.

O componente inicial é `Button`, com aparências `primary`, `outline`, `ghost` e `link`; intents semânticos `primary`, `danger`, `success`, `info` e `warning`; tamanhos `small`, `medium` e `large`; slots opcionais `startIcon`/`endIcon`; suporte aos atributos nativos; e estados hover, pressed, focus-visible e disabled para todas as combinações. Cada par intent/variant define suas próprias cores para base, hover, active e disabled, sem propagar escolhas entre combinações. A paleta de `primary` preserva as escolhas visuais do projeto; contrastes devem ser avaliados de acordo com os tokens definidos pelo produto consumidor. Os rótulos do Button usam `Text`: `body` em `small`, `subtitle` em `medium` e `title` em `large`, herdando a cor do intent. Ícones decorativos são ocultos da árvore acessível; quando o Button não tem conteúdo textual, `aria-label` ou `aria-labelledby` é obrigatório. O tamanho do ícone é `md` em `small`, `xl` no padrão `medium` e `2xl` em `large`. Cada componente separa implementação (`Component.tsx`) e estilos Emotion (`Component.style.ts`); estilos podem importar tipos do componente usando `import type`.

Fontes: `packages/react/src/` e `packages/react/package.json`.

### Baseline de acessibilidade e validação

Componentes interativos usam elementos HTML nativos, labels explícitos para campos, nomes acessíveis para ações sem texto e foco visível pelos tokens de `focus`. Estados `disabled`, `required` e `readOnly` preservam a semântica nativa. Testes usam Testing Library e `user-event` para nomes acessíveis, ordem de Tab e ativação de botões por Enter/Espaço. jsdom valida comportamento e semântica, e o Storybook complementa essa cobertura com `@storybook/addon-a11y` e testes de stories via `@storybook/addon-vitest` em Chromium headless. Contraste, aparência de foco e regressão visual continuam exigindo revisão humana até haver critérios formais e testes visuais dedicados.

### `@art-liz/storybook`

Aplicação privada de desenvolvimento que reúne stories dos pacotes. As stories ficam junto dos componentes para facilitar a manutenção e o Storybook as descobre pela configuração em `apps/storybook/.storybook/main.ts`.

Cada um dos 37 componentes públicos do React possui também uma página `Component.mdx` junto da implementação e das stories. A página se vincula ao módulo de stories com `Meta of` e aparece como **Documentação**, com o ícone de documento, dentro do grupo do componente. Ela explica finalidade, importação de `@art-liz/react`, exemplo completo de uso e orientações específicas. Os exemplos incluem os imports e o estado necessários para copiar e adaptar. A configuração descobre `packages/react/src/**/*.mdx`; mantenha essa documentação ao criar componentes ou alterar suas APIs.

### `@art-liz/playground`

Aplicação Vite privada usada para testar o pacote React em um consumidor real, fora do ambiente do Storybook.

## Ícones

Phosphor Icons (`@phosphor-icons/react`, licença MIT) é a biblioteca adotada para o catálogo visual, exemplos e símbolos internos do design system. Em 18/10/2026, a pessoa usuária pediu substituir caracteres usados como ícones pela biblioteca. Por isso Phosphor passou a ser dependência de runtime de `packages/react`, também utilizada pelo Storybook e pelo template. A revisão seguinte centralizou a integração em `packages/react/src/Icons`. Somente essa pasta importa o fornecedor por subpaths, externos no build da biblioteca. Componentes internos usam `import * as Icons from '../Icons'`; consumidores usam `import { Icons } from '@art-liz/react'`. ESLint impede imports diretos de Phosphor fora da camada central. Os slots `startIcon`/`endIcon` e demais slots públicos continuam aceitando qualquer `ReactNode`.

Alert, Message, Tag e Dialog (também usado por Drawer) usam Icons.XIcon nas ações de fechar/remover, com os nomes acessíveis preservados e SVGs decorativos. Steps usa Icons.CheckIcon/Icons.WarningIcon; Breadcrumb usa Icons.CaretRightIcon, e Pagination usa Icons.DotsThreeIcon. Números de etapas e páginas continuam sendo dados textuais. Input e Checkbox preservam os SVGs da referência Figma, acessados internamente por Icons/assets sem modificar bytes, máscaras ou dimensões.

O catálogo `Foundations/Icons` usa o namespace público Icons do DS e mostra um ícone por vez. Sua página Documentação demonstra a importação e os slots de Button. O catálogo público preserva os nomes existentes e também inclui os ícones usados no template. Seus controles selecionam o nome do ícone, o tamanho pela escala `typography.fontSizes` (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`), peso (`thin`, `light`, `regular`, `bold`, `fill`, `duotone`) e origem da cor: paleta semântica do DS ou HEX customizado para casos especiais. O line-height do preview acompanha o tamanho selecionado. Phosphor usa `currentColor` por padrão, então ícones nos botões acompanham a cor do texto; `size="1em"` mantém alinhamento com a tipografia do botão.

Button não importa uma biblioteca de ícones: recebe ReactNode em startIcon/endIcon. Os exemplos usam `<Icons.PlusIcon />` nesses slots. Ícones decorativos nos slots do Button recebem `aria-hidden`. Um Button sem conteúdo textual precisa de nome acessível por `aria-label` ou `aria-labelledby`. Evite controles Storybook para elementos React: crie o JSX da story no `render`, pois Controls serializam args.

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
npm run test:storybook
npm run lint
npm run format
npm run format:check
npm run build
npm run ci
```

- `npm test` compila tokens e executa os testes Vitest do pacote React.
- `npm run test:storybook` executa as stories como testes de componente em browser mode com Vitest e Playwright.
- `npm run lint` executa ESLint em cada workspace e valida sintaxe do script shell.
- `npm run format` aplica Prettier; `npm run format:check` verifica o padrão sem modificar arquivos.
- `npm run build` compila tokens, empacota o React e compila o playground.

Os pacotes React e tokens são compilados antes do Storybook para que os workspaces consumam seus artefatos `dist`.

`npm run ci` reúne os gates locais que o workflow do GitHub executa: testes de pacote, testes do Storybook, lint, formatação, build integrado e builds do Storybook para homologação e produção. O check reportado pelo workflow chama-se `Quality gates`.

O VS Code aplica Prettier ao salvar arquivos cobertos por `.vscode/settings.json` e recomenda as extensões Prettier e ESLint. Husky/lint-staged executa ESLint autofix e Prettier somente nos arquivos staged durante o pre-commit. Não há pre-push: a validação completa é feita pelo CI obrigatório em PRs.

## Ícones

O Storybook mantém um catálogo de ícones Phosphor em `Foundations/Icons`, com controles para cor, tamanho e peso (`thin`, `light`, `regular`, `bold`, `fill`, `duotone`). As stories usam o catálogo Icons de @art-liz/react; somente a camada central importa os ícones por subpath. `@art-liz/react` declara Phosphor como dependência de runtime para seus símbolos internos; consumidores também podem passar componentes de ícone pelos slots genéricos `startIcon` e `endIcon`.

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

Os comandos produzem o Storybook estático para publicação em destinos de hospedagem distintos. Ambos usam a mesma configuração e as mesmas stories; a separação é de artefato/destino, não de conteúdo.

As stories são testadas localmente e no CI com:

```sh
npm run test:storybook
```

Esse comando usa `vitest.storybook.config.ts`, `@storybook/addon-vitest` e Playwright/Chromium. Em uma máquina nova, instale o navegador do Playwright uma vez com `npx playwright install chromium`; no GitHub Actions o workflow de CI faz essa instalação antes de executar os gates.

O workflow `.github/workflows/deploy-storybook.yml` publica o Storybook no GitHub Pages quando há push em `develop` ou `main` com alterações em `packages/**`, `apps/storybook/**`, `package.json`, `package-lock.json` ou no próprio workflow. Ele também pode ser executado manualmente por `workflow_dispatch`. O site raiz esperado é:

```text
https://arturribeiro01.github.io/art-liz-design-system/
```

Rotas publicadas:

- Homologação: `/homolog/`, compilada a partir da branch `develop`.
- Produção: `/prod/`, compilada a partir da branch `main`.

O Pages do repositório usa a fonte `GitHub Actions`. O workflow usa as actions oficiais de Pages, com `pages: write` e `id-token: write`, sem `NPM_TOKEN` ou segredo adicional. Como cada deploy do GitHub Pages substitui o artefato publicado, o workflow sempre faz checkout de `develop` e `main`, recompila os dois destinos e publica ambos no mesmo artefato.

## Publicação npm

Os pacotes destinados à publicação são:

- `@art-liz/tokens`
- `@art-liz/react`
- `@art-liz/create-app`

Os três pacotes declaram acesso público. A publicação automatizada usa Trusted Publishing/OIDC, sem `NPM_TOKEN`, e depende da variável de repositório `NPM_RELEASES_ENABLED=true` e dos environments `npm-beta` e `npm-production`.

Antes de publicar uma mudança, valide os tarballs em instalação limpa:

```sh
npm run release:verify
```

Cada pacote no npm tem Trusted Publishers para os workflows `publish-beta.yml`/ambiente `npm-beta` e `publish-stable.yml`/ambiente `npm-production`. O publisher beta permite `npm publish`; o publisher estável permite `npm publish` e `npm dist-tag`.

## Releases automatizados

Cada mudança publicável recebe um Changeset. O workflow `changesets-version.yml` abre/atualiza uma PR de versionamento em `develop`. O workflow `publish-beta.yml` usa `@changesets/read` para confirmar que há arquivos de changeset pendentes com releases para `@art-liz/tokens`, `@art-liz/react` ou `@art-liz/create-app`; quando há releases, cria snapshots com `changeset version --snapshot beta` e publica `0.0.0-beta-*` na dist-tag `beta`. As versões snapshot não são commitadas. Como a checagem usa o parser do Changesets e não compara diffs com `develop`, `README.md`, changesets vazios, detalhes válidos de YAML e Release PRs já versionadas não disparam publicações indevidas nem pulam releases válidos. Em recuperação manual, `workflow_dispatch` aceita `publish-current=true` para publicar snapshots pré-release das versões atuais ainda inexistentes no npm quando os changesets já foram consumidos; esse caminho não move dist-tags de versões que já existem, para preservar a permissão limitada do ambiente `npm-beta`. A promoção aprovada de `develop` para `main` aciona `publish-stable.yml`, que publica as versões estáveis com a dist-tag `latest` após aprovação no environment protegido `npm-production`.

Configure no GitHub o environment `npm-beta` e o environment `npm-production` com required reviewers. Mantenha `NPM_RELEASES_ENABLED` ausente/falso até concluir a publicação inicial e cadastrar os Trusted Publishers. Para a action de versionamento criar PRs, habilite em Settings → Actions → General a opção que permite ao GitHub Actions criar PRs. PRs criadas com `GITHUB_TOKEN` podem não iniciar outros workflows automaticamente; nesse caso, rode `Quality gates` pelo `workflow_dispatch` ou configure um GitHub App token.

Não configure `NPM_TOKEN`: os jobs de publicação usam OIDC e limitam `id-token: write` ao job que publica. O workflow beta publica `tokens`/`react`/`create-app`; o workflow estável usa os manifests versionados pela PR de Changesets e publica na ordem declarada pelas dependências. O stable mantém `npm@11.6.2` para instalação e CI, mas atualiza para `npm@11.21.0` antes de executar `npm dist-tag add`, porque dist-tags via OIDC exigem npm 11.21.0+ e permissão `Allow npm dist-tag` no Trusted Publisher de produção.

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

UI Kits específicos devem ser adicionados apenas quando existir um produto consumidor real com componentes, composições ou decisões visuais que não pertençam ao núcleo compartilhado. Não crie pacote de demonstração, pacote vazio ou kit preventivo sem demanda concreta.

Use esta fronteira:

- Núcleo (`@art-liz/tokens` e `@art-liz/react`): tokens, primitivas e componentes genéricos que servem a mais de um sistema. Exemplos: `Button`, `Text`, `Box`, `Container`, escala de cores, tipografia e foco.
- UI Kit específico: composições, variações, regras de negócio visual ou identidade de um produto. Exemplos: `CitizenPortalHeader`, `InvoiceStatusBadge`, `AdminSidebar`, cards com copy/layout de um domínio ou tema visual exclusivo de um sistema.
- Aplicação consumidora: fluxos, páginas, integração com API, permissões e estados que não precisam ser publicados para outros projetos.

Crie um UI Kit quando pelo menos uma destas condições for verdadeira:

- Dois ou mais componentes específicos do produto precisam ser reutilizados em mais de uma aplicação do mesmo domínio.
- O produto tem identidade visual própria que não deve alterar o núcleo para todos os consumidores.
- As composições usam componentes do núcleo, mas adicionam convenções de navegação, cards, headers, tabelas ou badges do domínio.
- Manter a regra no app duplicaria código ou misturaria decisões de produto com o pacote compartilhado.

Não crie um UI Kit quando a necessidade puder ser resolvida com props existentes, tokens configuráveis, CSS custom properties no app, ou quando houver apenas uma tela isolada sem reutilização prevista.

### Convenções de pacote

Um kit deve ser um workspace independente em `packages/`, com nome de diretório descritivo e estável:

```text
packages/ui-kit-nome-do-projeto/
```

O pacote npm deve usar o escopo `@art-liz`, por exemplo:

```json
{
  "name": "@art-liz/ui-kit-nome-do-projeto",
  "private": false,
  "type": "module",
  "files": ["dist"],
  "main": "./dist/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "publishConfig": {
    "access": "public"
  }
}
```

Use `src/index.ts` como ponto público e exporte somente APIs intencionais. Evite exports profundos por componente enquanto não houver necessidade real, para preservar liberdade de reorganizar a estrutura interna.

### Dependências

Um UI Kit pode depender de `@art-liz/react` e `@art-liz/tokens` quando compõe componentes ou lê tokens diretamente. Mantenha `react`, `react-dom`, `@emotion/react` e `@emotion/styled` como `peerDependencies`, seguindo a estratégia do pacote React para evitar cópias duplicadas no consumidor.

Não copie tokens ou componentes do núcleo para dentro do kit. O kit deve importar do núcleo e acrescentar somente a camada específica do produto. O núcleo não deve importar o kit em nenhuma hipótese; essa regra evita dependência circular e mantém o design system base reutilizável.

### Implementação, stories e testes

A estrutura deve seguir o padrão dos componentes do pacote React:

```text
packages/ui-kit-nome-do-projeto/src/
  Component/
    Component.tsx
    Component.style.ts
    Component.stories.tsx
    Component.test.tsx
    index.ts
  index.ts
```

Separe API/comportamento em `Component.tsx` e estilos Emotion em `Component.style.ts`. Quando o estilo precisar de tipos do componente, use `import type`.

Cada componente publicado pelo kit deve ter:

- export público em `src/index.ts`;
- story no Storybook, em grupo próprio do produto;
- teste para comportamento observável e nomes acessíveis;
- cobertura de estados relevantes para o domínio, como vazio, carregando, erro, permissões ou status.

O Storybook deve carregar as stories do kit pelo glob de `apps/storybook/.storybook/main.ts`. Se o kit introduzir dependências visuais específicas, elas devem ficar no próprio kit ou no app Storybook conforme o uso, sem virar dependência runtime de `@art-liz/react`.

### Versionamento e publicação

Um UI Kit deve ter versionamento independente por Changesets. Uma mudança que afete apenas o kit recebe changeset apenas para o pacote do kit; mudanças que exigem nova API no núcleo recebem changesets separados para o núcleo e para o kit.

O fluxo de publicação é o mesmo dos pacotes existentes:

- beta a partir de `develop`, usando a dist-tag `beta`;
- stable a partir de `main`, promovendo `latest` após aprovação;
- Trusted Publishers cadastrados no npm para `publish-beta.yml`/`npm-beta` e `publish-stable.yml`/`npm-production`;
- tarball validado por build, testes, lint e `release:verify` quando o script passar a cobrir o novo pacote.

Antes de publicar o primeiro UI Kit, atualize os scripts de build, teste, release verification e Storybook para incluir o novo workspace. Registre no changeset se o kit depende de versões mínimas de `@art-liz/react` ou `@art-liz/tokens`.

### Template

O `@art-liz/create-app` não deve incluir UI Kits específicos por padrão. Avalie uma opção de template, flag ou preset somente quando existir um primeiro produto real usando o kit e houver benefício claro em automatizar essa instalação.

## Agentes e automação

Agentes especializados não são necessários para a fase atual. Codex e outros agentes devem usar o contexto em `AGENTS.md` e seguir a separação por pacote. CI, rulesets GitFlow, deploy do Storybook no GitHub Pages e publicação npm automatizada já estão configurados; os environments e Trusted Publishers precisam ser mantidos quando houver mudanças nos workflows ou nos pacotes.

## Itens ainda em aberto

- Ajustar visualmente ao Figma as 31 famílias acrescentadas nas duas expansões e auditar Button; as APIs básicas das 34 famílias catalogadas já existem. Consultar variantes detalhadas antes de ampliar os escopos iniciais, especialmente Cascader, DateTimePicker, Transfer e Chart (limites em docs/remaining-component-scope.md).
- Definir escalas completas de tipografia, cores, espaçamento e elevação.
- Definir temas e estratégia para modo claro/escuro, se os produtos precisarem.
- Estabelecer critérios de acessibilidade e compatibilidade de navegadores para os componentes.
- Ampliar cobertura de testes de componentes e validação visual.
