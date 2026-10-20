# Atualizar um projeto existente

Os pacotes do DS recebem novas versões pelo npm. Os arquivos gerados pelo create-app pertencem à aplicação e não são substituídos automaticamente por uma nova versão do CLI.

## Conferir e atualizar dependências

Na aplicação consumidora:

```sh
npm ls @art-liz/react @art-liz/tokens react react-dom
npm view @art-liz/react dist-tags
```

Consulte o changelog e a documentação do canal pretendido. Para selecionar uma versão estável nova:

```sh
npm install @art-liz/react@latest
```

Para homologação:

```sh
npm install @art-liz/react@beta
```

Se o app declara tokens diretamente, atualize também `@art-liz/tokens` para o canal correspondente. Para fixar a combinação, informe versões exatas, como no [primeiro projeto](primeiro-projeto.md). Confira os peers ao trocar React ou Emotion.

Versione `package.json` e `package-lock.json` junto dos ajustes de API. `npm ci` reproduz o lockfile; use `npm install` para selecionar uma versão nova. `npm update` respeita a faixa atual e pode não selecionar uma versão major pretendida.

## Incorporar mudanças do template

Para adotar a nova Home, rotas ou ferramentas, gere uma aplicação separada e compare os arquivos relevantes com seu projeto:

```sh
npm create @art-liz/app@beta -- referencia-template --no-git --no-install
```

Use uma pasta nova ou vazia. Adapte as mudanças preservando rotas, testes e integrações existentes. Atualizar a biblioteca React não altera `App.tsx`, a Home ou o Husky do consumidor.

## Validar a atualização

Nos projetos com os scripts do template atual:

```sh
npm run typecheck
npm test
npm run lint
npm run format:check
npm run build
```

Templates antigos podem ter outros scripts; confira seu `package.json`. Depois, exercite os fluxos afetados no navegador, incluindo teclado e estados de erro. Para voltar a uma versão anterior, instale explicitamente uma combinação compatível e valide novamente.

Changesets prepara versões no repositório do DS. Uma aplicação consumidora não precisa executar `changeset version` para atualizar sua dependência.
