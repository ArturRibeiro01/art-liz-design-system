# Dialog e Drawer

Use Dialog para uma tarefa modal delimitada e Drawer para conteúdo lateral que precisa desse mesmo contrato modal. O Drawer reutiliza Dialog; `side="right"` é o padrão. Ambos usam `showModal`, backdrop e gerenciamento de foco do diálogo nativo.

Esta receita mantém as superfícies montadas, controla a abertura e separa o rascunho do valor aplicado. Crie `EdicaoLocal.tsx`:

```tsx
import { Button, Dialog, Drawer, Input, Text } from '@art-liz/react'
import { useEffect, useRef, useState } from 'react'

export function EdicaoLocal() {
  const [editar, setEditar] = useState(false)
  const [ajuda, setAjuda] = useState(false)
  const [titulo, setTitulo] = useState('Meu projeto')
  const [rascunho, setRascunho] = useState(titulo)
  const campo = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (editar) campo.current?.focus()
  }, [editar])

  return (
    <section aria-label="Edição local">
      <Text role="status">Título aplicado: {titulo}</Text>
      <Button
        onClick={() => {
          setRascunho(titulo)
          setEditar(true)
        }}
      >
        Editar título
      </Button>
      <Button variant="outline" onClick={() => setAjuda(true)}>
        Abrir ajuda lateral
      </Button>
      <Dialog
        open={editar}
        onClose={() => setEditar(false)}
        title="Editar título do projeto"
        description="Alteração local, sem gravação em servidor."
        footer={
          <>
            <Button
              disabled={!rascunho.trim()}
              onClick={() => {
                setTitulo(rascunho.trim())
                setEditar(false)
              }}
            >
              Aplicar título
            </Button>
            <Button variant="ghost" onClick={() => setEditar(false)}>
              Cancelar edição
            </Button>
          </>
        }
      >
        <Input
          ref={campo}
          label="Título do projeto"
          value={rascunho}
          onChange={(event) => setRascunho(event.target.value)}
        />
      </Dialog>
      <Drawer open={ajuda} onClose={() => setAjuda(false)} title="Ajuda do projeto" side="right">
        <Text>O título é mantido apenas enquanto esta receita está montada.</Text>
      </Drawer>
    </section>
  )
}
```

Cancelar ou fechar mantém o valor aplicado. Ao reabrir, o rascunho parte do valor atual. A ref e o efeito escolhem o campo inicial; a aplicação deve decidir onde focar em tarefas mais complexas. Teste Escape, Tab/Shift+Tab, retorno ao acionador e os botões de fechar. Evite abrir duas superfícies modais simultaneamente sem uma necessidade e uma estratégia de foco claras.

O fechamento por backdrop é configurável com `dismissOnBackdrop`. Fechar atualiza o estado do consumidor por `onClose`; não significa salvar automaticamente. Em uma ação assíncrona, mantenha estado de envio/erro e só feche depois do resultado apropriado.

Manter os elementos montados permite a transição de saída. Em CSS sem suporte às transições discretas, o fechamento pode ser imediato; com movimento reduzido, as transições são retiradas. Consulte [movimento/foco](movimento-e-foco.md), [compatibilidade](acessibilidade-e-limites.md) e as páginas de [Dialog/Drawer no catálogo](componentes.md).
