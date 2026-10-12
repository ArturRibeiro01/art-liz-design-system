# Releases

O projeto publica três pacotes npm:

- `@art-liz/tokens`
- `@art-liz/react`
- `@art-liz/create-app`

Homologação usa a dist-tag `beta`; produção usa `latest`.

## Changesets

Mudanças publicáveis devem receber um changeset:

```sh
npm run changeset
```

O workflow `Changesets version PR` abre ou atualiza uma PR de versionamento em `develop`.

## Beta

Quando a PR de versionamento é mesclada em `develop`, o workflow `Publish beta packages`:

1. Confirma changesets pendentes para os pacotes públicos.
2. Gera snapshots com `changeset version --snapshot beta`.
3. Roda o gate completo com `npm run ci`.
4. Publica snapshots na dist-tag `beta`.

O workflow também tem uma recuperação manual por `workflow_dispatch` com `publish-current=true`, usada quando os changesets já foram consumidos mas uma versão atual ainda precisa ser publicada em beta. Nesse caso, ele publica snapshots pré-release, como `0.2.1-beta-recovery.<timestamp>`.

## Stable

A promoção de `develop` para `main` aciona `Publish stable packages`.

O workflow:

1. Roda `npm run ci`.
2. Publica versões estáveis ainda ausentes no npm.
3. Atualiza npm para uma versão compatível com `dist-tag` via OIDC.
4. Promove as versões atuais para `latest`.

O job usa o environment protegido `npm-production`.

## Trusted Publishing

Não configure `NPM_TOKEN`. Os workflows usam Trusted Publishing/OIDC com `id-token: write` somente nos jobs de publicação.

Cada pacote deve ter Trusted Publishers no npm para:

- `publish-beta.yml` com environment `npm-beta`, permitindo `npm publish`.
- `publish-stable.yml` com environment `npm-production`, permitindo `npm publish` e `npm dist-tag`.

## Verificar Dist-Tags

```sh
npm view @art-liz/tokens dist-tags
npm view @art-liz/react dist-tags
npm view @art-liz/create-app dist-tags
```

Estado esperado após uma promoção estável:

```text
@art-liz/tokens latest -> versão estável atual
@art-liz/react latest -> versão estável atual
@art-liz/create-app latest -> versão estável atual
```

## Instalação Pelo Consumidor

```sh
npm install @art-liz/react
npm install @art-liz/react@beta
```

`@art-liz/react` depende de `@art-liz/tokens`, então consumidores normalmente instalam apenas o pacote React.
