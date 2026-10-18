import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { Message } from './Message'

afterEach(cleanup)

it('announces feedback and delegates dismissal to the consumer', async () => {
  const dismiss = vi.fn()
  render(<Message onDismiss={dismiss}>Salvo</Message>)
  expect(screen.getByRole('status').textContent).toContain('Salvo')
  await userEvent.setup().click(screen.getByRole('button', { name: 'Fechar mensagem' }))
  expect(dismiss).toHaveBeenCalledOnce()
  expect(screen.getByRole('status')).toBeTruthy()
})
