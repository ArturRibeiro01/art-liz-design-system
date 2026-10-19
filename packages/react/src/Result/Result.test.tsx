import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { Result } from './Result'

afterEach(cleanup)

it('names its region and keeps consumer actions usable', async () => {
  const retry = vi.fn()
  render(
    <Result
      title="Falha ao salvar"
      description="Tente novamente"
      actions={<button onClick={retry}>Repetir</button>}
    />,
  )
  expect(screen.getByRole('region', { name: 'Falha ao salvar' }).textContent).toContain(
    'Tente novamente',
  )
  await userEvent.setup().click(screen.getByRole('button', { name: 'Repetir' }))
  expect(retry).toHaveBeenCalledOnce()
})
