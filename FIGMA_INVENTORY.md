# Inventário Figma e mapeamento para o Art-Liz

Consulta em **18/10/2026**. Este documento registra a descoberta original e o andamento da implementação. Os snapshots preservam a evidência capturada.

## Referências e método

- [Arquivo Figma / página Steps fornecida](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=4-1856).
- File key: `ah40tGdCZ8OKiGMkTSB8JO`; nó inicial: `4:1856`.
- [Repositório](https://github.com/ArturRibeiro01/art-liz-design-system), base `develop`, revisão `a039387b0a7b13a491e3ee17685881aa750fbbe1`.
- Fontes locais lidas: [AGENTS.md](AGENTS.md), [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), manifests, exports, implementações e estilos de Button/Text/Box/Container, tokens, stories, testes existentes e playground.
- [Snapshot estrutural reutilizável](docs/figma-inventory.json): páginas, IDs, famílias, definições de propriedades, contagens, amostras de variantes e estilos locais. Não contém URLs temporárias de assets.
- O conteúdo visual de Steps identifica TapTap Design System. A ferramenta estrutural devolveu o nome genérico `Document`; não se assume outro título oficial para o arquivo.

Esta rodada usou **6 chamadas `use_figma`**, somente de leitura: uma para descobrir páginas e cinco para Button, Input, Checkbox, Radio e Toggle. A leitura de estilos e coleções locais foi agrupada à chamada de Button. Não houve geração de código, export de assets, busca de bibliotecas publicadas nem novas capturas de tela.

O teto de seis chamadas foi uma escolha para economizar a integração, não uma afirmação da cota do plano ou do saldo disponível. Não houve erro de rate limit nesta rodada. Consultas futuras devem partir dos IDs e do snapshot, consultar apenas o componente em trabalho e interromper a expansão se a integração sinalizar limite, respeitando o prazo informado.

A consulta anterior fez três chamadas `get_metadata` e uma `get_screenshot` de Steps. A listagem sem nodeId retornou apenas Cover; a descoberta atual via Plugin API retornou **50 páginas**. Portanto, aquela listagem não era um inventário completo do arquivo.

### Níveis de evidência

- **Página catalogada:** nome e ID existem na raiz; componentes, estados, medidas e disponibilidade como biblioteca publicada ainda não foram verificados.
- **Componentes inspecionados:** nós COMPONENT/COMPONENT_SET e eixos de variantes foram lidos. Não implica fidelidade visual validada ou suporte a todas as combinações dos eixos.
- **Steps:** estrutura e imagem verificadas na consulta anterior, reaproveitadas sem repetir chamadas.
- **Código existente:** confirmado pelos exports e fontes da revisão acima; testes existentes foram lidos, não executados nesta análise documental.

## Inventário por estrutura

As 50 páginas incluem seis separadores de categoria, cinco páginas introdutórias/de exemplos, License e **38 páginas de fundamentos ou famílias de UI**. Estas últimas incluem quatro fundamentos (Color, Icon, Shadow e Typograghy) e 34 famílias de componentes. Nomes de páginas não equivalem a contagens de componentes publicáveis.

| Categoria    | Página Figma                                                                                 | ID           | Evidência                               | Correspondência atual / encaminhamento                                 |
| ------------ | -------------------------------------------------------------------------------------------- | ------------ | --------------------------------------- | ---------------------------------------------------------------------- |
| Referência   | [● Cover](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=0-1)                  | `0:1`        | Página catalogada                       | Material de referência; sem componente público equivalente             |
| Referência   | [▲ Get Started](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=4-30)           | `4:30`       | Página catalogada                       | Material de referência; sem componente público equivalente             |
| Referência   | [■ Overview](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=4-459)             | `4:459`      | Página catalogada                       | Material de referência; sem componente público equivalente             |
| Referência   | [◆ Templates](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=2215-19480)       | `2215:19480` | Página catalogada                       | Material de referência; sem componente público equivalente             |
| Referência   | [▶️ Interactive demo](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=17-23631) | `17:23631`   | Página catalogada                       | Material de referência; sem componente público equivalente             |
| General      | [Button](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=15-12480)              | `15:12480`   | Componentes inspecionados               | `Button`; correspondência estrutural, auditoria visual pendente        |
| General      | [ButtonGroup](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=15-17842)         | `15:17842`   | Página catalogada                       | `ButtonGroup` implementado por tokens; ajuste visual ao Figma pendente |
| General      | [Color](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=4-462)                  | `4:462`      | Página catalogada                       | Famílias em `packages/tokens/src/colors.ts`; valores não comparados    |
| General      | [Icon](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=293-21694)               | `293:21694`  | Página catalogada                       | Phosphor no Storybook; slots genéricos no React                        |
| General      | [Shadow](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=4-1339)                | `4:1339`     | Página catalogada                       | `shadows.ts`; equivalência visual pendente                             |
| General      | [Typograghy](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=4-1418)            | `4:1418`     | Página catalogada                       | `Text` + `typography.ts`; escala confirmada por estilos                |
| Navigation   | [Anchor](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=4-1563)                | `4:1563`     | Página catalogada                       | `Link` implementado por tokens; ajuste visual ao Figma pendente        |
| Navigation   | [Breadcrumb](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=4-1857)            | `4:1857`     | Página catalogada                       | `Breadcrumb` implementado por tokens; ajuste visual ao Figma pendente  |
| Navigation   | [Pagination](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=4-2226)            | `4:2226`     | Página catalogada                       | `Pagination` implementado por tokens; ajuste visual ao Figma pendente  |
| Navigation   | [Tabs](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=4-3421)                  | `4:3421`     | Página catalogada                       | `Tabs` implementado por tokens; ajuste visual ao Figma pendente        |
| Navigation   | [Steps](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=4-1856)                 | `4:1856`     | Metadados + imagem na consulta anterior | `Steps` implementado por tokens; ajuste visual ao Figma pendente       |
| Data Entry   | [Cascader](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=10-1070)             | `10:1070`    | Página catalogada                       | Ausente no pacote React; avaliar depois dos básicos                    |
| Data Entry   | [Checkbox](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=4-4379)              | `4:4379`     | Componentes inspecionados               | Implementado com referência detalhada local e ajustes documentados     |
| Data Entry   | [Date & Time Picker](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-21810)  | `11:21810`   | Página catalogada                       | Ausente no pacote React; avaliar depois dos básicos                    |
| Data Entry   | [Dropdown](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-2059)             | `11:2059`    | Página catalogada                       | `Dropdown` implementado por tokens; ajuste visual ao Figma pendente    |
| Data Entry   | [Form](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-5874)                 | `11:5874`    | Página catalogada                       | `Form` implementado por tokens; ajuste visual ao Figma pendente        |
| Data Entry   | [Input](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-7661)                | `11:7661`    | Componentes inspecionados               | Implementado com referência detalhada local e ajustes documentados     |
| Data Entry   | [Radio](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=10-2400)                | `10:2400`    | Componentes inspecionados               | `Radio` implementado por tokens; ajuste visual ao Figma pendente       |
| Data Entry   | [Select](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-12546)              | `11:12546`   | Página catalogada                       | `Select` implementado por tokens; ajuste visual ao Figma pendente      |
| Data Entry   | [Slider](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-1753)               | `11:1753`    | Página catalogada                       | `Slider` implementado por tokens; ajuste visual ao Figma pendente      |
| Data Entry   | [Textarea](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-15168)            | `11:15168`   | Página catalogada                       | `Textarea` implementado por tokens; ajuste visual ao Figma pendente    |
| Data Entry   | [Toggle](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-1488)               | `11:1488`    | Componentes inspecionados               | `Switch` implementado por tokens; ajuste visual ao Figma pendente      |
| Data Entry   | [Transfer](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-15566)            | `11:15566`   | Página catalogada                       | Ausente no pacote React; avaliar depois dos básicos                    |
| Data Entry   | [Upload](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-26223)              | `11:26223`   | Página catalogada                       | `Upload` implementado por tokens; ajuste visual ao Figma pendente      |
| Data Display | [Badge](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-27512)               | `11:27512`   | Página catalogada                       | `Badge` implementado por tokens; ajuste visual ao Figma pendente       |
| Data Display | [Chart](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=16-13286)               | `16:13286`   | Página catalogada                       | Ausente no pacote React; avaliar depois dos básicos                    |
| Data Display | [Filter item](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-28035)         | `11:28035`   | Página catalogada                       | Ausente no pacote React; avaliar depois dos básicos                    |
| Data Display | [Popover](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-29057)             | `11:29057`   | Página catalogada                       | `Popover` implementado por tokens; ajuste visual ao Figma pendente     |
| Data Display | [Table](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-29730)               | `11:29730`   | Página catalogada                       | `Table` implementado por tokens; ajuste visual ao Figma pendente       |
| Data Display | [Tag](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-28034)                 | `11:28034`   | Página catalogada                       | `Tag` implementado por tokens; ajuste visual ao Figma pendente         |
| Data Display | [Tooltips](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-27708)            | `11:27708`   | Página catalogada                       | `Tooltip` implementado por tokens; ajuste visual ao Figma pendente     |
| Feedback     | [Alert](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=13-15919)               | `13:15919`   | Página catalogada                       | `Alert` implementado por tokens; ajuste visual ao Figma pendente       |
| Feedback     | [Audit Status](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-33524)        | `11:33524`   | Página catalogada                       | Ausente no pacote React; avaliar depois dos básicos                    |
| Feedback     | [Dialog](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=12-11244)              | `12:11244`   | Página catalogada                       | `Dialog` implementado por tokens; ajuste visual ao Figma pendente      |
| Feedback     | [Drawer](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=13-13809)              | `13:13809`   | Página catalogada                       | `Drawer` implementado por tokens; ajuste visual ao Figma pendente      |
| Feedback     | [Message](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=14-14114)             | `14:14114`   | Página catalogada                       | Ausente no pacote React; avaliar depois dos básicos                    |
| Feedback     | [Popconfirm](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-34264)          | `11:34264`   | Página catalogada                       | Ausente no pacote React; avaliar depois dos básicos                    |
| Feedback     | [Result](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-33523)              | `11:33523`   | Página catalogada                       | Ausente no pacote React; avaliar depois dos básicos                    |
| Other        | [License](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=2220-27659)           | `2220:27659` | Página catalogada                       | Material de referência; sem componente público equivalente             |

Os seis separadores são General (`4:461`), Navigation (`4:1562`), Data Entry (`4:4378`), Data Display (`11:27511`), Feedback (`11:33522`) e Other (`2220:27658`). Box e Container são primitivas do código; não foi identificada uma página homônima para eles nesta raiz.

## Componentes confirmados nos cinco básicos

Foram encontrados **21 conjuntos e 587 nós COMPONENT** nessas cinco páginas. São contagens de definições/variantes, não 587 componentes React distintos. O snapshot guarda todos os conjuntos encontrados, suas propriedades e até oito variantes de exemplo por conjunto.

| Página   | Conjuntos | Nós COMPONENT | Famílias e eixos confirmados                                                                                                                             |
| -------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button   | 11        | 324           | Primary, Outline, Ghost, Link; Size=Large/Medium/Small; State=Default/Hover/Pressed/Disabled; oito conjuntos também têm Left Icon/Right Icon             |
| Input    | 7         | 237           | Basic, Left icon, Right icon, Number, Prefix & Suffix, Prefix, Suffix; três tamanhos; estados Default/Hover/Pressed & Focus/Disabled/Error; Text Entered |
| Checkbox | 1         | 12            | With label=true/false; Checked=false/true; Status=Normal/Hover/Indeterminate/Disable                                                                     |
| Radio    | 1         | 6             | Check=true/false; Status=Normal/Hover/Pressed/Disabled, com Hover/Pressed como um único valor                                                            |
| Toggle   | 1         | 8             | Checked=true/false; Disable=false/true; Text=true/false                                                                                                  |

Os três primeiros conjuntos de Input (Basic e ícones) também expõem Typing=true/false e State 2=Not Applicable/Clear Hover/Clear Pressed. Esses estados descrevem interação e conteúdo, não exigem props públicas com esses nomes.

### IDs de origem e diferenças a resolver

| Família                                 | Nós de origem                        | Leitura para implementação                                                   |
| --------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------- |
| Button Primary                          | `15:12968`, `15:13574`, `15:20350`   | Dois conjuntos de 36 variantes com slots laterais e um de 12 sem esses eixos |
| Button Outline                          | `15:14180`, `15:14786`, `15:20577`   | Mesma distribuição; preservar IDs distintos                                  |
| Button Ghost                            | `15:15392`, `15:16001`, `15:20824`   | Mesma distribuição; preservar IDs distintos                                  |
| Button Link                             | `15:16610`, `15:17093`               | Dois conjuntos de 36 variantes                                               |
| Input Basic                             | `11:7949`                            | Primeira referência para um Input genérico                                   |
| Input Left icon / Right icon            | `11:8536` / `11:9189`                | Slots de conteúdo candidatos; não acoplar biblioteca de ícones               |
| Input Number                            | `11:9747`                            | Adiar comportamento especializado de incremento/decremento                   |
| Input Prefix & Suffix / Prefix / Suffix | `11:10328` / `11:10945` / `11:11523` | Composição posterior, conforme demanda                                       |
| Checkbox                                | `10:2274`                            | Estado indeterminado precisa de comportamento além da aparência              |
| Radio                                   | `10:2490`                            | Exclusividade de seleção por name/grupo                                      |
| Toggle                                  | `11:1642`                            | Origem estrutural do Switch implementado; ajuste visual dirigido pendente    |

Há conjuntos de Button com nomes e eixos repetidos. A leitura estrutural não revelou a distinção visual entre esses pares; não se atribuem intents, temas ou funções de ícone por suposição. As 36 variantes dos conjuntos com slots não representam necessariamente o produto cartesiano completo dos quatro eixos. Inspecionar um conjunto por vez quando houver implementação.

Steps, já consultado, contém Item com Finished (`4:2989`), Error (`4:2998`), Current (`4:2992`) e Wait (`4:2995`). Step possui Base com descrição (`4:3075`) e sem descrição (`4:3114`), Vertical com descrição (`299:21853`) e sem descrição (`294:21875`). Steps foi implementado na expansão por tokens; o ajuste visual a esses nós continua pendente.

## Fundamentos e comparação com o código

A integração retornou **78 estilos de pintura, 14 estilos de texto, quatro estilos de efeito e nenhuma coleção local de variáveis**. Zero coleções locais não prova ausência de variáveis remotas ou de bibliotecas externas.

| Origem Figma                                                                            | Destino atual                                                                                 | Situação                                                                                                                           |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Black & White; Neutral, Primary, Auxiliary, Danger, Warning, Success, Info, tons 50–700 | [colors.ts](packages/tokens/src/colors.ts): white/black e famílias homônimas                  | Nomes/organização correspondentes; valores HEX, opacidades e bindings não comparados nesta rodada                                  |
| Chart Color/Standard/1–10 e Chart Color/Auxiliary/1–10                                  | Sem família chart em colors                                                                   | Adiar até existir demanda por gráficos                                                                                             |
| Regular/Caption, Body, Subtitle, Title, H3, H2, H1 e equivalentes Medium                | [typography.ts](packages/tokens/src/typography.ts) + [Text](packages/react/src/Text/Text.tsx) | Tamanho/entrelinha coincidem a 16px de base: 12/18, 14/22, 16/24, 18/26, 20/28, 24/32 e 30/38; regular/medium já existem no código |
| Elevation/1–4                                                                           | [shadows.ts](packages/tokens/src/shadows.ts): none/sm/md/lg                                   | Não há correspondência um a um confirmada; blur, offset e cor não foram extraídos                                                  |
| Icon (página catalogada)                                                                | Phosphor nas stories; ReactNode em slots do Button                                            | Preservar escolha do projeto; equivalência dos desenhos não auditada                                                               |
| Espaçamentos e raios                                                                    | spacing, radii existentes                                                                     | Reutilizar os tokens; medidas dos novos controles ainda precisam de consulta dirigida                                              |
| Foco, movimento, breakpoints e z-index                                                  | focus, motion, breakpoints, zIndices existentes                                               | Sem equivalência Figma confirmada nesta rodada                                                                                     |

O código também possui tons 800/900, cores escalares do projeto, pesos semibold/bold e outras famílias de tokens. São decisões/extensões existentes; o inventário não recomenda removê-las. A consulta não confirmou família de fonte dos estilos do Figma; a fonte configurável do código continua válida.

## Expansão em lote autorizada

Em 18/10/2026, após a primeira entrega, a pessoa usuária escolheu **usar tokens e padrões atuais agora e ajustar ao Figma depois** para acelerar a construção da maioria da biblioteca. Essa decisão permite implementar uma base funcional sem extrair antecipadamente as capturas de todas as famílias. A evidência Figma não foi ampliada artificialmente: páginas catalogadas continuam catalogadas, conjuntos inspecionados continuam estruturais e somente Input/Checkbox têm os contextos completos locais usados na implementação.

A expansão adiciona 22 componentes: Radio, Switch, Textarea, Select, Slider, Upload, Form, ButtonGroup, Link, Badge, Tag, Alert, Breadcrumb, Pagination, Tabs, Steps, Table, Dialog, Drawer, Popover, Dropdown e Tooltip. Com Button, Input e Checkbox, são 25 das 34 famílias catalogadas com implementação base; Text, Box e Container são primitivas adicionais. Anchor corresponde ao export Link, e Toggle ao export Switch.

Ainda precisam de descoberta própria: Cascader, Date & Time Picker, Transfer, Chart, Filter item, Audit Status, Message, Popconfirm e Result. A pendência dos componentes adicionados é ajuste visual dirigido e aprofundamento de variantes, não criação de APIs vazias. A branch é `feat/component-library-expansion`.

A validação desta expansão inclui 129 testes React, quatro testes do CLI e 66 stories em Chromium; as novas stories tratam violações de acessibilidade como falhas. A revisão dirigida do playground verificou teclado real, contenção e restauração de foco, Escape, backdrop, seleção e submissão nativas, busca e saída por Tab no menu, posicionamento do popover e layout a 320px sem rolagem horizontal. Axe não apontou violações nas quatro seções novas da galeria. Isso não representa auditoria completa de contraste/compatibilidade ou paridade visual com o Figma. O gate é executado com npm 11.6.2 conforme o projeto, incluindo verificação de todos os novos exports no tarball e builds de homologação/produção do Storybook.

## Mapeamento de APIs e lacunas

| Origem                               | Código existente ou destino proposto                                                                             | Mapeamento / lacuna                                                                                                                     |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Button Primary/Outline/Ghost/Link    | [Button.tsx](packages/react/src/Button/Button.tsx), [Button.style.ts](packages/react/src/Button/Button.style.ts) | variant=primary/outline/ghost/link já existe                                                                                            |
| Button Size                          | Button size=large/medium/small                                                                                   | Correspondência nominal; medidas Figma ainda não comparadas. O CSS atual define min-height 48/40/32px e padding próprio                 |
| Button Left Icon / Right Icon        | startIcon / endIcon                                                                                              | ReactNode opcional; o código aceita ambos juntos, combinação não confirmada na matriz Figma                                             |
| Button State                         | Pseudoclasses hover/active/focus-visible e atributo disabled                                                     | Não criar prop state para simular comportamento; foco já é uma extensão de acessibilidade do código                                     |
| Intents de Button                    | primary/danger/success/info/warning                                                                              | Existentes no código; não inferir que os pares de conjuntos Figma representam esses intents                                             |
| Button Link                          | variant=link continua renderizando button                                                                        | Aparência de link não implementa navegação; links reais precisam de semântica de âncora                                                 |
| Input                                | packages/react/src/Input/                                                                                        | Input Basic implementado com controles nativos, mensagens, três tamanhos e limpeza opcional; ícones laterais/prefixos ficam para depois |
| Checkbox                             | packages/react/src/Checkbox/                                                                                     | Implementado com input nativo, label, checked/defaultChecked, disabled e indeterminate pela propriedade DOM                             |
| Radio                                | packages/react/src/Radio/                                                                                        | Implementado com controle nativo e grupos por name; ajuste visual ao Figma pendente                                                     |
| Toggle                               | packages/react/src/Switch/                                                                                       | Switch implementado com seleção nativa, nome acessível e teclado; ajuste visual ao Figma pendente                                       |
| Typography                           | Text + typography.textStyles                                                                                     | Já implementado; não criar componente Typography duplicado                                                                              |
| Layout                               | Box e Container                                                                                                  | Já implementados e reutilizáveis; não transformar frames de documentação do Figma em componentes públicos                               |
| Famílias restantes de UI catalogadas | Sem export/implementação correspondente em packages/react/src                                                    | Nove famílias ainda em descoberta; outras 22 já têm implementação base por tokens                                                       |

O pacote exporta 28 componentes; a lista vigente está em `packages/react/src/index.ts`. Todos têm stories e testes locais. O playground também demonstra Input e Checkbox em formulário; o Storybook descobre stories de packages/react/src. Os testes de Button já cobrem nome acessível, teclado, disabled, tamanhos, slots e intents; isso não substitui comparação visual com o Figma.

Este mapeamento é documentação; não cria arquivos Code Connect nem registra vínculos remotos.

## Primeira etapa implementada: Input Basic e Checkbox

As fontes de implementação são os [contextos completos, medidas e capturas](docs/figma/README.md) de `11:7949` e `10:2274`. A captura de 18/10/2026 retornou respostas completas, sem indicação de sparse. Os arquivos originais permanecem imutáveis e não precisam ser extraídos novamente.

- Input: alturas small/medium/large de 24/36/40px, tipografia Caption/Body/Subtitle, bordas e estados pelas cores existentes, ajuda/erro em fluxo normal, labels e descrições acessíveis, refs e limpeza opcional pelo teclado. Em modo controlado, `onClear` solicita a alteração de `value` ao consumidor.
- Checkbox: caixa de 16px, gap de 8px, check original de 10px, indicador parcial quadrado de 8px, semântica nativa e suporte a seleção controlada/não controlada.
- Ambos possuem export público, stories, testes e demonstração de formulário no playground. React e Emotion continuam peers, sem nova dependência runtime.
- Adaptações registradas: fonte configurável em vez de impor PingFang SC; largura fluida em vez do exemplo fixo de Input a 190px; anel de foco por teclado do design system; quebra de labels/mensagens longos e aparência nativa do Checkbox em cores forçadas. A mensagem de erro usa `danger.800` para corrigir o contraste de `danger.600` em texto pequeno; a borda preserva a cor original. Button mantém suas alturas existentes.
- Os SVGs preservam os originais da captura e entram no build como máscaras, sem URLs temporárias. O contexto de captura não contém os termos da página License; não há declaração de licença do kit ou de paridade integral nesta entrega.

### Verificações da implementação

Em 18/10/2026, a validação local compreendeu 101 testes React (22 novos), quatro testes do CLI e 29 stories em Chromium. As novas stories de Input e Checkbox tornam violações do addon de acessibilidade erros de teste. O gate completo usa npm 11.6.2, conforme o projeto; com npm 12.2.0 do terminal, a verificação de tarballs falha porque o formato de retorno de `npm pack --json` mudou. O comando usado para executar o gate com a versão prevista é `npx --yes --package npm@11.6.2 -- npm run ci`.

A revisão no navegador conferiu alturas, tipografia, cores de borda em repouso/hover/foco/erro, slots dos nove ícones de limpar e dos dois checks, navegação e limpeza pelo teclado, indicador parcial, cores forçadas e textos longos a 320px sem rolagem horizontal. Os 24 arquivos do manifesto de captura e os SVGs usados no pacote mantêm os hashes originais. A verificação dirigida com axe nas matrizes de estados não apontou violações após a adaptação da cor da mensagem de erro.

Esses resultados não substituem auditoria manual completa: bordas, placeholders e anel global de foco mantêm a paleta existente e ainda precisam de revisão de contraste. A combinação Checkbox indeterminado + disabled, ausente na matriz original, usa a paleta disabled existente como extensão funcional.

### Plano original e critérios da primeira etapa

**Objetivo:** permitir compor formulários simples com os básicos existentes, sem antecipar componentes complexos. A implementação está descrita acima; a sequência original é preservada abaixo como referência dos critérios.

1. **Confirmar medidas necessárias sem refazer o inventário.** Consultar apenas Input Basic (`11:7949`) e Checkbox (`10:2274`), extrair medidas/cores/estilos dos estados relevantes e obter uma imagem por família. Na implementação, carregar a skill design-to-code antes de get_design_context. Resolver os tokens reutilizáveis que faltarem em packages/tokens, sem substituir a escala atual inteira.
2. **Implementar Input Basic.** Usar input nativo, atributos nativos, ref compatível com o projeto, modos controlado/não controlado e tamanhos coerentes com Button. Associar label, ajuda e erro por id/htmlFor/aria-describedby; erro visual acompanha aria-invalid. Não usar placeholder como único nome acessível. Decidir se a composição inicial usa Text como label ou um auxiliar interno; componente Field público só se houver necessidade demonstrada.
3. **Implementar Checkbox.** Usar input type=checkbox, associação explícita de label, checked/defaultChecked, disabled e indeterminate na propriedade DOM. Separar estado de seleção dos estados de interação; não reproduzir o eixo Status do Figma como uma enum pública.
4. **Documentar e validar cada entrega.** Seguir Component.tsx + Component.style.ts, import type, barrel local e export público. Stories com tamanhos/estados e exemplos de labels, ajuda/erro e teclado; uso de ambos num formulário simples do playground. Atualizar COMPONENTS.md, este mapeamento e DESIGN_SYSTEM.md quando a implementação existir.

**Critérios de aceite da primeira etapa:**

- Entrada de texto, alteração de checkbox, submissão por formulário, teclado, label, foco e disabled funcionam em uso real; required/readOnly preservam a semântica dos controles aos quais se aplicam.
- Testes de comportamento cobrem controle/não controle, associação de mensagens, estado indeterminado e participação em formulário, conforme aplicável; não espelham apenas a árvore da implementação.
- Comparação visual dirigida valida estados extraídos do Figma, foco, contraste e textos longos; ausência de estado de foco desenhado não elimina foco acessível.
- Executar testes específicos do pacote, stories/a11y no navegador, lint, formatação e build pertinentes. Antes de eventual PR, executar o gate npm run ci conforme AGENTS.md.
- Registrar Changeset apenas quando houver mudança publicável, preservando React/Emotion como peers e a independência de ícones em runtime.

**Continuidade atual:** as 22 famílias da expansão já têm implementações base autorizadas por tokens. Ajustar essas famílias ao Figma em consultas dirigidas e descobrir os nove compostos ainda ausentes. A primeira etapa detalhada acima preserva o histórico de Input e Checkbox.

## Limites e continuidade

- A estrutura completa de páginas foi listada; somente cinco páginas tiveram conjuntos/variantes inspecionados nesta rodada, além da evidência anterior de Steps.
- Não há auditoria visual/pixel a pixel dos básicos nem verificação da licença/concessão de uso do kit; a página License está apenas catalogada. Ler seus termos antes de copiar assets do kit.
- Sem identidade confirmada para os pares repetidos de Button e sem comparação de valores de cores/sombras; não apresentar paridade visual completa.
- A rodada original foi documental; as etapas posteriores adicionaram Input, Checkbox e 22 famílias por tokens localmente. Não houve commit, push, registro Code Connect, escrita no Figma, deploy ou publicação.
