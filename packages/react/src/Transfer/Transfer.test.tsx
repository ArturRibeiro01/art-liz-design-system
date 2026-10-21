import { cleanup, render, screen, within, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { Transfer } from './Transfer'

afterEach(cleanup)

const items = [
  { id: 'a', label: 'Button' },
  { id: 'b', label: 'Input' },
  { id: 'c', label: 'Reservado', disabled: true },
]
it('moves selected items in both directions and submits their keys', async () => {
  const user = userEvent.setup()
  const { container } = render(
    <form>
      <Transfer label="Componentes" name="components" items={items} />
    </form>,
  )
  await user.click(screen.getByLabelText('Button'))
  await user.click(screen.getByRole('button', { name: 'Adicionar selecionados' }))
  expect(new FormData(container.querySelector('form')!).getAll('components')).toEqual(['a'])
  const target = within(screen.getByRole('group', { name: 'Selecionados (1)' }))
  await user.click(target.getByLabelText('Button'))
  await user.click(screen.getByRole('button', { name: 'Remover selecionados' }))
  expect(new FormData(container.querySelector('form')!).getAll('components')).toEqual([])
})
it('searches and selects only visible enabled items, then resets', async () => {
  const user = userEvent.setup()
  const { container } = render(
    <form>
      <Transfer label="Componentes" name="components" items={items} defaultTargetKeys={['b']} />
    </form>,
  )
  await user.type(screen.getByRole('searchbox', { name: 'Buscar em Disponíveis' }), 'But')
  const source = within(screen.getByRole('group', { name: 'Disponíveis (2)' }))
  await user.click(source.getByLabelText('Selecionar itens visíveis'))
  await user.click(screen.getByRole('button', { name: 'Adicionar selecionados' }))
  expect(new FormData(container.querySelector('form')!).getAll('components')).toEqual(['a', 'b'])
  await act(async () => container.querySelector('form')!.reset())
  expect(new FormData(container.querySelector('form')!).getAll('components')).toEqual(['b'])
  expect(
    (screen.getByRole('searchbox', { name: 'Buscar em Disponíveis' }) as HTMLInputElement).value,
  ).toBe('')
})
it('keeps disabled items fixed and respects controlled targets', async () => {
  const user = userEvent.setup()
  const change = vi.fn()
  render(<Transfer label="Componentes" items={items} targetKeys={[]} onTargetKeysChange={change} />)
  await user.click(screen.getByLabelText('Reservado'))
  expect((screen.getByLabelText('Reservado') as HTMLInputElement).checked).toBe(false)
  await user.click(screen.getByLabelText('Button'))
  await user.click(screen.getByRole('button', { name: 'Adicionar selecionados' }))
  expect(change).toHaveBeenCalledWith(['a'])
  expect(screen.getByRole('group', { name: 'Selecionados (0)' })).toBeTruthy()
})
