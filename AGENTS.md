# Contexto para IAs e agentes

Este arquivo é o ponto de entrada para assistentes de programação que trabalhem neste repositório. Leia-o antes de alterar arquivos. Use [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) como documentação técnica completa e confirme sempre os manifests e o código atuais antes de agir: arquivos e dependências podem ter mudado desde a última conversa.

## Identidade e objetivo

- Projeto: `art-liz-design-system`.
- Objetivo: criar um design system para os sistemas web pessoais e, quando necessário, UI Kits separados para projetos específicos.
- A pessoa usuária quer preservar decisões e contexto no próprio repositório, porque o histórico das conversas pode não estar disponível em sessões futuras.
- Responda em português do Brasil, a menos que a pessoa peça outro idioma.

## Fonte de verdade

Priorize as fontes nesta ordem:

1. Código, manifests e configuração atuais do repositório.
2. Este arquivo (`AGENTS.md`) para contexto e regras de colaboração com agentes.
3. [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) para arquitetura, fluxos e decisões registradas.
4. Histórico de conversa, se estiver disponível.

Quando uma decisão mudar, atualize a documentação correspondente no mesmo trabalho. Não presuma que uma resposta anterior ainda descreve o código atual.

## Arquitetura registrada

- Monorepo com npm workspaces: `apps/*` e `packages/*`.
- React + TypeScript.
- Emotion para estilos (`@emotion/react` e `@emotion/styled`).
- Vite para desenvolvimento e build.
- Vitest, Testing Library e jsdom para testes.
- Storybook com Vite para catálogo e documentação visual.
- Changesets para controle de versões.
- Pacotes publicáveis planejados: `@art-liz/tokens` e `@art-liz/react`.
- Publicação de homologação usa a tag npm `beta`; publicação estável usa `latest`.
- O Storybook tem builds estáticos separados para homologação e produção.
- UI Kits de projetos específicos devem ser pacotes independentes em `packages/` e depender do núcleo apenas quando isso fizer sentido.
- O fluxo GitFlow usa `develop` como branch padrão/homologação e `main` como produção; PRs para `main` só podem vir de `develop`, PRs para `develop` aceitam qualquer origem.
- `main` e `develop` estão protegidas contra push direto, force-push, exclusão e bypass administrativo; ambas exigem os checks `Quality gates` e `Allowed source branch`.
- O PR #11 (`initial_config` -> `develop`) está aberto e seus checks passaram; ainda não foi mesclado. Confirme o estado remoto antes de continuar o bootstrap.
- O template de GitFlow reutilizável fica em `templates/gitflow/README.md`; o bootstrap remoto tem dry run em `scripts/setup-gitflow.sh`.
- Agentes especializados não são necessários neste estágio; não criar agentes, workflows ou automações extras sem necessidade clara.

## Mapa do repositório

- `packages/tokens`: valores de design compartilhados e sem dependência de React.
- `packages/react`: componentes React reutilizáveis, suas stories e testes.
- `apps/storybook`: configuração e execução local do Storybook.
- `apps/playground`: app Vite usado como consumidor de teste.
- `DESIGN_SYSTEM.md`: documentação completa para pessoas desenvolvedoras.
- `templates/gitflow/README.md`: instruções para adotar o fluxo em outros repositórios.
- `README.md`: início rápido e comandos mais usados.

## Comandos principais

Execute na raiz:

```sh
npm install
npm run storybook
npm run dev --workspace @art-liz/playground
npm test
npm run lint
npm run ci
npm run build
npm run build:storybook:homolog
npm run build:storybook:prod
```

`npm run storybook` compila tokens e React antes de iniciar o servidor Storybook. Os builds estáticos ficam em `storybook-static/homolog` e `storybook-static/prod`. Confira `package.json` antes de citar comandos, pois scripts podem ser alterados.

## Regras ao implementar

- Faça mudanças pequenas e alinhadas ao estilo e às abstrações existentes.
- Não invente APIs públicas, requisitos visuais ou decisões de arquitetura sem base no pedido, no código ou na documentação.
- Prefira tokens compartilhados a valores visuais duplicados. Os tokens atuais são iniciais, não uma especificação final.
- Componentes do pacote React devem ser genéricos e úteis a mais de um produto. Regras específicas de um sistema pertencem ao UI Kit correspondente.
- Alterações nos workflows e proteções do GitHub devem respeitar o fluxo GitFlow registrado e preservar os gates obrigatórios de CI.
- Separe implementação e estilos dos componentes React: `Component.tsx` contém API e comportamento; `Component.style.ts` contém os estilos Emotion e seus elementos estilizados.
- Ao referenciar tipos do componente no arquivo de estilos, use `import type` para não criar uma dependência de runtime circular.
- Para novos componentes, avalie export público, story, teste de comportamento e uso no playground.
- Mantenha React e Emotion como dependências peer do pacote de componentes; confira os manifests antes de mudar essa estratégia.
- Não publique pacotes, altere credenciais, faça deploy ou execute ações externas sem solicitação explícita.
- Não crie commits ou inicialize Git sem pedido. Este workspace já tem Git e remoto configurados; confirme branch atual, mudanças locais e permissões antes de operar no histórico ou no remoto.
- Nunca reverta mudanças do usuário. Antes de editar um arquivo que tenha sido alterado durante a sessão, leia seu estado atual e trabalhe sobre ele.
- Após uma alteração, rode a verificação mais específica disponível e informe o que foi validado e o que não foi.

## Workspace local

Pacotes internos usam workspaces e seus `exports` podem apontar para `dist`. Se o Vite não resolver um pacote depois de alterar ou instalar dependências, confirme que o pacote foi compilado e reinicie o dev server; para o playground:

```sh
npm run dev --workspace @art-liz/playground -- --force
```

Não trate o reinício como correção de código se um build limpo também falhar: nesse caso investigue package names, workspaces, `exports`, artefatos e lockfile.

## Estado confirmado na documentação inicial

- O pacote de tokens exporta cores, espaçamentos e raios iniciais.
- O pacote React contém o componente `Button`, com variantes `primary` e `secondary`.
- O Storybook tem stories de Button e scripts de build estático para homologação e produção.
- Os testes, lint, build integrado e builds estáticos do Storybook passaram na validação inicial.
- A resolução de `@art-liz/react` no playground exigiu reiniciar o servidor Vite depois da instalação dos workspaces; o comando com `--force` passou a transformar o import para o artefato local.
- O repositório fixa npm `11.6.2` em `package.json` e no workflow para manter instalações limpas reproduzíveis entre macOS e Linux.
- Esses resultados são registros históricos, não garantias de que o estado atual continua igual. Reexecute as verificações relevantes antes de afirmar que ainda passam.

## Pendências conhecidas

Consulte a seção "Itens ainda em aberto" de `DESIGN_SYSTEM.md`. Entre as pendências registradas estão escala visual completa, critérios de acessibilidade, expansão do lint/testes, Git remoto e branch principal, hospedagem/deploy do Storybook e confirmação de acesso ao escopo npm `@art-liz`.

Ao concluir um trabalho que altere essas decisões ou pendências, atualize este resumo e `DESIGN_SYSTEM.md` para que a próxima sessão possa continuar sem depender desta conversa.
