# Referências Figma — Input Basic e Checkbox

Captura de **18/10/2026** do arquivo `ah40tGdCZ8OKiGMkTSB8JO`, registrada diretamente em `/Users/artur/art-liz-design-system/docs/figma/`. Etapa documental: componentes ainda não implementados.

| Referência                                                                                    | Contexto e medidas                                                                                                               | Captura                           | Variantes |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------- |
| [Input Basic — 11:7949](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=11-7949) | [Detalhamento](input-basic/README.md) · [Contexto original](input-basic/context.json) · [Medidas](input-basic/measurements.json) | [PNG](input-basic/screenshot.png) | 39        |
| [Checkbox — 10:2274](https://www.figma.com/design/ah40tGdCZ8OKiGMkTSB8JO/?node-id=10-2274)    | [Detalhamento](checkbox/README.md) · [Contexto original](checkbox/context.json) · [Medidas](checkbox/measurements.json)          | [PNG](checkbox/screenshot.png)    | 12        |

Consulte também o [inventário e mapeamento anterior](../../FIGMA_INVENTORY.md). A revisão de código usada como base é `a039387b0a7b13a491e3ee17685881aa750fbbe1`; esta captura não alterou pacotes, exports, stories, testes ou tokens.

## Origem e fidelidade

Foram usadas as skills figma-design-to-code e figma-use. As duas consultas get_design_context solicitaram screenshot (`excludeScreenshot=false`) e retornaram código completo, estilos e imagem. Nenhuma resposta foi sinalizada como sparse; não foi necessário consultar variantes individualmente nem fazer nova captura via get_screenshot.

As medidas complementares vieram de leitura do Plugin API nos mesmos conjuntos: todas as variantes e suas camadas, IDs, pais, geometrias, estilos e segmentos de texto. O contexto original mantém os blocos de texto intactos. Imagens PNG foram extraídas do bloco de imagem sem edição. Nove SVGs de Input e dois de Checkbox foram baixados das URLs devolvidas pela ferramenta com curl -L. A associação entre assets e slots está em assets.json de cada componente; metadados e hashes dos arquivos estão no [manifesto](manifest.json).

Foram feitas **7 chamadas à integração** nesta rodada: 2 get_design_context e 5 use_figma. Três tentativas de extração excederam o limite de retorno de 20.480 bytes; as duas respostas finais cabem no limite por deduplicação de estilos e associação dos nomes de Input ao contexto por ID. Esses erros eram de tamanho de resposta, não de cota/rate limit; não houve edição do canvas.

As medidas são px lógicos do Figma, não pixels estimados da captura. O renderer pode reduzir o PNG para caber no limite de imagem. A altura de Input é **40/36/24px**, enquanto a referência atual de Button usa min-height **48/40/32px**; a diferença está registrada e nenhuma normalização foi aplicada. Checkbox possui raio **2px** e marcador indeterminado quadrado **8 × 8px**.

## Como ler os arquivos

- README de cada componente: tabelas de medidas, cores, tipografia e matriz completa com links dos IDs.
- context.json: resposta de get_design_context; imagens são referências a arquivos locais, em vez de base64 duplicado. URLs temporárias permanecem apenas como proveniência do retorno.
- reference-code.txt: cópia de referência, com prefixo de assets local. É documentação não executável; não foi adaptada para Emotion nem adicionada ao pacote.
- measurements.json: resposta compacta de medidas, com perfis de estilo deduplicados e nomes de variantes preservados.
- assets.json e assets/: mapeamento dos símbolos/slots e SVGs locais originais.
- manifest.json: escopo, contagens, dimensões das imagens, associação dos arquivos e SHA-256 para verificação.

Nenhuma implementação, staging, commit, push, escrita no Figma ou publicação foi realizada.
