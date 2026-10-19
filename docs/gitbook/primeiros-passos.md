# Primeiros passos

Você pode gerar uma aplicação com o CLI ou instalar os componentes em um projeto React existente. Escolha o [canal estável ou beta](catalogos.md) conforme a versão que pretende usar.

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

Este roteiro inicial será ampliado e validado em um projeto gerado na [issue #39](https://github.com/ArturRibeiro01/art-liz-design-system/issues/39).
