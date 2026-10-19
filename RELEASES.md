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

O workflow `Changesets version PR` abre ou atualiza uma PR de versionamento em `develop`. Essas PRs do github-actions[bot], originadas em changeset-release/develop no mesmo repositório, recebem merge automático por squash quando Quality gates e Allowed source branch passam. Não precisam de aprovação humana; os rulesets mantêm seus gates e não têm bypass.

O script scripts/release-automerge.mjs valida autoria, branches e arquivos de versionamento, verifica os checks do SHA atual e habilita o auto-merge vinculado a esse SHA. Quando necessário, dispara CI e política de origem explicitamente via workflow_dispatch para evitar intervenção manual nas execuções criadas pelo token do bot. O repositório precisa ter Allow auto-merge habilitado. Alterações fora do versionamento interrompem essa automação. Outras PRs, inclusive a promoção para main, seguem o fluxo normal.

Como GITHUB_TOKEN pode não disparar eventos push após o merge, o fluxo não depende de uma segunda publicação beta disparada pela PR de versionamento. O beta é produzido a partir da alteração funcional, e latest continua dependendo da promoção para main.

## Beta

Quando uma PR com alterações nos caminhos monitorados é mesclada em `develop`, o workflow `Publish beta packages`:

1. Confirma changesets pendentes para os pacotes públicos.
2. Gera snapshots com `changeset version --snapshot beta`.
3. Instala o Chromium/Playwright e roda o gate completo com `npm run ci` após aplicar o snapshot.
4. Publica snapshots na dist-tag `beta`.

Os testes do CLI usam cópias com versões estáveis, pré-release e snapshots explícitos para verificar o padrão latest/beta e o override --tag sem depender da versão corrente no manifest. O teste de cópia do template solicita latest explicitamente.

A PR automática de versionamento atualiza versões e changelogs para a futura publicação estável; ela não precisa ser mesclada antes do beta. Sem changesets pendentes, a publicação automática de snapshots é pulada.

O workflow também tem uma recuperação manual por `workflow_dispatch` com `publish-current=true`, usada quando os changesets já foram consumidos mas uma versão atual ainda precisa ser publicada em beta. Nesse caso, ele publica snapshots pré-release, como `0.2.1-beta-recovery.<timestamp>`.

## Stable

A promoção de `develop` para `main` aciona `Publish stable packages`.

O workflow:

1. Instala o Chromium/Playwright e roda `npm run ci`.
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
