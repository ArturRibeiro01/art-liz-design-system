import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { Link } from './Link'
afterEach(cleanup)
it('preserves navigation semantics and adds safe rel tokens for new tabs', () => {
  render(
    <Link href="https://example.com" target="_blank" rel="author">
      Referência
    </Link>,
  )
  const link = screen.getByRole('link')
  expect(link.getAttribute('href')).toBe('https://example.com')
  expect(link.getAttribute('rel')!.split(' ')).toEqual(['author', 'noopener', 'noreferrer'])
})
