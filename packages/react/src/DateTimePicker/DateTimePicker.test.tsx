import { cleanup, render, act } from '@testing-library/react'

import { createRef } from 'react'
import { afterEach, expect, it } from 'vitest'
import { DateTimePicker } from './DateTimePicker'

afterEach(cleanup)

it('preserves date constraints, messages, ref and form submission', () => {
  const ref = createRef<HTMLInputElement>()
  render(
    <form>
      <DateTimePicker
        ref={ref}
        label="Prazo"
        name="date"
        mode="date"
        min="2026-01-01"
        max="2026-12-31"
        defaultValue="2026-10-18"
        error="Confira a data"
        required
      />
    </form>,
  )
  expect(ref.current!.type).toBe('date')
  expect(new FormData(ref.current!.form!).get('date')).toBe('2026-10-18')
  expect(ref.current!.getAttribute('aria-invalid')).toBe('true')
  expect(document.getElementById(ref.current!.getAttribute('aria-describedby')!)?.textContent).toBe(
    'Confira a data',
  )
  ref.current!.value = '2027-01-01'
  expect(ref.current!.validity.rangeOverflow).toBe(true)
})
it('preserves native reset for time', async () => {
  const ref = createRef<HTMLInputElement>()
  render(
    <form>
      <DateTimePicker ref={ref} label="Hora" mode="time" defaultValue="14:30" />
    </form>,
  )
  ref.current!.value = '15:00'
  act(() => ref.current!.form!.reset())
  expect(ref.current!.value).toBe('14:30')
})
