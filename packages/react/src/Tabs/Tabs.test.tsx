import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { Tabs } from './Tabs'
afterEach(cleanup)
const items = [
  { id: 'a', label: 'Conta', content: 'Dados da conta' },
  { id: 'b', label: 'Bloqueado', content: 'Oculto', disabled: true },
  { id: 'c', label: 'Preferências', content: 'Preferências salvas' },
]
it('uses roving focus, skips disabled tabs and associates panels', async () => {
  const user = userEvent.setup()
  render(<Tabs label="Configurações" items={items} />)
  const first = screen.getByRole('tab', { name: 'Conta' })
  await user.tab()
  expect(document.activeElement).toBe(first)
  await user.keyboard('{ArrowRight}')
  expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Preferências' }))
  expect(screen.getByRole('tabpanel').textContent).toBe('Preferências salvas')
  await user.keyboard('{Home}')
  expect(document.activeElement).toBe(first)
})
it('respects controlled selection', async () => {
  const change = vi.fn()
  render(<Tabs label="Configurações" items={items} value="a" onValueChange={change} />)
  await userEvent.setup().click(screen.getByRole('tab', { name: 'Preferências' }))
  expect(change).toHaveBeenCalledWith('c')
  expect(screen.getByRole('tabpanel').textContent).toBe('Dados da conta')
})
it('supports vertical keyboard movement and fallback when items change', async () => {
  const { rerender } = render(<Tabs label="Configurações" orientation="vertical" items={items} />)
  const user = userEvent.setup()
  await user.tab()
  await user.keyboard('{ArrowDown}')
  expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Preferências' }))
  rerender(<Tabs label="Configurações" items={[items[0]]} />)
  expect(screen.getByRole('tab').getAttribute('aria-selected')).toBe('true')
})
