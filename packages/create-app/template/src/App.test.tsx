import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { App } from './App'
import { useCounterStore } from './store/counter'

beforeEach(() => window.history.replaceState({}, '', '/'))
afterEach(() => {
  cleanup()
  useCounterStore.setState({ count: 0 })
})

describe('App', () => {
  it('updates shared state, resets it, and navigates between routes', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Sua aplicação começa aqui' })).toBeInTheDocument()
    expect(screen.getByText('Contagem: 0')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Aumentar contador' }))
    expect(screen.getByText('Contagem: 1')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Zerar' }))
    expect(screen.getByText('Contagem: 0')).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'Sobre este template' }))
    expect(screen.getByRole('heading', { name: 'Sobre este template' })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'Voltar ao início' }))
    expect(screen.getByRole('heading', { name: 'Sua aplicação começa aqui' })).toBeInTheDocument()
  })
  it('submits preferences locally and lets the user dismiss feedback', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('tab', { name: 'Preferências' }))
    const name = screen.getByRole('textbox', { name: 'Como podemos chamar você?' })
    await user.clear(name)
    await user.type(name, 'Artur')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Seu foco' }), 'team')
    await user.click(screen.getByRole('switch', { name: 'Receber novidades sobre o projeto' }))
    await user.click(screen.getByRole('button', { name: 'Salvar preferências' }))
    expect(screen.getByRole('status')).toHaveTextContent(
      'Preferências de Artur salvas nesta sessão.',
    )
    await user.click(screen.getByRole('button', { name: 'Fechar mensagem' }))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
  it('removes and restores markers without losing the other tabs', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('tab', { name: 'Componentes' }))
    await user.click(screen.getByRole('button', { name: 'Remover Interface' }))
    expect(screen.queryByRole('button', { name: 'Remover Interface' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Restaurar marcadores' }))
    expect(screen.getByRole('button', { name: 'Remover Interface' })).toBeInTheDocument()
    await user.click(screen.getByRole('tab', { name: 'Visão geral' }))
    expect(screen.getByRole('button', { name: 'Aumentar contador' })).toBeVisible()
  })
})
