import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { App } from './App'
import { useCounterStore } from './store/counter'

afterEach(() => {
  cleanup()
  useCounterStore.setState({ count: 0 })
})

describe('App', () => {
  it('uses the design system, updates Zustand state, and navigates between routes', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Sua aplicação começa aqui' })).toBeInTheDocument()
    expect(screen.getByText('Contagem: 0')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Aumentar contador' }))
    expect(screen.getByText('Contagem: 1')).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Sobre este template' }))
    expect(screen.getByRole('heading', { name: 'Sobre este template' })).toBeInTheDocument()
  })
})
