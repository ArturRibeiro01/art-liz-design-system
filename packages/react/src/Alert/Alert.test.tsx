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

it('keeps closed content out of keyboard navigation and supports reopening without remounting', async () => {
  const dismiss = vi.fn()
  const { rerender } = render(
    <Alert open={false} onDismiss={dismiss}>
      Preferências salvas
    </Alert>,
  )
  const content = screen.getByText('Preferências salvas')
  const container = content.closest('[role="status"]')!
  expect(screen.queryByRole('status')).toBeNull()
  expect(container.hasAttribute('inert')).toBe(true)
  rerender(
    <Alert open onDismiss={dismiss}>
      Preferências salvas
    </Alert>,
  )
  expect(screen.getByRole('status')).toBe(container)
  expect(container.hasAttribute('inert')).toBe(false)
  await userEvent.setup().click(screen.getByRole('button', { name: 'Fechar aviso' }))
  expect(dismiss).toHaveBeenCalledOnce()
  // Controlled dismissal: the consumer decides when the surface closes.
  expect(screen.getByRole('status')).toBe(container)
  rerender(
    <Alert open={false} onDismiss={dismiss}>
      Preferências salvas
    </Alert>,
  )
  expect(screen.queryByRole('status')).toBeNull()
  expect(screen.getByText('Preferências salvas')).toBe(content)
  expect(container.hasAttribute('inert')).toBe(true)
})

it('preserves the native hidden attribute when open is omitted', () => {
  render(<Alert hidden>Somente quando solicitado</Alert>)
  expect(screen.queryByRole('status')).toBeNull()
  expect(
    screen.getByText('Somente quando solicitado').closest('[role="status"]')?.hasAttribute('inert'),
  ).toBe(true)
})
