# Catálogos e ambientes

Os pacotes npm e o Storybook têm canais de homologação e produção. Confira a versão instalada antes de copiar exemplos de uma funcionalidade recente.

| Canal       | Branch de origem | Tag npm  | Storybook                                                                            |
| ----------- | ---------------- | -------- | ------------------------------------------------------------------------------------ |
| Homologação | `develop`        | `beta`   | [Abrir homologação](https://arturribeiro01.github.io/art-liz-design-system/homolog/) |
| Estável     | `main`           | `latest` | [Abrir produção](https://arturribeiro01.github.io/art-liz-design-system/prod/)       |

O catálogo de homologação pode mostrar componentes que ainda não chegaram à versão estável. Além disso, o deploy do Storybook e a publicação npm são processos independentes: confira se ambos concluíram antes de associar uma demonstração a uma versão publicada.

## O que consultar no Storybook

- **Documentação do componente:** finalidade, importação, exemplo completo e orientações de uso.
- **Stories:** variações visuais e interações que podem ser experimentadas.
- **Foundations:** tokens e catálogo `Icons` do DS.

Os guias do GitBook devem apontar para essas referências ao explicar composições. As matrizes de props e as variantes continuam mantidas junto dos componentes nas páginas MDX.

## Versões do portal

A política proposta é um espaço de homologação associado a `develop` e um espaço estável associado a `main`, com o conteúdo de `docs/gitbook/` em cada branch. A conexão dos espaços e sua apresentação no GitBook ainda precisam ser configuradas e verificadas.

Enquanto essa configuração estiver pendente, use os catálogos acima e consulte o [fluxo de releases no repositório](https://github.com/ArturRibeiro01/art-liz-design-system/blob/develop/RELEASES.md).
