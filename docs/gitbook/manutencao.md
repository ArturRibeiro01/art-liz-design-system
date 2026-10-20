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

| Frente                     | Evidência disponível                                                                             | Pendência e responsável                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Adoção, issue #39          | Guias integrados na PR #50; exemplos testados com pacotes publicados.                            | Pessoa mantenedora confere a prévia e a atualização incremental.                                     |
| Fundamentos, issue #40     | APIs/snippets, links e cálculos registrados em GITBOOK.md.                                       | Autor e revisor conferem novas páginas após merge.                                                   |
| Receitas, issue #41        | Quatro snippets compilados, testes no consumidor e fluxos em Chromium; resultados em GITBOOK.md. | Autor e revisor conferem os guias no portal; contraste permanece pendente no núcleo.                 |
| Diagramas, issue #42       | Fontes Mermaid, imagens de apoio e alternativas textuais.                                        | Pessoa mantenedora valida renderização efetiva no GitBook.                                           |
| Manutenção, issue #43      | Processo, responsabilidades e checklist nesta página.                                            | Pessoa mantenedora/revisor concluem busca, navegação e layout do portal atualizado.                  |
| Canal estável e publicação | Proposta main/latest, separada da develop/beta.                                                  | Pessoa mantenedora configura o espaço/site e registra URL/status; não presumir publicação concluída. |

Uma issue só deve ser fechada quando seus critérios tiverem evidência. Conteúdo preparado localmente, diagrama válido e importação inicial não substituem revisão do portal atualizado. Consulte [GITBOOK.md no repositório](https://github.com/ArturRibeiro01/art-liz-design-system/blob/develop/GITBOOK.md) para resultados e limites de cada etapa.
