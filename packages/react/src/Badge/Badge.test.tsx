import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { Badge } from './Badge'
afterEach(cleanup)
it('renders meaningful content without adding an unsolicited live region', () => {
  render(<Badge intent="success">Concluído</Badge>)
  expect(screen.getByText('Concluído')).toBeTruthy()
  expect(screen.queryByRole('status')).toBeNull()
})
