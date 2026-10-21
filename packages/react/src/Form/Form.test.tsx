import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { Form } from './Form'
afterEach(cleanup)
it('delegates native submission and reset without changing form semantics', async () => {
  const submit = vi.fn((event) => event.preventDefault())
  render(
    <Form aria-label="Cadastro" onSubmit={submit}>
      <input aria-label="Nome" name="name" defaultValue="Liz" />
      <button type="submit">Salvar</button>
    </Form>,
  )
  await userEvent.setup().click(screen.getByRole('button'))
  expect(submit).toHaveBeenCalledOnce()
  expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('name')).toBe('Liz')
})
