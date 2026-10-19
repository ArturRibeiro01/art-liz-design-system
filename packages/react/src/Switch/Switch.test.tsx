import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { Switch } from './Switch'
afterEach(cleanup)
it('toggles using Space and participates in forms', async () => {
  const user = userEvent.setup()
  render(
    <form>
      <Switch label="Ativo" name="enabled" value="yes" />
    </form>,
  )
  const input = screen.getByRole('switch') as HTMLInputElement
  await user.tab()
  await user.keyboard(' ')
  expect(input.checked).toBe(true)
  expect(new FormData(input.form!).get('enabled')).toBe('yes')
})
it('supports controlled selection and disabled state', async () => {
  const change = vi.fn()
  const { rerender } = render(<Switch checked={false} label="Ativo" onChange={change} />)
  await userEvent.setup().click(screen.getByRole('switch'))
  expect(change).toHaveBeenCalledOnce()
  expect((screen.getByRole('switch') as HTMLInputElement).checked).toBe(false)
  rerender(<Switch checked disabled label="Ativo" onChange={change} />)
  await userEvent.setup().click(screen.getByRole('switch'))
  expect(change).toHaveBeenCalledOnce()
})
