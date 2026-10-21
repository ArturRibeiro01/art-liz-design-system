import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it } from 'vitest'
import { Select } from './Select'
afterEach(cleanup)
it('preserves native selection and optgroups', async () => {
  render(
    <form>
      <Select label="Cidade" name="city" defaultValue="sp">
        <optgroup label="Sudeste">
          <option value="sp">São Paulo</option>
          <option value="rj">Rio</option>
        </optgroup>
      </Select>
    </form>,
  )
  const select = screen.getByRole('combobox') as HTMLSelectElement
  await userEvent.setup().selectOptions(select, 'rj')
  expect(new FormData(select.form!).get('city')).toBe('rj')
})
it('preserves multiple selection and error associations', async () => {
  render(
    <Select label="Interesses" multiple error="Selecione" defaultValue={[]}>
      <option value="a">A</option>
      <option value="b">B</option>
    </Select>,
  )
  const select = screen.getByRole('listbox') as HTMLSelectElement
  await userEvent.setup().selectOptions(select, ['a', 'b'])
  expect([...select.selectedOptions].map((option) => option.value)).toEqual(['a', 'b'])
  expect(select.getAttribute('aria-invalid')).toBe('true')
})
