import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { Alert } from './Alert'
afterEach(cleanup)
it('announces status and supports named dismiss actions', async () => {
  const dismiss = vi.fn()
  render(
    <Alert title="Atualizado" onDismiss={dismiss}>
      Preferências salvas
    </Alert>,
  )
  expect(screen.getByRole('status').textContent).toContain('Preferências salvas')
  await userEvent.setup().click(screen.getByRole('button', { name: 'Fechar aviso' }))
  expect(dismiss).toHaveBeenCalledOnce()
})
it('supports urgent alerts when explicitly requested', () => {
  render(
    <Alert role="alert" intent="danger">
      Falha ao salvar
    </Alert>,
  )
  expect(screen.getByRole('alert').textContent).toBe('Falha ao salvar')
})
