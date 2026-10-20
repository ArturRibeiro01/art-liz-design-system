# Criar uma aplicação

O `@art-liz/create-app` gera uma aplicação React + TypeScript + Vite com o DS. Escolha uma pasta nova ou vazia; o CLI recusa diretórios com arquivos e não gera o projeto no diretório atual.

## Criar e executar

Canal estável:

```sh
npm create @art-liz/app@latest minha-aplicacao
cd minha-aplicacao
npm run dev
```

Para o canal de homologação, usado no [primeiro projeto](primeiro-projeto.md):

```sh
npm create @art-liz/app@beta minha-aplicacao-beta
cd minha-aplicacao-beta
npm run dev
```

O CLI instala dependências e inicializa Git por padrão. O nome do pacote deriva do diretório; se você não informar o diretório, o gerador pergunta qual deve usar.

## Opções

| Opção                          | Comportamento                               |
| ------------------------------ | ------------------------------------------- |
| `--tag latest` ou `--tag beta` | Escolhe a tag dos pacotes React e tokens.   |
| `--no-install`                 | Copia o template sem instalar dependências. |
| `--no-git`                     | Gera os arquivos sem inicializar Git.       |
| `--help` ou `-h`               | Mostra a ajuda e encerra.                   |

Passe as opções depois de `--` ao usar `npm create`:

```sh
npm create @art-liz/app@beta -- minha-aplicacao --tag beta --no-git --no-install
cd minha-aplicacao
npm install
```

CLI estável escolhe `latest` por padrão; CLI pré-release escolhe `beta`. A flag `--tag` muda as dependências do DS, mas não troca os arquivos de um template antigo pelos de um CLI recente. Para obter a nova página inicial, selecione também um CLI que a contenha.

## Estrutura do template de homologação

```text
src/
  App.tsx                 Estilos globais, providers e rotas
  App.test.tsx            Testes dos fluxos iniciais
  pages/
    HomePage.tsx          Página inicial e demonstrações locais
    HomePage.style.ts     Estilos da página inicial
    AboutPage.tsx         Segunda rota
  store/
    counter.ts            Exemplo de estado Zustand
  test/
    setup.ts              Preparação dos testes
```

`App.tsx` configura React Router e o provider do TanStack Query. O contador usa Zustand. Os formulários e as preferências da Home são demonstrações locais; o template não configura uma API nem persistência em servidor.

## Verificar o projeto

```sh
npm run typecheck
npm test
npm run lint
npm run format:check
npm run build
```

O template atual também tem `npm run check:commit`, que agrupa testes, lint, formatação e build. Havendo Git, o script `prepare` instala Husky durante a instalação; o pre-commit executa lint-staged e esse gate. Storybook não faz parte do template consumidor.

Na primeira instalação com `--no-install`, rode `npm install` para produzir o lockfile. Use `npm ci` para reproduzir uma instalação cujo lockfile já existe. Veja [Atualizar um projeto](atualizacao.md) para receber mudanças futuras.
