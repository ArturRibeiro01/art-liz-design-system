# Template GitFlow para outros repositórios

Este repositório mantém um fluxo reutilizável com `main` como produção e `develop` como homologação.

## Arquivos a copiar

- `.github/workflows/ci.yml`
- `.github/workflows/pr-branch-policy.yml`
- `scripts/setup-gitflow.sh`

Copie os workflows, o script e o comando `ci` de `package.json` preservando os caminhos. O workflow instala com `npm ci` e executa `npm run ci`; em outro stack, adapte o comando de CI e mantenha ou atualize os contexts `Quality gates` e `Allowed source branch` no workflow e no script. Mantenha a versão npm usada para gerar o lockfile alinhada à versão fixada no workflow.

## Pré-requisitos

- Repositório no GitHub cujo default atual seja `main` ou `develop`, com `main` existente. Se `develop` faltar, o script a cria a partir do commit atual de `main`.
- GitHub Actions habilitado.
- GitHub CLI instalado e autenticado (`gh auth login`) com permissão `ADMIN` no repositório.
- Ambos os workflows já presentes na branch padrão atual e os checks `Quality gates` e `Allowed source branch` observados em um PR antes de ativar as regras.
- Não deve haver outro ruleset conflitante direcionado a `main` ou `develop`; rulesets organizacionais também podem ser aplicados em conjunto.

## Aplicação segura

Faça primeiro um dry run:

```sh
bash scripts/setup-gitflow.sh --repo OWNER/REPO
```

O script exige que os dois workflows estejam na branch padrão atual e lista rulesets existentes. Ele cria rulesets de repositório, não proteções clássicas de branch.

Confirme que os workflows estão instalados e que os checks `Quality gates` e `Allowed source branch` aparecem nos pull requests. Revise o plano e aplique explicitamente:

```sh
bash scripts/setup-gitflow.sh --repo OWNER/REPO --apply
```

O script pede confirmação literal `apply`. Ele cria `develop` sem reescrever uma branch existente, cria rulesets para `main` e `develop`, exige PR e os dois checks, não concede bypass, bloqueia force-push e exclusão, ativa exclusão automática de branches mescladas e define `develop` como default por último.

Os rulesets padrão também solicitam revisão do Copilot em novos PRs e em novos pushes (não em drafts). Isso é revisão auxiliar, não um check obrigatório. Os checks exigem origem no app GitHub Actions (`integration_id` 15368, ID do app e não do repositório). Rulesets de repositório com os nomes `Develop Rules` e `main Rules` que já existam são mantidos sem alterações; para atualizar explicitamente esses dois rulesets, passe `--replace-rulesets`. Outros rulesets de repositório que incluam explicitamente essas refs fazem o script parar para evitar regras sobrepostas inesperadas. Padrões amplos e rulesets definidos no nível da organização não são substituídos pelo script; como o GitHub os aplica em conjunto, revise-os separadamente. Proteções clássicas existentes também não são apagadas; revise-as e remova-as manualmente somente depois de validar os rulesets novos.

## Bootstrap inicial do repositório

Quando há apenas `main`, nenhum ruleset e os workflows ainda não estão na branch padrão:

1. Crie uma branch temporária a partir de `main` e adicione nela os workflows, o script e o comando `ci`.
2. Abra o PR de bootstrap para `main`. Como as regras finais ainda não existem, esta é a única etapa em que a origem ainda não está restrita a `develop`; não faça push direto em `main`.
3. Aguarde e confira os dois checks no PR. Depois do merge, os workflows estarão no default atual.
4. Rode o dry run. Aplique com `--apply` e confirme `apply`; o script cria `develop`, configura os rulesets, ativa exclusão automática de branches mescladas e define `develop` como default por último.
5. Confira no GitHub os rulesets, bypass vazio, checks obrigatórios e branch padrão.

Não configure required checks antes de eles aparecerem nos pull requests. Não faça push/commit direto em `main`; até mesmo o bootstrap entra por PR.

## Regras incluídas

- PR para `main` só passa pela política quando a origem é `develop`.
- PR para `develop` aceita qualquer branch de origem.
- PRs para ambas as branches executam os gates de qualidade e a política de origem.
- Commits diretos não são aceitos pelas regras de PR obrigatório.
- Branches de origem são apagadas automaticamente após merge; `main` e `develop` são preservadas pela regra de bloqueio de exclusão.
- A migração não publica pacotes nem faz deploy.

## Observações

O GitHub exige que os workflows estejam disponíveis na branch padrão para executar CI de pull requests. Faça a instalação inicial por um PR de `develop` para `main` antes de tornar os checks obrigatórios. Se a branch padrão não for `main`, o script interrompe a execução: revise manualmente a migração em vez de sobrescrever a escolha do repositório.
