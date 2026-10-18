import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it } from 'vitest'
import { ButtonGroup } from './ButtonGroup'
afterEach(cleanup)
it('labels a group and preserves native button order', async () => {
  render(
    <ButtonGroup aria-label="Edição">
      <button>Copiar</button>
      <button disabled>Colar</button>
      <button>Recortar</button>
    </ButtonGroup>,
  )
  expect(screen.getByRole('group', { name: 'Edição' })).toBeTruthy()
  const user = userEvent.setup()
  await user.tab()
  expect(document.activeElement).toBe(screen.getByText('Copiar'))
  await user.tab()
  expect(document.activeElement).toBe(screen.getByText('Recortar'))
})
