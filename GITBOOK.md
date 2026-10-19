# Documentação no GitBook

Esta é a base da [issue #38](https://github.com/ArturRibeiro01/art-liz-design-system/issues/38), parte do [plano #37](https://github.com/ArturRibeiro01/art-liz-design-system/issues/37). Os guias estão em [docs/gitbook/](docs/gitbook/README.md), com [sumário explícito](docs/gitbook/SUMMARY.md) e configuração de espaço em [docs/gitbook/.gitbook.yaml](docs/gitbook/.gitbook.yaml).

O arquivo [docs/gitbook/gitbook-docs.yaml](docs/gitbook/gitbook-docs.yaml) configura o site inteiro para a importação inicial. Ele define um espaço em português do Brasil, com a chave estável `art-liz-docs`, cujo conteúdo fica no próprio diretório do projeto. Preserve essa chave nas próximas alterações. Este mapeamento inicial substitui a estrutura do site pela estrutura declarada; confira o conteúdo existente antes da primeira sincronização.

## Site informado

- [Painel do site no GitBook](https://app.gitbook.com/o/Y1Zb10Li6FcqK1UHMSWu/sites/site_kpJQe), fornecido pela pessoa mantenedora em 19/10/2026.
- Organização indicada no endereço: `Y1Zb10Li6FcqK1UHMSWu`; site: `site_kpJQe`.
- Este é um endereço interno do painel, não a URL pública da documentação nem um ID de espaço. Conteúdo, permissões, espaços e publicação ainda não foram verificados por acesso autenticado.

## Atualização automática

A proposta usa o Git Sync nativo do GitBook. O conteúdo é escrito e revisado no repositório. Depois do merge na branch conectada, a integração sincroniza as páginas do espaço. Isso evita uma etapa manual de copiar os guias para o editor do GitBook.

A sincronização não escreve guias a partir de mudanças no código. Quem altera a API atualiza o MDX do componente e os guias afetados na mesma PR, conforme [Atualizar a documentação](docs/gitbook/contribuicao.md).

O Git Sync é bidirecional. Neste projeto, o fluxo de contribuição começa no GitHub para preservar PRs e checks. Não conceder bypass à integração nem desproteger branches para aceitar commits vindos do editor do GitBook.

## Canais propostos

| Conteúdo    | Branch    | Diretório do espaço | Catálogo associado                    |
| ----------- | --------- | ------------------- | ------------------------------------- |
| Homologação | `develop` | `docs/gitbook/`     | Storybook `/homolog/`, pacotes `beta` |
| Estável     | `main`    | `docs/gitbook/`     | Storybook `/prod/`, pacotes `latest`  |

Cada espaço deve sincronizar com sua branch. Se a configuração de site disponível usar uma única branch para todos os espaços, configurar Git Sync independente por espaço para manter esses canais. Confirmar os recursos disponíveis na conta ao conectar; o painel do site foi informado acima, mas os espaços por canal e a URL pública ainda não foram identificados.

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

## Estado e próximos passos

- Estrutura local criada: página inicial, primeiros passos, catálogos, política de canais e manutenção da documentação. A configuração do site inteiro também está preparada em docs/gitbook/gitbook-docs.yaml.
- Site de destino informado pela pessoa mantenedora; acesso autenticado e identificação dos espaços pendentes. As ferramentas GitBook não ficaram disponíveis nesta sessão; a tentativa de acesso pelo navegador também não foi concluída.
- Integração, sincronização e publicação: pendentes; não houve conexão externa nesta etapa.
- Validação visual, busca e links no GitBook: pendentes de acesso ao espaço.
- Guias completos de instalação, fundamentos, receitas, diagramas e contribuição: continuam nas issues [#39](https://github.com/ArturRibeiro01/art-liz-design-system/issues/39), [#40](https://github.com/ArturRibeiro01/art-liz-design-system/issues/40), [#41](https://github.com/ArturRibeiro01/art-liz-design-system/issues/41), [#42](https://github.com/ArturRibeiro01/art-liz-design-system/issues/42) e [#43](https://github.com/ArturRibeiro01/art-liz-design-system/issues/43).

Este início não conclui a issue #38. O Storybook continua sendo a referência executável de API; os guias não duplicam suas matrizes de props.
