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
- **Gerenciador e publicação:** npm, npm workspaces e pacotes com escopo `@art-liz`.
- **Versões:** Changesets para registrar mudanças e versionar pacotes.
- **Homologação e produção:** builds separados do Storybook e tags npm `beta` e `latest`.

Essas decisões descrevem a base atual. Novas dependências devem ser adicionadas quando houver uma necessidade concreta de produto ou desenvolvimento.

## Estrutura do repositório

```text
apps/
  playground/       Aplicação Vite para experimentar os pacotes como consumidor
  storybook/        Catálogo de componentes e documentação interativa
packages/
  tokens/           Tokens de design sem dependência de React
  react/            Componentes React compartilhados e estilos Emotion
```

O glob `packages/*` permite adicionar UI Kits no futuro. Por exemplo, um kit específico pode ser criado como `packages/ui-kit-nome-do-projeto`, publicado separadamente e composto sobre `@art-liz/tokens` e `@art-liz/react`.

## Responsabilidade dos pacotes

### `@art-liz/tokens`

Contém valores reutilizáveis e independentes de framework, como cores, espaçamentos e raios de borda. Os tokens atuais são um ponto inicial, não uma especificação visual definitiva.

Fonte: `packages/tokens/src/index.ts`.

### `@art-liz/react`

Contém componentes acessíveis e reutilizáveis para React. O pacote importa tokens e mantém React e Emotion como `peerDependencies`, evitando incorporá-los como cópias privadas da biblioteca no projeto consumidor.

O componente inicial é `Button`, com variantes `primary` e `secondary`, suporte aos atributos nativos de botão e estado desabilitado.

Fontes: `packages/react/src/` e `packages/react/package.json`.

### `@art-liz/storybook`

Aplicação privada de desenvolvimento que reúne stories dos pacotes. As stories ficam junto dos componentes para facilitar a manutenção e o Storybook as descobre pela configuração em `apps/storybook/.storybook/main.ts`.

### `@art-liz/playground`

Aplicação Vite privada usada para testar o pacote React em um consumidor real, fora do ambiente do Storybook.

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

1. Implemente o componente em `packages/react/src/` usando React, TypeScript, Emotion e tokens sempre que aplicável.
2. Exporte o componente e seus tipos em `packages/react/src/index.ts`.
3. Adicione ou atualize uma story ao lado do componente para documentar variantes e estados.
4. Adicione testes focados no comportamento observável em `packages/react/src/`.
5. Use o playground para confirmar a integração fora do Storybook.

Componentes compartilhados devem evitar decisões específicas de um único sistema. Se uma solução depender do domínio ou identidade de um projeto, considere colocá-la em um UI Kit próprio.

## Testes, lint e builds

```sh
npm test
npm run lint
npm run build
```

- `npm test` compila tokens e executa os testes Vitest do pacote React.
- `npm run lint` executa ESLint no playground. O escopo atual do script pode ser ampliado para os pacotes quando suas configurações de lint estiverem definidas.
- `npm run build` compila tokens, empacota o React e compila o playground.

Os pacotes React e tokens são compilados antes do Storybook para que os workspaces consumam seus artefatos `dist`.

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

Ambos declaram acesso público. É necessário ter uma conta npm autenticada e permissão para publicar no escopo `@art-liz`. A documentação não guarda tokens ou credenciais, e nenhuma publicação deve ser feita sem conferir a versão e o conteúdo dos pacotes.

Registre as mudanças e atualize as versões:

```sh
npm run changeset
npm run version-packages
```

Publique a versão de homologação com a tag `beta`:

```sh
npm publish --workspace @art-liz/tokens --tag beta
npm publish --workspace @art-liz/react --tag beta
```

Publique a versão estável com a tag padrão `latest`:

```sh
npm publish --workspace @art-liz/tokens
npm publish --workspace @art-liz/react
```

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

Agentes especializados não são necessários para a fase atual. As responsabilidades estão organizadas por pacote e documentadas aqui; automações de CI, deploy do Storybook e publicação automatizada podem ser adicionadas depois que o repositório tiver Git remoto, fluxo de branches e ambientes definidos.

## Itens ainda em aberto

- Definir escalas completas de tipografia, cores, espaçamento e elevação.
- Definir temas e estratégia para modo claro/escuro, se os produtos precisarem.
- Estabelecer critérios de acessibilidade e compatibilidade de navegadores para os componentes.
- Ampliar lint, cobertura de testes e validação dos artefatos npm.
- Inicializar/versionar o repositório Git e escolher branch principal e fluxo de release.
- Escolher hospedagem e configurar deploy separado do Storybook de homologação e produção.
- Confirmar disponibilidade e controle do escopo `@art-liz` no npm antes da primeira publicação.
