import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { Slider } from './Slider'
afterEach(cleanup)
it('forwards range bounds, changes and form values', () => {
  const change = vi.fn()
  render(
    <form>
      <Slider
        label="Volume"
        name="volume"
        min={0}
        max={100}
        step={10}
        defaultValue={30}
        onChange={change}
      />
    </form>,
  )
  const input = screen.getByRole('slider') as HTMLInputElement
  fireEvent.change(input, { target: { value: '40' } })
  expect(input.step).toBe('10')
  expect(change).toHaveBeenCalledOnce()
  expect(new FormData(input.form!).get('volume')).toBe('40')
})
