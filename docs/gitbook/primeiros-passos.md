# Primeiros passos

Você pode gerar uma aplicação com o CLI ou instalar os componentes em um projeto React existente. Escolha o [canal estável ou beta](catalogos.md) conforme a versão que pretende usar.

Confira os [requisitos e versões publicadas](instalacao.md), as [opções do create-app](create-app.md) e o [roteiro completo de primeiro projeto](primeiro-projeto.md). Para aplicações já criadas, veja [Atualizar um projeto](atualizacao.md); para alterar o monorepo, veja [Desenvolvimento local](desenvolvimento-local.md).

## Criar uma aplicação

```sh
npm create @art-liz/app@latest minha-aplicacao
cd minha-aplicacao
npm run dev
```

O CLI instala as dependências e inicializa Git por padrão. O template inclui React Router, Zustand, TanStack Query, ferramentas de qualidade e uma página inicial de demonstração. As ações dessa página usam estado local.

Para experimentar o canal de homologação:

```sh
npm create @art-liz/app@beta minha-aplicacao-beta
```

O CLI estável seleciona dependências `latest`; o CLI pré-release seleciona `beta`. Consulte as opções e os requisitos na [documentação do create-app no repositório](https://github.com/ArturRibeiro01/art-liz-design-system/blob/develop/packages/create-app/README.md).

## Instalar em um projeto existente

O pacote de componentes declara React 18 ou 19 e Emotion 11 como peers. Em um projeto React compatível, instale:

```sh
npm install @art-liz/react@latest @emotion/react@^11.14.0 @emotion/styled@^11.14.0
```

O pacote React instala `@art-liz/tokens` como dependência. Use `@art-liz/react@beta` quando precisar das mudanças do canal de homologação.

```tsx
import { Button } from '@art-liz/react'

export function SalvarAcao() {
  return <Button onClick={() => window.alert('Exemplo de ação local')}>Salvar alterações</Button>
}
```

O exemplo demonstra o evento do botão. A aplicação consumidora implementa a persistência e o retorno ao usuário conforme seu domínio.

## Atualizar uma aplicação

Projetos gerados não recebem automaticamente mudanças do template. Atualize as dependências do DS no seu projeto, confira o changelog e valide os fluxos afetados. Mudanças na estrutura do template precisam ser incorporadas ao projeto existente quando fizerem sentido.

O roteiro de [primeiro projeto com componentes](primeiro-projeto.md) usa a combinação publicada beta registrada no guia de instalação. Nela estão os componentes novos; na consulta de 19/10/2026, o canal estável ainda tinha React 1.0.0 e CLI 0.2.1. Confira a versão instalada antes de copiar exemplos do Storybook de homologação.
