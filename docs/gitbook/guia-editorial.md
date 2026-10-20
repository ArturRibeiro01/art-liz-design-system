# Guia editorial

Escreva para pessoas que estão adotando, usando ou contribuindo com o Art-Liz Design System. Este guia mantém o vocabulário e a estrutura das páginas consistentes, inclusive em sugestões feitas por IA.

## Linguagem

- Use português do Brasil, frases curtas, voz ativa e instruções diretas.
- Abra cada página explicando o que o recurso faz e quando usar.
- Preserve os nomes das APIs: `Button`, `intent`, `onDismiss` e nomes de pacotes não são traduzidos.
- Explique um termo técnico na primeira ocorrência quando necessário. Prefira exemplos concretos a adjetivos como “simples”, “poderoso” ou “intuitivo”.
- Use títulos que descrevam a tarefa, como “Instalar os pacotes” ou “Restaurar os filtros”.

## Estrutura e exemplos

Comece pelo objetivo, apresente os requisitos, mostre os imports e o código necessário e explique o resultado esperado. Quando houver limites relevantes, registre-os junto ao exemplo.

Para guias de componentes, explique a finalidade, quando usar e como compor. A matriz completa de props e variantes fica no Storybook; inclua links para Documentação e para uma story do ambiente correspondente.

- Confira os exemplos contra código, manifests e exports atuais.
- Use tokens compartilhados e `Icons` do DS, inclusive em exemplos de consumidores.
- Diferencie estado local de dados persistidos em servidor. Não apresente uma simulação como integração pronta.
- Informe controle de estado, reset, validação, teclado e foco quando afetarem o uso.
- Identifique a versão ou o canal necessário quando uma API não estiver disponível em todos os canais.

## Canais e evidências

Identifique homologação como `develop`/`beta` e produção como `main`/`latest`. Os links de Storybook devem corresponder ao canal: `/homolog/` ou `/prod/`. Confira as versões publicadas antes de recomendar um comando de instalação.

Registre o que foi validado, com ambiente e data quando ajudarem a reproduzir o resultado. Diferencie teste automatizado, inspeção visual e confirmação manual da pessoa mantenedora. Não declare paridade com Figma, acessibilidade integral, publicação ou sincronização automática sem evidência correspondente.

Use nomes acessíveis nos exemplos, texto alternativo para imagens informativas e alternativas textuais para diagramas. Preserve os fontes Mermaid. Documente limites de contraste e suporte do navegador junto às orientações afetadas.

## Revisão e atualização

Siga [Atualizar a documentação](contribuicao.md) e [Manutenção e revisão do portal](manutencao.md). Mudanças de API atualizam os guias na mesma PR. Sugestões de IA precisam de conferência contra o repositório; não são uma validação da API.

Change requests no GitBook podem ajudar na redação e revisão. A integração com o repositório deve preservar PRs e checks obrigatórios, sem bypass nas branches protegidas.

## Usar no GitBook Agent

Este arquivo é a referência versionada. Sua sincronização como página não cadastra automaticamente as regras no recurso **Style guide**. A pessoa mantenedora pode usar seu conteúdo nesse recurso e nas instruções do Agent, conforme as opções disponíveis no site.

Texto sugerido para as instruções do Agent:

```text
Escreva em português do Brasil e siga o Guia editorial do Art-Liz Design System.
Abra cada guia com o objetivo e quando usar. Preserve nomes de APIs e pacotes.
Use exemplos completos, tokens e Icons do DS. Confira a API no repositório.
Diferencie homologação (develop/beta) de produção (main/latest).
Vincule a API detalhada ao Storybook do canal correspondente.
Não invente props, integrações, versões, resultados de testes ou certificações.
Registre limites e dúvidas para revisão. Preserve o fluxo de PR e checks.
```

A configuração do serviço é separada do conteúdo Markdown. Consulte a [documentação oficial do GitBook Agent](https://gitbook.com/docs/gitbook-agent/overview) para cadastrar o guia e as instruções; esta página não confirma que essas opções já foram ativadas.
