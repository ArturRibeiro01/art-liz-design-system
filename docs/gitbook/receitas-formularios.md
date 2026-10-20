# Formulários e mensagens

Esta receita usa o estado React para o nome e o checkbox, e um Select não controlado para a categoria. A validação é da aplicação: o Form preserva o elemento HTML e não fornece um serviço de validação ou persistência.

Crie um componente como `CadastroLocal.tsx` em uma aplicação com a [combinação compatível](instalacao.md):

```tsx
import { Button, Checkbox, Form, Input, Message, Select } from '@art-liz/react'
import { useRef, useState } from 'react'

export function CadastroLocal() {
  const [nome, setNome] = useState('')
  const [novidades, setNovidades] = useState(false)
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')
  const nomeRef = useRef<HTMLInputElement>(null)

  return (
    <Form
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        setMensagem('')
        if (!nome.trim()) {
          setErro('Informe um nome para o projeto.')
          nomeRef.current?.focus()
          return
        }
        setErro('')
        const dados = new FormData(event.currentTarget)
        setMensagem(
          `${nome.trim()} (${dados.get('categoria')}): novidades ${novidades ? 'ativadas' : 'desativadas'} nesta sessão.`,
        )
      }}
      onReset={() => {
        setNome('')
        setNovidades(false)
        setErro('')
        setMensagem('')
      }}
    >
      <Input
        ref={nomeRef}
        label="Nome do projeto"
        name="nome"
        value={nome}
        onChange={(event) => {
          setNome(event.target.value)
          setErro('')
        }}
        required
        error={erro}
        clearable
        onClear={() => setNome('')}
      />
      <Select label="Categoria" name="categoria" defaultValue="pessoal">
        <option value="pessoal">Pessoal</option>
        <option value="equipe">Equipe</option>
      </Select>
      <Checkbox
        label="Receber atualizações"
        name="novidades"
        checked={novidades}
        onChange={(event) => setNovidades(event.target.checked)}
      />
      <Button type="submit">Cadastrar localmente</Button>
      <Button type="reset" variant="outline">
        Limpar cadastro
      </Button>
      {mensagem && (
        <Message intent="success" onDismiss={() => setMensagem('')}>
          {mensagem}
        </Message>
      )}
    </Form>
  )
}
```

`noValidate` deixa a receita apresentar sua própria mensagem para um nome vazio. O foco vai para o primeiro campo inválido. A validação do servidor deve ser implementada quando houver uma integração real; o texto do exemplo informa que o resultado existe apenas nesta sessão.

O reset nativo restaura o Select para `pessoal`. Os valores controlados são restaurados explicitamente em `onReset`. Limpar um Input controlado exige atualizar `value` no callback `onClear`, pois a limpeza não sintetiza `onChange`.

Para erros gerais de uma requisição, mostre uma mensagem clara e preserve os valores para correção. Reserve `role="alert"` para anúncios que exigem interrupção; Message usa `status` por padrão. Ao adicionar uma operação assíncrona, controle o estado pendente no app e evite submissões repetidas.

Confira o [roteiro com testes e navegação](primeiro-projeto.md), os [contratos de estado](estado-e-limites.md) e a [referência dos componentes](componentes.md). Revise labels, mensagens, Tab/Shift+Tab e o reset completo no consumidor.
