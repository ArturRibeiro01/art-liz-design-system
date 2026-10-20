# Primeiro projeto com componentes

Este roteiro acrescenta uma página de preferências ao template de homologação. Ele combina componentes, ícones, estado React e navegação. Salvar mantém os dados apenas no estado da página; sair da rota ou recarregar restaura os valores iniciais.

## 1. Gerar a base

Use a combinação publicada registrada em [Instalação e requisitos](instalacao.md). O comando fixa a versão do CLI usada na validação e deixa a inicialização de Git para seu fluxo de trabalho:

```sh
npm create @art-liz/app@0.0.0-beta-20261019054917 -- primeiro-projeto --tag beta --no-git --no-install
cd primeiro-projeto
npm install
npm install --save-exact @art-liz/react@1.1.0 @art-liz/tokens@0.2.0
```

O último comando fixa as versões do DS usadas no roteiro. Mantenha o lockfile para reproduzir as demais dependências. Em projetos novos fora deste exemplo, você pode selecionar as tags atuais conforme o canal pretendido.

## 2. Compor o formulário

Crie `src/pages/PreferenciasPage.tsx`:

```tsx
import { Box, Button, Checkbox, Container, Form, Icons, Input, Message, Text } from '@art-liz/react'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

export function PreferenciasPage() {
  const [nome, setNome] = useState('Artur')
  const [novidades, setNovidades] = useState(false)
  const [mensagem, setMensagem] = useState('')

  return (
    <main>
      <Container maxWidth="md" padding={4}>
        <Box padding={4} background="white" borderRadius="medium">
          <Text as="h1" variant="h1">
            Minhas preferências
          </Text>
          <Form
            onSubmit={(event) => {
              event.preventDefault()
              setMensagem(
                `${nome}: novidades ${novidades ? 'ativadas' : 'desativadas'} nesta sessão.`,
              )
            }}
            onReset={() => {
              setNome('Artur')
              setNovidades(false)
              setMensagem('')
            }}
          >
            <Input
              label="Seu nome"
              name="nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              helpText="Como você deseja ser chamado neste exemplo."
              required
              clearable
              onClear={() => setNome('')}
            />
            <Checkbox
              label="Receber novidades"
              name="novidades"
              checked={novidades}
              onChange={(event) => setNovidades(event.target.checked)}
            />
            <Button type="submit" startIcon={<Icons.CheckIcon size="1em" />}>
              Salvar preferências
            </Button>
            <Button type="reset" variant="outline">
              Restaurar valores
            </Button>
            {mensagem && (
              <Message intent="success" onDismiss={() => setMensagem('')}>
                {mensagem}
              </Message>
            )}
            <RouterLink to="/">Voltar ao início</RouterLink>
          </Form>
        </Box>
      </Container>
    </main>
  )
}
```

Input e Checkbox são controlados pelo estado React. Por isso, limpar o Input atualiza o estado em `onClear`, e restaurar o formulário atualiza os estados em `onReset`. `required` mantém a validação nativa antes do submit. O Message anuncia o resultado como status e pode ser dispensado.

O layout e os espaçamentos usam as props do DS. O ícone vem de `Icons`; o texto do botão continua sendo seu nome acessível.

## 3. Registrar a rota e personalizar a navegação inicial

Em `src/App.tsx`, acrescente o import junto das páginas existentes:

```tsx
import { PreferenciasPage } from './pages/PreferenciasPage'
```

Dentro do `<Routes>` existente, coloque esta rota antes da curinga `path="*"`. Preserve os providers e os estilos globais do template:

```tsx
<Route element={<PreferenciasPage />} path="/preferencias" />
```

Em `src/pages/HomePage.tsx`, acrescente este link dentro de `<NavigationLinks>`, ao lado de **Sobre este template**. `RouteLink` já está importado dos estilos da página:

```tsx
<RouteLink to="/preferencias">Minhas preferências</RouteLink>
```

A navegação usa React Router e preserva o estado das áreas que continuam montadas. Para personalizar a apresentação da Home, use `HomePage.style.ts` e tokens. Ao alterar títulos ou comportamentos existentes, ajuste os testes correspondentes.

## 4. Testar o fluxo

Crie `src/pages/PreferenciasPage.test.tsx`:

```tsx
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, expect, it } from 'vitest'
import { App } from '../App'
import { PreferenciasPage } from './PreferenciasPage'

afterEach(() => {
  cleanup()
  window.history.replaceState({}, '', '/')
})

it('salva as preferências e restaura os valores controlados', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <PreferenciasPage />
    </MemoryRouter>,
  )
  const nome = screen.getByRole('textbox', { name: 'Seu nome' })
  await user.clear(nome)
  await user.type(nome, 'Liz')
  await user.click(screen.getByRole('checkbox', { name: 'Receber novidades' }))
  await user.click(screen.getByRole('button', { name: 'Salvar preferências' }))
  expect(screen.getByRole('status')).toHaveTextContent('Liz: novidades ativadas nesta sessão.')
  await user.click(screen.getByRole('button', { name: 'Restaurar valores' }))
  expect(nome).toHaveValue('Artur')
  expect(screen.getByRole('checkbox', { name: 'Receber novidades' })).not.toBeChecked()
  expect(screen.queryByRole('status')).not.toBeInTheDocument()
})

it('navega da página inicial para o formulário e volta', async () => {
  const user = userEvent.setup()
  window.history.replaceState({}, '', '/')
  render(<App />)
  await user.click(screen.getByRole('link', { name: 'Minhas preferências' }))
  expect(screen.getByRole('heading', { name: 'Minhas preferências' })).toBeInTheDocument()
  await user.click(screen.getByRole('link', { name: 'Voltar ao início' }))
  expect(screen.getByRole('heading', { name: 'Sua aplicação começa aqui' })).toBeInTheDocument()
})
```

Execute:

```sh
npm run typecheck
npm test
npm run lint
npm run format:check
npm run build
npm run dev
```

No navegador, siga **Minhas preferências**, altere os campos, salve, dispense a mensagem e restaure os valores. Confira também a navegação por Tab e o submit com o nome vazio.

## Levar para seu produto

Implemente persistência e estados de carregamento/erro antes de apresentar o resultado como salvo em servidor. Nenhum dado deste exemplo sai do navegador. O TanStack Query já está disponível no template para integrações, mas este formulário não faz requisições.

Consulte o [catálogo do ambiente](catalogos.md) para as APIs completas. As receitas mais amplas de composição continuam na [issue #41](https://github.com/ArturRibeiro01/art-liz-design-system/issues/41).
