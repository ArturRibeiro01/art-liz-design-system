# Documentação no GitBook

Esta é a base da [issue #38](https://github.com/ArturRibeiro01/art-liz-design-system/issues/38), parte do [plano #37](https://github.com/ArturRibeiro01/art-liz-design-system/issues/37). Os guias estão em [docs/gitbook/](docs/gitbook/README.md), com [sumário explícito](docs/gitbook/SUMMARY.md) e configuração de espaço em [docs/gitbook/.gitbook.yaml](docs/gitbook/.gitbook.yaml).

O arquivo [docs/gitbook/gitbook-docs.yaml](docs/gitbook/gitbook-docs.yaml) configura o site inteiro para a importação inicial. Ele define um espaço em português do Brasil, com a chave estável `art-liz-docs`, cujo conteúdo fica no próprio diretório do projeto. Preserve essa chave nas próximas alterações. Este mapeamento inicial substitui a estrutura do site pela estrutura declarada; confira o conteúdo existente antes da primeira sincronização.

## Site informado

- [Painel do site no GitBook](https://app.gitbook.com/o/Y1Zb10Li6FcqK1UHMSWu/sites/site_kpJQe), fornecido pela pessoa mantenedora em 19/10/2026.
- Organização indicada no endereço: `Y1Zb10Li6FcqK1UHMSWu`; site: `site_kpJQe`.
- Este é um endereço interno do painel, não a URL pública da documentação nem um ID de espaço. A captura enviada pela pessoa mantenedora confirma a sincronização do espaço **Documentação** com `develop`; a prévia, as permissões e a publicação ainda não foram verificadas por acesso autenticado.

## Atualização automática

O projeto usa o Git Sync nativo do GitBook, com a importação inicial de `develop` confirmada em 19/10/2026. O conteúdo é escrito e revisado no repositório. Depois do merge na branch conectada, a integração sincroniza as páginas do espaço. Isso evita uma etapa manual de copiar os guias para o editor do GitBook. A próxima alteração dos guias permitirá verificar também uma atualização incremental.

A sincronização não escreve guias a partir de mudanças no código. Quem altera a API atualiza o MDX do componente e os guias afetados na mesma PR, conforme [Atualizar a documentação](docs/gitbook/contribuicao.md).

O Git Sync é bidirecional. Neste projeto, o fluxo de contribuição começa no GitHub para preservar PRs e checks. Não conceder bypass à integração nem desproteger branches para aceitar commits vindos do editor do GitBook.

## Canais propostos

| Conteúdo    | Branch    | Diretório do espaço | Catálogo associado                    |
| ----------- | --------- | ------------------- | ------------------------------------- |
| Homologação | `develop` | `docs/gitbook/`     | Storybook `/homolog/`, pacotes `beta` |
| Estável     | `main`    | `docs/gitbook/`     | Storybook `/prod/`, pacotes `latest`  |

Cada espaço deve sincronizar com sua branch. Se a configuração de site disponível usar uma única branch para todos os espaços, configurar Git Sync independente por espaço para manter esses canais. Confirmar os recursos disponíveis na conta ao conectar; o painel do site foi informado acima, mas os espaços por canal e a URL pública ainda não foram identificados.

O espaço **Documentação** já foi sincronizado com `develop`. A associação do canal estável a `main` permanece pendente; a conexão atual não confirma a configuração dos dois canais.

## Configurar a integração

Depois que os arquivos estiverem na branch de destino:

1. Identifique o espaço existente e verifique seu conteúdo antes da importação inicial.
2. No GitBook, configure Git Sync com o repositório `ArturRibeiro01/art-liz-design-system` e a branch do canal. Autorize o aplicativo GitHub do GitBook apenas para o repositório necessário.
3. Preencha **Project directory** com `docs/gitbook/`. O GitBook encontrará `gitbook-docs.yaml` nessa pasta. Nesse arquivo, `content.directory: ./` aponta para a própria pasta do projeto; `.gitbook.yaml`, `README.md` e `SUMMARY.md` também ficam nela. Não usar `docs/github/` nem repetir `docs/gitbook/` dentro de `content.directory`.
4. Confira a direção inicial GitHub → GitBook e o conteúdo que será importado. Use um espaço vazio dedicado ou preserve primeiro o conteúdo existente.
5. Revise qualquer arquivo de mapeamento de site gerado pela interface antes de incorporá-lo por PR. Preserve suas chaves de espaços; elas identificam os espaços existentes.
6. Faça a sincronização e verifique sumário, páginas, links, blocos de código e navegação. Confirme também busca, leitura em desktop/celular e comportamento dos dois canais.
7. Registre os links dos espaços, o estado da sincronização e a configuração de publicação neste guia. Verifique separadamente se o espaço está associado ao site que será publicado.

A presença do arquivo de configuração local não conecta a conta nem publica um site. A ativação depende do acesso ao espaço correto e da configuração feita no GitBook.

Referências oficiais: [Git Sync](https://gitbook.com/docs/docs-as-code/git-sync), [conectar GitHub](https://gitbook.com/docs/docs-as-code/git-sync/enabling-github-sync) e [configuração de conteúdo](https://gitbook.com/docs/docs-as-code/git-sync/content-configuration).

### Campos da configuração inicial

| Campo no GitBook        | Valor                                                   |
| ----------------------- | ------------------------------------------------------- |
| Source repository       | `ArturRibeiro01/art-liz-design-system`                  |
| Branch                  | `develop`                                               |
| Initial sync direction  | GitHub → GitBook                                        |
| Project directory       | `docs/gitbook/`                                         |
| Agent instruction files | `None`; o repositório já mantém seu próprio `AGENTS.md` |
| Commit message template | `docs(gitbook): atualiza {site_title}`                  |
| Fork previews           | Desativado nesta configuração inicial                   |

O modelo de mensagem identifica eventuais commits exportados do GitBook; não muda as regras de proteção. O arquivo local precisa estar publicado na branch selecionada antes de clicar em **Sync**. Um erro informando que `gitbook-docs.yaml` não existe pode indicar um caminho incorreto ou que o merge ainda está pendente.

## Validar depois da sincronização

A captura da tela **Git Sync complete** mostra o repositório correto, a base `develop`, o espaço **Documentação** e o último commit sincronizado `a32a4b90`. Esse SHA corresponde ao merge da [PR #49](https://github.com/ArturRibeiro01/art-liz-design-system/pull/49), cujos checks obrigatórios passaram.

Antes de concluir a issue #38:

- [x] Confirmar o merge dos arquivos de configuração e guias na branch `develop`.
- [x] Confirmar a importação inicial pela tela **Git Sync complete** enviada pela pessoa mantenedora.
- [x] Abrir a prévia inicial: a pessoa mantenedora informou que o GitBook abriu e está funcional em 19/10/2026. A confirmação é manual e não representa uma auditoria automatizada de cada recurso.
- [ ] Conferir a renderização dos blocos de código, a navegação e os links dos dois Storybooks.
- [ ] Conferir busca e leitura em desktop e celular.
- [ ] Depois do próximo merge que altere os guias, verificar o novo SHA em **Last synchronized commit** e a mudança correspondente na prévia.
- [ ] Registrar a decisão de publicação e verificar a estratégia do canal estável, sem presumir que a conexão com `develop` também cobre `main`.

## Estado e próximos passos

- Estrutura local criada: página inicial, primeiros passos, catálogos, política de canais e manutenção da documentação. A configuração do site inteiro também está preparada em docs/gitbook/gitbook-docs.yaml.
- A pessoa mantenedora concluiu a conexão e enviou a confirmação de importação inicial do espaço Documentação em 19/10/2026, no commit a32a4b90 da develop. As ferramentas GitBook não ficaram disponíveis nesta sessão; a confirmação se baseia na captura enviada e no merge remoto.
- Sincronização inicial de homologação: confirmada. Atualização incremental, canal estável e publicação: pendentes de validação/configuração.
- Prévia inicial: funcionamento confirmado pela pessoa mantenedora. Busca, links e responsividade não foram auditados pelo agente; as páginas acrescentadas depois dessa confirmação precisam de nova revisão após merge.
- Guias completos de instalação, fundamentos, receitas, diagramas e contribuição: continuam nas issues [#39](https://github.com/ArturRibeiro01/art-liz-design-system/issues/39), [#40](https://github.com/ArturRibeiro01/art-liz-design-system/issues/40), [#41](https://github.com/ArturRibeiro01/art-liz-design-system/issues/41), [#42](https://github.com/ArturRibeiro01/art-liz-design-system/issues/42) e [#43](https://github.com/ArturRibeiro01/art-liz-design-system/issues/43).

Este início não conclui a issue #38. O Storybook continua sendo a referência executável de API; os guias não duplicam suas matrizes de props.

## Guias de adoção — issue #39

Os guias de instalação, create-app, primeiro projeto, atualização de apps e desenvolvimento local estão em `docs/gitbook/` e vinculados no sumário. O primeiro projeto acrescenta um formulário controlado e uma rota ao template publicado, com testes de salvar/restaurar e navegação. Os exemplos distinguem ações locais de persistência em servidor.

A consulta ao npm em 19/10/2026 encontrou CLI beta `0.0.0-beta-20261019054917`, React beta `1.1.0` e tokens `0.2.0`. O canal estável ainda aponta para CLI `0.2.1` e React `1.0.0`, portanto o roteiro fixa a combinação beta que contém os componentes recentes. As faixas peer e as opções do CLI foram conferidas contra os manifests e o código atuais.

### Validação do roteiro

Em 19/10/2026, foi gerada uma aplicação temporária pelo CLI publicado acima, usando Node 24.12.0 e npm 11.6.2, com `--no-git --no-install`. As dependências foram instaladas do npm e as versões React 1.1.0/tokens 0.2.0 foram fixadas conforme o guia; nenhum pacote do workspace foi vinculado ao consumidor.

Os blocos TSX do Markdown foram extraídos para o projeto, incluindo a página PreferenciasPage, seus dois testes, o exemplo de Button/Icons e o exemplo inicial de ação. A rota e o link da Home foram acrescentados conforme as instruções. Passaram:

- `npm run typecheck`;
- `npm run check:commit`: cinco testes (três do template e dois do guia), lint, formatação e build;
- verificação de links locais e de páginas únicas no sumário dos guias.

Essa validação cobre compilação e comportamento no ambiente jsdom do projeto gerado. Não representa uma revisão visual dos guias novos no GitBook nem uma auditoria de teclado, responsividade ou navegador real. A confirmação da prévia enviada pela pessoa mantenedora se refere ao conteúdo inicial; as páginas da issue #39 ainda dependem de merge e revisão na prévia atualizada. A suíte integral do monorepo não foi repetida nesta mudança de documentação.
