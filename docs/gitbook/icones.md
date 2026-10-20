# Ícones

O catálogo público vem de `Icons`, exportado por `@art-liz/react`. Phosphor é a implementação centralizada dentro do DS; aplicações e componentes consumidores usam a camada do DS. Não substitua ícones por caracteres como `×` ou setas de texto em controles.

Consulte o [catálogo interativo](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/foundations-icons--catalog) para os nomes, pesos e tamanhos disponíveis.

## Slots e nomes acessíveis

Button recebe `ReactNode` em `startIcon` e `endIcon`. Passe o elemento JSX; o Button trata esses slots como decorativos. O texto visível ou o nome acessível do botão comunica sua ação.

```tsx
import { Button, Icons } from '@art-liz/react'

export function AcoesComIcones() {
  return (
    <div>
      <Button startIcon={<Icons.PlusIcon size="1em" />}>Criar projeto</Button>
      <Button aria-label="Fechar painel" variant="ghost" startIcon={<Icons.XIcon size="1em" />} />
      <span>
        <Icons.CheckIcon aria-hidden="true" focusable="false" size="1em" /> Concluído
      </span>
    </div>
  )
}
```

O botão sem texto tem `aria-label` no controle. O ícone junto de **Concluído** é decorativo, porque o texto já comunica o estado. Um SVG decorativo não deve se tornar um alvo adicional de Tab. Não esconda com `aria-hidden` o próprio controle interativo.

Quando o ícone é a única informação de um estado, acrescente uma alternativa textual apropriada. Prefira textos explícitos em mensagens críticas. Tooltip pode complementar uma ação, mas não substitui o nome acessível do botão.

## Tamanho e cor

`size="1em"` acompanha a tipografia; um número define um tamanho explícito. Os ícones seguem `currentColor` por padrão e acompanham a cor do controle. Use cores semânticas para comunicar intenção, com texto de apoio quando necessário. Os controles do catálogo permitem explorar os pesos disponíveis sem criar uma API nova para cada ícone.

Os assets de Input e Checkbox extraídos do Figma são preservados na biblioteca e consumidos internamente pela camada de ícones. Uma mudança de marca ou de fornecedor não deve alterar esses arquivos de referência como efeito colateral da formatação.
