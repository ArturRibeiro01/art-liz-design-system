# Atualizar a documentação

Os guias ficam versionados em `docs/gitbook/`. O código, os manifests e os workflows do repositório são a referência para documentar o comportamento atual.

## Contribuir no monorepo

Tokens ficam em `packages/tokens`; componentes e seu MDX em `packages/react`; CLI/template em `packages/create-app`. Storybook e playground são consumidores privados em `apps/`. As [fronteiras da arquitetura](arquitetura.md) distinguem componentes genéricos, UI Kits específicos e regras da aplicação.

Ao criar ou alterar um componente, separe API/comportamento em `Component.tsx` e estilos em `Component.style.ts`, com `import type` para referências de tipos. Confira os exports públicos, a story, os testes observáveis, o MDX ligado por `Meta of` e um uso consumidor. Somente a camada Icons importa Phosphor; preserve os bytes dos assets de referência Figma.

## Fluxo de uma mudança

1. Crie uma branch de trabalho a partir de `develop`.
2. Atualize o componente e sua página MDX quando houver mudança de API ou comportamento.
3. Atualize os guias afetados em `docs/gitbook/`, incluindo imports, receitas e limites conhecidos.
4. Se criar ou mover uma página, atualize `SUMMARY.md` e confira seus links.
5. Execute as verificações adequadas e abra uma PR para `develop` com as mudanças de código e documentação juntas.
6. Após o merge em `develop`, o Git Sync sincroniza os guias com o espaço de homologação conectado. Confira a atualização na prévia. A promoção para `main` segue o GitFlow; o canal estável do GitBook ainda depende de sua própria configuração.

## O que será automático

O Git Sync sincroniza os arquivos Markdown da branch configurada com o conteúdo do GitBook. O arquivo `.gitbook.yaml` nesta pasta informa a página inicial e o sumário do espaço.

A escrita e a revisão das explicações fazem parte da PR. Uma alteração em TypeScript não produz, sozinha, um novo guia. Ao acrescentar um componente, atualize sua documentação junto com a implementação.

O fluxo adotado pelo projeto começa no repositório para manter a revisão por PR. A integração também suporta edições no GitBook; qualquer uso dessa direção precisa respeitar as proteções de `develop` e `main`, sem permitir push direto ou bypass.

## Verificação antes da revisão

- Confira os imports e as APIs contra os exports atuais.
- Valide exemplos executáveis quando houver mudança de código.
- Confira destinos, seções e o canal dos links do Storybook.
- Use títulos descritivos, texto alternativo para imagens e instruções que não dependam apenas de cor ou movimento.
- Atualize a página **Catálogos e ambientes** se mudar a política dos canais.
- Ao alterar um fluxo de arquitetura, GitFlow ou release, atualize o Mermaid, sua descrição textual e a imagem exportada juntos.
- Para mudança publicável, acrescente um Changeset com impacto e pacotes corretos. Guias conceituais sem alteração de pacote não precisam de incremento npm.

Use `npm run format:check` para verificar a formatação. O CI completo continua sendo `npm run ci`; uma verificação de formatação não valida a renderização ou a navegação do portal.

## Critérios de aceite da mudança

Uma PR deve descrever o problema e o comportamento resultante, os exemplos afetados, a validação executada e seus limites. Testes devem verificar comportamentos observáveis, incluindo nomes acessíveis, estado controlado e fechamento/reset quando aplicáveis. Revise aparência, contraste, teclado e responsividade no consumidor real; não trate jsdom ou um teste de build como evidência visual.

Use os [comandos locais](desenvolvimento-local.md), preserve os [gates do GitFlow](fluxo-desenvolvimento.md) e siga [Changesets e releases](versoes-e-publicacao.md). O pre-commit não dispensa o CI. Não faça bypass das proteções para integrar documentação ou commits do editor GitBook.

Se um exemplo ou link ficar desatualizado, corrija-o na mesma PR da API que o mudou. Antes de renomear/remover uma página, atualize o sumário, os links de entrada e redirects necessários. Não reutilize outra chave de espaço para renomear o site: `art-liz-docs` identifica o espaço já sincronizado.

## Responsabilidades

Quem implementa a mudança atualiza os exemplos e os guias afetados. Quem revisa a PR confere clareza e correspondência com a API. A pessoa mantenedora configura os espaços e verifica sincronização, acesso e publicação no GitBook.

Consulte o [guia de desenvolvimento](https://github.com/ArturRibeiro01/art-liz-design-system/blob/develop/DEVELOPMENT.md) para os comandos locais e o [guia de releases](https://github.com/ArturRibeiro01/art-liz-design-system/blob/develop/RELEASES.md) para Changesets e os canais npm.

O procedimento de [manutenção e revisão](manutencao.md) registra as pendências, os responsáveis e a forma de revisar links, navegação, busca e conteúdo de cada versão. Fontes de regras e workflows estão em [GitFlow](fluxo-desenvolvimento.md) e [publicação](versoes-e-publicacao.md).
