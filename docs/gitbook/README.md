# Art-Liz Design System

O Art-Liz reúne tokens, componentes React e um gerador de aplicações para compartilhar a base visual dos projetos web. Os componentes do núcleo são genéricos; regras e identidades de produtos específicos podem ficar em UI Kits independentes.

Este guia atende quem vai consumir o DS em uma aplicação e quem vai contribuir com sua evolução. Comece pelos [primeiros passos](primeiros-passos.md), consulte os [catálogos e ambientes](catalogos.md) para explorar os componentes e leia como [atualizar a documentação](contribuicao.md) ao contribuir.

Para adotar o DS, confira [instalação e requisitos](instalacao.md), [gere uma aplicação](create-app.md) e siga o [primeiro projeto com formulário e navegação](primeiro-projeto.md). Quem já tem um app pode consultar [atualizações](atualizacao.md); contribuições ao monorepo começam pelo [desenvolvimento local](desenvolvimento-local.md).

## Pacotes

| Pacote                | Finalidade                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------- |
| `@art-liz/tokens`     | Cores, tipografia, espaçamento e outros valores compartilhados, sem dependência de React. |
| `@art-liz/react`      | Componentes React, estilos Emotion e o catálogo público `Icons`.                          |
| `@art-liz/create-app` | CLI que gera uma aplicação React + TypeScript + Vite preparada para consumir o DS.        |

## Guias e referência de API

O GitBook organiza a adoção, as decisões e a composição de interfaces. O Storybook contém as páginas **Documentação**, exemplos interativos, variantes e estados de cada componente. Consulte a referência do ambiente que corresponde à versão instalada no seu projeto.

## Estado desta documentação

O portal tem guias de adoção e sua sincronização inicial com `develop` foi confirmada em 19/10/2026. A pessoa mantenedora também confirmou que a prévia abriu e está funcional. Fundamentos, receitas ampliadas, arquitetura e contribuição continuam no [plano #37](https://github.com/ArturRibeiro01/art-liz-design-system/issues/37). Publicação e canal estável são etapas separadas da prévia de homologação.
