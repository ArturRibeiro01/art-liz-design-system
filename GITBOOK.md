# Documentação no GitBook

Esta é a base da [issue #38](https://github.com/ArturRibeiro01/art-liz-design-system/issues/38), parte do [plano #37](https://github.com/ArturRibeiro01/art-liz-design-system/issues/37). Os guias estão em [docs/gitbook/](docs/gitbook/README.md), com [sumário explícito](docs/gitbook/SUMMARY.md) e configuração de espaço em [docs/gitbook/.gitbook.yaml](docs/gitbook/.gitbook.yaml).

O arquivo [docs/gitbook/gitbook-docs.yaml](docs/gitbook/gitbook-docs.yaml) configura o site inteiro para a importação inicial. Ele define um espaço em português do Brasil, com a chave estável `art-liz-docs`, cujo conteúdo fica no próprio diretório do projeto. Preserve essa chave nas próximas alterações. Este mapeamento inicial substitui a estrutura do site pela estrutura declarada; confira o conteúdo existente antes da primeira sincronização.

## Site informado

- [Painel do site no GitBook](https://app.gitbook.com/o/Y1Zb10Li6FcqK1UHMSWu/sites/site_kpJQe), fornecido pela pessoa mantenedora em 19/10/2026.
- Organização indicada no endereço: `Y1Zb10Li6FcqK1UHMSWu`; site: `site_kpJQe`.
- Este é um endereço interno do painel, não a URL pública da documentação nem um ID de espaço. A captura enviada pela pessoa mantenedora confirma a sincronização do espaço **Documentação** com `develop`; a prévia, as permissões e a publicação ainda não foram verificadas por acesso autenticado.

## Atualização automática

O projeto usa o Git Sync nativo do GitBook, com a importação inicial de `develop` confirmada em 19/10/2026. O conteúdo é escrito e revisado no repositório. Depois do merge na branch conectada, a integração sincroniza as páginas do espaço. Isso evita uma etapa manual de copiar os guias para o editor do GitBook. Após a PR #51, a pessoa mantenedora informou em 20/10/2026 que precisou ressincronizar e que o conteúdo atualizado passou a funcionar. Isso confirma a atualização manualmente recuperada; ainda é necessário observar o próximo merge para confirmar uma atualização incremental sem intervenção.

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

Checklist operacional para revisões futuras (as issues da entrega foram encerradas com aceite manual em 20/10/2026):

- [x] Confirmar o merge dos arquivos de configuração e guias na branch `develop`.
- [x] Confirmar a importação inicial pela tela **Git Sync complete** enviada pela pessoa mantenedora.
- [x] Abrir a prévia inicial: a pessoa mantenedora informou que o GitBook abriu e está funcional em 19/10/2026. A confirmação é manual e não representa uma auditoria automatizada de cada recurso.
- [ ] Conferir a renderização dos blocos de código, a navegação e os links dos dois Storybooks.
- [ ] Conferir busca e leitura em desktop e celular.
- [ ] Depois do próximo merge que altere os guias, verificar o novo SHA em **Last synchronized commit** e a mudança correspondente na prévia.
- [ ] Registrar a decisão de publicação e verificar a estratégia do canal estável, sem presumir que a conexão com `develop` também cobre `main`.

## Estado e próximos passos

- As 25 páginas da entrega foram integradas pelas PRs #49, #50 e #51. A PR #51 chegou a `develop` no commit `58a4e3a4`, com `Quality gates`, `Allowed source branch` e o status GitBook aprovados.
- Em 20/10/2026, a pessoa mantenedora confirmou o funcionamento do conteúdo atualizado após ressincronizar e autorizou encerrar as issues #37–#43. As sete foram fechadas com comentários de evidências e limites; a aceitação do portal foi manual.
- Não houve auditoria autenticada do portal pelo agente. O checklist de busca, teclado, leitura responsiva e Mermaid continua útil em cada atualização, sem transformar a confirmação geral em resultados individuais inventados.
- A captura de 20/10/2026 mostra **Not published**. O canal estável e a publicação ainda precisam de configuração própria. A branch `main` remota, no commit `0cac42af`, ainda não contém `docs/gitbook/`.
- Antes de configurar produção, promover o conteúdo pelo fluxo `develop` → `main` e alinhar comandos, APIs e links ao npm `latest` e Storybook `/prod/`. Não trocar simplesmente a branch do site atual: isso removeria a referência de homologação e apontaria para guias ausentes em `main`.
- O [guia editorial](docs/gitbook/guia-editorial.md) acrescenta uma página ao sumário, totalizando 26. Está preparado no repositório para revisão e cadastro no Style guide; a sincronização da página não configura esse recurso automaticamente.

### Recursos adicionais

O guia editorial é a primeira melhoria recomendada. O GitBook Agent pode usar regras de escrita e instruções do site para redigir e revisar, conforme a [documentação oficial](https://gitbook.com/docs/gitbook-agent/overview). Ainda não foi cadastrado no painel por esta sessão.

Change requests ajudam na revisão pelo editor; antes de incorporá-los ao fluxo habitual, validar uma alteração pequena chegando ao GitHub com PR e checks obrigatórios. Não conceder bypass nem permitir que uma edição de documentação contorne as proteções de `develop`/`main`.

MCP oferece dois usos distintos: o servidor do site publicado permite consultar a documentação; o servidor autenticado do GitBook permite também editar e abrir change requests. Isso não substitui o Git Sync nem atualiza os guias a partir do código. A [referência oficial](https://www.gitbook.com/blog/create-documentation-with-ai-and-mcp) descreve ambos. Nenhum servidor novo foi conectado nesta etapa.

## Guias de adoção — issue #39

Os guias de instalação, create-app, primeiro projeto, atualização de apps e desenvolvimento local estão em `docs/gitbook/` e vinculados no sumário. O primeiro projeto acrescenta um formulário controlado e uma rota ao template publicado, com testes de salvar/restaurar e navegação. Os exemplos distinguem ações locais de persistência em servidor.

A consulta ao npm em 19/10/2026 encontrou CLI beta `0.0.0-beta-20261019054917`, React beta `1.1.0` e tokens `0.2.0`. O canal estável ainda aponta para CLI `0.2.1` e React `1.0.0`, portanto o roteiro fixa a combinação beta que contém os componentes recentes. As faixas peer e as opções do CLI foram conferidas contra os manifests e o código atuais.

### Validação do roteiro

Em 19/10/2026, foi gerada uma aplicação temporária pelo CLI publicado acima, usando Node 24.12.0 e npm 11.6.2, com `--no-git --no-install`. As dependências foram instaladas do npm e as versões React 1.1.0/tokens 0.2.0 foram fixadas conforme o guia; nenhum pacote do workspace foi vinculado ao consumidor.

Os blocos TSX do Markdown foram extraídos para o projeto, incluindo a página PreferenciasPage, seus dois testes, o exemplo de Button/Icons e o exemplo inicial de ação. A rota e o link da Home foram acrescentados conforme as instruções. Passaram:

- `npm run typecheck`;
- `npm run check:commit`: cinco testes (três do template e dois do guia), lint, formatação e build;
- verificação de links locais e de páginas únicas no sumário dos guias.

Essa validação cobre compilação e comportamento no ambiente jsdom do projeto gerado. Não representa uma revisão visual dos guias novos no GitBook nem uma auditoria de teclado, responsividade ou navegador real. Os guias da issue #39 foram integrados pela [PR #50](https://github.com/ArturRibeiro01/art-liz-design-system/pull/50), no commit bb9cad58. A confirmação da prévia enviada pela pessoa mantenedora se refere ao conteúdo inicial; não foi feita uma nova inspeção autenticada do portal pelo agente. A suíte integral do monorepo não foi repetida nessa mudança de documentação.

## Fundamentos — issue #40

Os seis guias de fundamentos cobrem os exports reais dos tokens, personalização por variáveis CSS, tipografia/layout, motion/foco, Icons e acessibilidade/limites. Os componentes atuais não consomem um contrato de tema do Emotion; sobrescrever cores e fonte não cria um tema escuro validado nem troca tokens de dimensões.

Os links interativos foram conferidos contra o index.json publicado do Storybook de homologação. As orientações de acessibilidade têm referências oficiais WAI/WCAG. Os cálculos de contraste usam os HEX de fallback de tokens 0.2.0, sem transparência; branco sobre primary.600 resulta em aproximadamente 2,12:1. Essa limitação foi documentada sem alterar o visual dos componentes ou afirmar conformidade integral.

As páginas da issue #40 foram integradas pela PR #51 e incluídas no aceite manual de 20/10/2026. O arquivo de mapeamento do site e a chave art-liz-docs permanecem os mesmos.

### Validação dos fundamentos

Em 20/10/2026, sete blocos TS/TSX foram extraídos diretamente dos seis guias e compilados em uma aplicação temporária gerada pelo CLI publicado, com Node 24.12.0/npm 11.6.2, React 1.1.0 e tokens 0.2.0 do npm. Não foram usados links para os workspaces locais.

Passaram typecheck e check:commit: nove testes (três originais e seis verificações dos exemplos), lint, formatação e build. As verificações dos exemplos cobriram nomes acessíveis e ícones decorativos, descrição/erro de campo, semântica de heading e SSR dos estilos de marca, media query, foco e movimento reduzido. As asserções de CSS consideram diferenças de espaços na serialização.

Também passaram a formatação do repositório, os links locais e os 16 links de stories dos fundamentos, conferidos contra o índice publicado de homologação; o sumário tem 15 páginas únicas. As verificações SSR de CSS não medem aparência, contraste de estilos computados ou execução de animações no navegador. A prévia atualizada foi aceita manualmente pela pessoa mantenedora em 20/10/2026; não houve auditoria autenticada pelo agente. A suíte completa do monorepo não foi repetida nesta alteração de documentação.

## Receitas, diagramas e manutenção — issues #41 a #43

A expansão feita em 20/10/2026 mantém a mesma branch e acrescenta catálogo por finalidade dos 37 componentes, quatro receitas completas (formulário, dados/filtros/paginação, Dialog/Drawer e confirmação), contratos de estado/reset/limites, arquitetura, GitFlow, versões/publicação e manutenção do portal. O sumário passa a ter 25 páginas.

O catálogo aponta para 37 páginas Documentação e 37 stories reais do índice de homologação. Os guias de composição não copiam matrizes de props do MDX. As receitas foram extraídas do Markdown para o mesmo consumidor temporário da validação dos fundamentos, com React 1.1.0 e tokens 0.2.0 publicados, sem vínculos aos workspaces.

### Exemplos e navegador

Passou o check:commit do consumidor: 11 testes (três do template, seis dos fundamentos e dois das receitas), lint, formatação e build, que também executa TypeScript. As duas verificações novas cobrem validação/reset do formulário e filtros/paginação/estado vazio.

Em Chromium headless, com APIs nativas sem mocks, passaram os fluxos de formulário/reset, filtros/paginação, Dialog aplicar/cancelar, Drawer e Popconfirm confirmar/cancelar. Foram verificados foco inicial e retorno, Escape, Tab dentro do modal e o foco no resultado da exclusão. A preferência por movimento reduzido removeu a transição do Drawer. Não houve erro de página nem rolagem horizontal nas larguras 1280, 390 e 320px. As capturas de 320px da página e do Drawer foram inspecionadas.

O axe com regras WCAG A/AA encontrou duas ocorrências de color-contrast na tela de exemplos. A paleta padrão, incluindo o contraste branco/primary.600, permanece uma pendência do núcleo já descrita em acessibilidade-e-limites.md. Não foi alterado o runtime para ocultar esses achados nem declarada aprovação integral de acessibilidade. O resultado vale para o cenário exercitado, não para todos os estados, browsers ou leitores de tela.

### Diagramas e configuração remota

Os três fontes Mermaid ficam nos blocos de arquitetura.md, fluxo-desenvolvimento.md e versoes-e-publicacao.md. Foram renderizados com mermaid 11.12.0 no Chromium/Playwright, exportados para PNG em diagramas/ e inspecionados: arquitetura (1251x638), GitFlow (875x1046) e releases (604x1187). Os arquivos Markdown preservam alternativas textuais e links para as imagens. O renderer foi instalado apenas em diretório temporário, sem dependência nova no projeto.

A inspeção por API do GitHub confirmou rulesets ativos de main/develop, sem bypass, checks obrigatórios e zero reviews exigidas. npm-beta não tinha regras de proteção; npm-production tinha política de branches, sem required reviewers. Os guias e a documentação técnica foram corrigidos para não prometer aprovação humana de environment inexistente. Nenhuma proteção, permissão ou credencial foi alterada.

### Revisão contínua no serviço

- Em cada atualização, conferir o SHA sincronizado e a renderização das páginas no GitBook.
- Verificar Mermaid no espaço real; as imagens e o texto são alternativas prontas, mas uma renderização local não comprova a integração do portal.
- Conferir busca, links, teclado, leitura em desktop/celular e correspondência entre versão npm e ambiente do catálogo no GitBook atualizado.
- Registrar a configuração do canal estável e a decisão/URL de publicação; a conexão de develop não confirma essas etapas.

O aceite manual do conteúdo atualizado e o encerramento autorizado das issues #37–#43 foram registrados em 20/10/2026. As revisões recorrentes têm responsáveis e checklist em manutencao.md; publicação e canal estável seguem como evolução separada. A suíte completa do monorepo não foi repetida: esta entrega altera documentação e imagens, com verificação específica dos snippets e do consumidor.
