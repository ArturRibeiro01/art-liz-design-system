import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { Badge } from './Badge'
afterEach(cleanup)
it('renders meaningful content without adding an unsolicited live region', () => {
  render(<Badge intent="success">Concluído</Badge>)
  expect(screen.getByText('Concluído')).toBeTruthy()
  expect(screen.queryByRole('status')).toBeNull()
})

it('accepts all sizes while preserving span attributes and semantics', () => {
  render(
    <>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Badge key={size} size={size} title={`Estado ${size}`} intent="info">
          {size}
        </Badge>
      ))}
    </>,
  )
  for (const size of ['small', 'medium', 'large']) {
    const badge = screen.getByText(size)
    expect(badge.tagName).toBe('SPAN')
    expect(badge.getAttribute('title')).toBe(`Estado ${size}`)
    expect(badge.hasAttribute('size')).toBe(false)
    expect(badge.hasAttribute('intent')).toBe(false)
    expect(badge.hasAttribute('role')).toBe(false)
  }
})
