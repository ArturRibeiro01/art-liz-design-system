import { cleanup, render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { Cascader } from './Cascader'

afterEach(cleanup)

const options = [
  {
    value: 'br',
    label: 'Brasil',
    children: [
      { value: 'sp', label: 'São Paulo', children: [{ value: 'mogi', label: 'Mogi' }] },
      { value: 'off', label: 'Indisponível', disabled: true },
    ],
  },
  { value: 'pt', label: 'Portugal', children: [{ value: 'lis', label: 'Lisboa' }] },
]
it('selects a complete path and clears descendants on parent change', async () => {
  const change = vi.fn()
  const user = userEvent.setup()
  const { container } = render(
    <form>
      <Cascader label="Local" name="place" options={options} onValueChange={change} />
    </form>,
  )
  await user.selectOptions(screen.getByLabelText('Nível 1'), 'br')
  expect(new FormData(container.querySelector('form')!).has('place')).toBe(false)
  await user.selectOptions(screen.getByLabelText('Nível 2'), 'sp')
  await user.selectOptions(screen.getByLabelText('Nível 3'), 'mogi')
  expect(new FormData(container.querySelector('form')!).get('place')).toBe('mogi')
  await user.selectOptions(screen.getByLabelText('Nível 1'), 'pt')
  expect(screen.queryByLabelText('Nível 3')).toBeNull()
  expect(change).toHaveBeenLastCalledWith(['pt'])
  expect(new FormData(container.querySelector('form')!).has('place')).toBe(false)
})
it('resets an uncontrolled path and excludes disabled group values', async () => {
  const { container, rerender } = render(
    <form>
      <Cascader label="Local" name="place" options={options} defaultValue={['br', 'sp', 'mogi']} />
    </form>,
  )
  await userEvent.setup().selectOptions(screen.getByLabelText('Nível 1'), 'pt')
  await act(async () => container.querySelector('form')!.reset())
  expect((screen.getByLabelText('Nível 3') as HTMLSelectElement).value).toBe('mogi')
  rerender(
    <form>
      <Cascader
        disabled
        label="Local"
        name="place"
        options={options}
        defaultValue={['br', 'sp', 'mogi']}
      />
    </form>,
  )
  expect(new FormData(container.querySelector('form')!).has('place')).toBe(false)
})
it('preserves controlled path and prevented resets', async () => {
  const change = vi.fn()
  const user = userEvent.setup()
  const { container } = render(
    <form onReset={(e) => e.preventDefault()}>
      <Cascader
        label="Local"
        name="place"
        options={options}
        value={['br', 'sp', 'mogi']}
        onValueChange={change}
      />
    </form>,
  )
  await user.selectOptions(screen.getByLabelText('Nível 1'), 'pt')
  expect(change).toHaveBeenLastCalledWith(['pt'])
  expect(new FormData(container.querySelector('form')!).get('place')).toBe('mogi')
  await act(async () => container.querySelector('form')!.reset())
  expect(change).toHaveBeenCalledTimes(1)
})
