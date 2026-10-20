# Manutenção e revisão do portal

A documentação acompanha o código por PR. A pessoa que implementa atualiza os exemplos; quem revisa verifica a API, clareza e evidências; a pessoa mantenedora confere os espaços, a sincronização e a publicação. Não é preciso copiar manualmente os guias para o editor GitBook após cada merge na branch conectada.

## Em cada mudança de API

- Atualize o MDX, as stories, os exemplos de consumidor e as receitas que usam a API.
- Confira imports, estados vazios/erro e contratos de controle, reset e fechamento.
- Atualize tokens e limites documentados quando a aparência, compatibilidade ou acessibilidade mudar.
- Se mover páginas, confira `SUMMARY.md`, links de entrada e redirects. Preserve a chave do espaço.
- Se mudar arquitetura ou workflows, revise Mermaid, texto alternativo, imagem e links para os arquivos reais.
- Acrescente Changesets quando a mudança for publicável e descreva compatibilidade.

## Conferir links

Para links locais, confirme o arquivo e a seção de destino. Para Storybook, confira o identificador no índice do ambiente, como `homolog/index.json`, e abra a documentação/story correspondente. Um HTTP 200 na página inicial do Storybook não confirma que o ID da story existe.

Para links externos, abra o destino ou confira sua resposta e o conteúdo esperado. Links do painel GitBook exigem autenticação e não são endereços públicos. Ao corrigir um link quebrado, atualize todas as entradas e informe a mudança quando um endereço de página também tiver sido alterado.

## Revisar depois de sincronizar

1. Confira a branch e o SHA em **Last synchronized commit**.
2. Percorra o sumário: adoção, fundamentos, receitas, arquitetura e contribuição. Confirme títulos, termos em português e ausência de páginas duplicadas ou vazias.
3. Abra os exemplos de API e os links de Storybook. Compare com a versão npm usada nos snippets.
4. Confira blocos de código e Mermaid. Se um bloco não renderizar, abra a imagem exportada e preserve o fonte; confirme a integração Mermaid no espaço antes de atribuir o erro à sintaxe.
5. Teste busca por termos como **Input**, **reset**, **beta** e **Cascader**, inclusive navegação para o resultado.
6. Confira teclado, zoom, leitura em desktop/celular, tabelas largas, imagens e alternativas textuais. A prévia pode ter comportamento diferente do site publicado.
7. Registre resultado, data, versão/SHA e pendências. Publicação e canal estável precisam de decisão/configuração próprias.

## Diagramas

Os fontes Mermaid ficam nos próprios arquivos Markdown de arquitetura, GitFlow e publicação. As imagens em `diagramas/` são exportações desses blocos. Use o renderer Mermaid com a versão registrada em GITBOOK.md para regenerar as imagens, mantendo texto legível e sem corte. A validação local de sintaxe/imagem não comprova a renderização no GitBook.

Os diagramas descrevem as configurações atuais. Confira workflows, rulesets e environments antes de documentar uma aprovação como obrigatória. A inspeção de 20/10/2026 encontrou os dois checks de PR obrigatórios e nenhum required reviewer nos environments npm; a política de branches de produção é uma regra diferente de aprovação humana.

## Situação da entrega

As 25 páginas iniciais foram integradas a `develop` pelas PRs #49–#51. Em 20/10/2026, a pessoa mantenedora confirmou o funcionamento do portal atualizado após ressincronizar e autorizou o encerramento das issues #37–#43. Os comentários das issues registram evidências e limites. O agente não auditou o serviço autenticado; a confirmação manual não representa um teste individual de cada item do checklist acima.

O [guia editorial](guia-editorial.md) acrescenta a 26ª página e está preparado para cadastro no Style guide. O [canal de desenvolvimento](https://arturs-organization-13.gitbook.io/art-liz-design-system/) foi publicado em 20/10/2026, com conexão a `develop`. A página inicial e três páginas internas responderam HTTP 200 sem autenticação; o SHA sincronizado não foi consultado no painel. O canal estável continua pendente. Antes de criar o canal `main`/`latest`, conferir a presença dos guias nessa branch e alinhar APIs, comandos e links ao Storybook de produção. A pessoa mantenedora configura o serviço e registra o resultado em GITBOOK.md.

A próxima atualização deve verificar se o Git Sync funciona sem ressincronização manual. Contraste da paleta permanece uma pendência do núcleo, descrita em [Acessibilidade e limites atuais](acessibilidade-e-limites.md).

Consulte [GITBOOK.md no repositório](https://github.com/ArturRibeiro01/art-liz-design-system/blob/develop/GITBOOK.md) para os resultados e limites das verificações locais e do aceite manual.
