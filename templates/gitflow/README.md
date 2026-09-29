# Template GitFlow para outros repositórios

Este repositório mantém um fluxo reutilizável com `main` como produção e `develop` como homologação.

## Arquivos a copiar

- `.github/workflows/ci.yml`
- `.github/workflows/pr-branch-policy.yml`
- `scripts/setup-gitflow.sh`

Copie os arquivos preservando os caminhos. O workflow de CI usa `npm ci` e `npm run ci`; em outro repositório, adapte apenas o comando de validação ao stack local e mantenha o mesmo nome do job `Quality gates` ou atualize os required check contexts do script.

## Pré-requisitos

- Repositório no GitHub com branches `main` e `develop` (o script cria `develop` a partir do commit atual de `main` se ainda não existir).
- GitHub Actions habilitado.
- GitHub CLI instalado e autenticado (`gh auth login`) com permissão `ADMIN` no repositório.
- Ambos os workflows já presentes na branch padrão e validados antes de ativar checks obrigatórios.

## Aplicação segura

Faça primeiro um dry run:

```sh
bash scripts/setup-gitflow.sh --repo OWNER/REPO
```

O script exige que os dois workflows estejam em `main` antes de aplicar as regras, pois GitHub Actions usa a versão do workflow da branch base para validar pull requests. O dry run informa se isso ainda falta e lista proteções existentes.

Confirme que os workflows estão instalados e que os checks `CI / Quality gates` e `PR branch policy / Allowed source branch` aparecem nos pull requests. Revise o plano e aplique explicitamente:

```sh
bash scripts/setup-gitflow.sh --repo OWNER/REPO --apply
```

O script pede confirmação literal `apply`. Ele cria `develop` sem reescrever uma branch existente, protege `main` e `develop` exigindo PR e os dois checks, bloqueia bypass administrativo, force-push e exclusão, e só então altera a branch padrão para `develop`. Se já houver proteção, o script não a substitui sem `--replace-protection` explícito.

## Bootstrap inicial do repositório

Quando há apenas `main` e nenhuma proteção configurada:

1. Crie `develop` a partir de `main` e envie os arquivos do template por um pull request de `develop` para `main`. Este é o bootstrap único, anterior à ativação das regras; ainda não há branch protegida nem workflow de política disponível na branch base.
2. Depois do merge, confirme que CI passou em `main` e abra um pull request de `develop` para `main` para validar o check de origem.
3. Rode o dry run novamente, confira os checks e aplique `--apply`.
4. Confirme no GitHub que `develop` virou default e que ambas as proteções exigem os checks corretos.

Não configure required checks antes de eles aparecerem nos pull requests. Não faça push/commit direto em `main`; o merge inicial deve vir de `develop`.

## Regras incluídas

- PR para `main` só passa pela política quando a origem é `develop`.
- PR para `develop` aceita qualquer branch de origem.
- PRs para ambas as branches executam os gates de qualidade e a política de origem.
- Commits diretos não são aceitos pelas regras de PR obrigatório.
- A migração não publica pacotes nem faz deploy.

## Observações

O GitHub exige que os workflows estejam disponíveis na branch padrão para executar CI de pull requests. Faça a instalação inicial por um PR de `develop` para `main` antes de tornar os checks obrigatórios. Se a branch padrão não for `main`, o script interrompe a execução: revise manualmente a migração em vez de sobrescrever a escolha do repositório.