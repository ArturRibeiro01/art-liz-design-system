# Art-Liz Design System

O Art-Liz reúne tokens, componentes React e um gerador de aplicações para compartilhar a base visual dos projetos web. Os componentes do núcleo são genéricos; regras e identidades de produtos específicos podem ficar em UI Kits independentes.

Este guia atende quem vai consumir o DS em uma aplicação e quem vai contribuir com sua evolução. Comece pelos [primeiros passos](primeiros-passos.md), consulte os [catálogos e ambientes](catalogos.md) para explorar os componentes e leia como [atualizar a documentação](contribuicao.md) ao contribuir.

Para adotar o DS, confira [instalação e requisitos](instalacao.md), [gere uma aplicação](create-app.md) e siga o [primeiro projeto com formulário e navegação](primeiro-projeto.md). Quem já tem um app pode consultar [atualizações](atualizacao.md); contribuições ao monorepo começam pelo [desenvolvimento local](desenvolvimento-local.md).

Os [fundamentos](fundamentos.md) explicam [cores e personalização](cores-e-personalizacao.md), [tipografia e layout](tipografia-e-layout.md), [movimento e foco](movimento-e-foco.md), [ícones](icones.md) e os [limites de acessibilidade](acessibilidade-e-limites.md) da implementação atual.

Encontre cada família em [Componentes por finalidade](componentes.md) e combine as peças nas receitas de [formulários](receitas-formularios.md), [dados/filtros](receitas-dados.md), [Dialog/Drawer](receitas-superficies.md) e [confirmação contextual](receitas-confirmacao.md). Consulte também [estado e limites](estado-e-limites.md).

Para entender a entrega do DS, veja [arquitetura](arquitetura.md), [GitFlow](fluxo-desenvolvimento.md), [versões/publicação](versoes-e-publicacao.md) e [manutenção do portal](manutencao.md).

## Pacotes

| Pacote                | Finalidade                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------- |
| `@art-liz/tokens`     | Cores, tipografia, espaçamento e outros valores compartilhados, sem dependência de React. |
| `@art-liz/react`      | Componentes React, estilos Emotion e o catálogo público `Icons`.                          |
| `@art-liz/create-app` | CLI que gera uma aplicação React + TypeScript + Vite preparada para consumir o DS.        |

## Guias e referência de API

O GitBook organiza a adoção, as decisões e a composição de interfaces. O Storybook contém as páginas **Documentação**, exemplos interativos, variantes e estados de cada componente. Consulte a referência do ambiente que corresponde à versão instalada no seu projeto.

## Estado desta documentação

Os guias cobrem adoção, fundamentos, composição, arquitetura, versões e contribuição, conforme o [plano #37](https://github.com/ArturRibeiro01/art-liz-design-system/issues/37). A sincronização inicial com `develop` e o funcionamento da prévia inicial foram confirmados pela pessoa mantenedora. As páginas e diagramas desta expansão precisam de merge e revisão no GitBook, inclusive busca e layout. Publicação e canal estável são etapas separadas da prévia de homologação.
