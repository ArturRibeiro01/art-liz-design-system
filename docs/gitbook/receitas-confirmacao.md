# Confirmação contextual

Popconfirm atende confirmações curtas próximas de uma ação. Ele cria seu próprio botão acionador; `trigger` deve conter texto ou conteúdo não interativo, sem aninhar outro Button. A superfície usa a Popover API e não é um modal com captura de Tab.

Crie `ExclusaoLocal.tsx`:

```tsx
import { Popconfirm } from '@art-liz/react'
import { useEffect, useRef, useState } from 'react'

export function ExclusaoLocal() {
  const [excluido, setExcluido] = useState(false)
  const [mensagem, setMensagem] = useState('Rascunho disponível.')
  const resultado = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    if (excluido) resultado.current?.focus()
  }, [excluido])

  return (
    <section aria-label="Rascunho local">
      <Popconfirm
        trigger="Excluir rascunho"
        title="Excluir este rascunho?"
        description="A ação vale apenas para esta demonstração."
        intent="danger"
        disabled={excluido}
        confirmLabel="Excluir agora"
        cancelLabel="Manter rascunho"
        onCancel={() => setMensagem('Exclusão cancelada.')}
        onConfirm={() => {
          setExcluido(true)
          setMensagem('Rascunho excluído nesta sessão.')
        }}
      />
      <p ref={resultado} role="status" tabIndex={-1}>
        {mensagem}
      </p>
    </section>
  )
}
```

O foco inicial é colocado no cancelamento. Escape e o botão de cancelar notificam `onCancel`; clicar fora apenas fecha a superfície, sem representar uma confirmação. Depois da exclusão local, o exemplo move o foco para o resultado, pois o acionador fica desabilitado.

`onConfirm` é uma notificação síncrona, disparada depois de fechar. O componente não aguarda uma Promise nem implementa loading, retry ou sucesso remoto. Para uma operação que deve continuar aberta durante envio/erro, prefira um Dialog controlado, como na [receita de superfícies](receitas-superficies.md), e implemente os estados na aplicação.

Popover atende conteúdo contextual geral e Dropdown atende um menu de ações. Eles também criam seus próprios acionadores. Use [os exemplos do catálogo](componentes.md) para as APIs e confira os [limites de navegador e foco](estado-e-limites.md).
