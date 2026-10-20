# Instalação e requisitos

## Ambiente e peers

Use Node.js 24 e npm `11.6.2` para reproduzir o ambiente dos workflows e a validação destes guias. O CLI declara Node `>=20.19.0`; as dependências da aplicação também podem exigir versões específicas de Node. Confira `engines` ao atualizar as ferramentas.

O pacote React é distribuído como módulo ES e declara estes peers:

| Dependência       | Faixa em @art-liz/react 1.1.0 |
| ----------------- | ----------------------------- |
| `react`           | `^18.0.0` ou `^19.0.0`        |
| `react-dom`       | `^18.0.0` ou `^19.0.0`        |
| `@emotion/react`  | `^11.14.0`                    |
| `@emotion/styled` | `^11.14.0`                    |

Mantenha React e React DOM na mesma versão compatível. TypeScript consome as declarações incluídas no pacote; não há um pacote `@types` separado do DS.

## Instalar em uma aplicação existente

Em um projeto que já tem React e React DOM compatíveis, escolha um dos canais:

```sh
npm install @art-liz/react@latest @emotion/react@^11.14.0 @emotion/styled@^11.14.0
```

```sh
npm install @art-liz/react@beta @emotion/react@^11.14.0 @emotion/styled@^11.14.0
```

O pacote React depende de `@art-liz/tokens`. Se o app importa tokens diretamente, declare também a dependência correspondente, por exemplo `npm install @art-liz/tokens@beta`. Tokens podem ser usados sem React.

## Importar componentes e ícones

```tsx
import { Button, Icons } from '@art-liz/react'

export function AcaoDeCriacao() {
  return <Button startIcon={<Icons.PlusIcon size="1em" />}>Novo projeto</Button>
}
```

Use o ponto público `@art-liz/react` e o catálogo `Icons`, sem importar o fornecedor diretamente. Button torna os ícones dos slots decorativos; um botão que só tem ícone precisa de nome acessível, como `aria-label`.

Esse exemplo não exige uma folha CSS global nem um provider próprio do DS. A aplicação configura seus estilos globais; o template já inclui essa base. Dialog e Popover usam APIs nativas cujo suporte deve ser conferido nos navegadores do produto.

## Versões publicadas usadas no roteiro

Consulta ao npm em 19/10/2026:

| Pacote                | `latest` | `beta`                      |
| --------------------- | -------- | --------------------------- |
| `@art-liz/create-app` | `0.2.1`  | `0.0.0-beta-20261019054917` |
| `@art-liz/react`      | `1.0.0`  | `1.1.0`                     |
| `@art-liz/tokens`     | `0.2.0`  | `0.2.0`                     |

As tags avançam. Confira o estado atual:

```sh
npm view @art-liz/create-app dist-tags
npm view @art-liz/react dist-tags
npm view @art-liz/tokens dist-tags
```

O [primeiro projeto](primeiro-projeto.md) usa a combinação beta acima, que contém os novos componentes. A versão local do monorepo pode diferir da publicada: alterações no repositório só chegam ao consumidor depois da publicação npm.
