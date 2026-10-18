import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { Table } from './Table'
afterEach(cleanup)
it('preserves caption, column and row header semantics', () => {
  render(
    <Table caption="Projetos">
      <thead>
        <tr>
          <th scope="col">Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Art-Liz</th>
        </tr>
      </tbody>
    </Table>,
  )
  expect(screen.getByRole('table', { name: 'Projetos' })).toBeTruthy()
  expect(screen.getByRole('columnheader').textContent).toBe('Nome')
  expect(screen.getByRole('rowheader').textContent).toBe('Art-Liz')
})
