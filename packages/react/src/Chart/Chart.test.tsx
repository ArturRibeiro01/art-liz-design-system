import { cleanup, render, screen } from '@testing-library/react'

import { afterEach, expect, it } from 'vitest'
import { Chart } from './Chart'

afterEach(cleanup)

it('exposes readable labels and formatted negative and zero values', () => {
  render(
    <Chart
      title="Variação"
      data={[
        { id: 'a', label: 'Janeiro', value: -5 },
        { id: 'b', label: 'Fevereiro', value: 0 },
      ]}
      valueFormatter={(value) => `${value}%`}
    />,
  )
  expect(screen.getByRole('figure', { name: 'Variação' })).toBeTruthy()
  expect(screen.getByText('-5%')).toBeTruthy()
  expect(screen.getByText('0%')).toBeTruthy()
  expect(screen.getAllByRole('listitem')).toHaveLength(2)
})
it('provides an empty state and rejects invalid numeric data', () => {
  const { rerender } = render(<Chart title="Variação" data={[]} />)
  expect(screen.getByText('Sem dados para exibir.')).toBeTruthy()
  expect(() =>
    rerender(<Chart title="Variação" data={[{ id: 'a', label: 'Inválido', value: NaN }]} />),
  ).toThrow('finite')
})
