import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { Breadcrumb } from './Breadcrumb'
afterEach(cleanup)
it('exposes navigation links and the current page', () => {
  render(<Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Projetos' }]} />)
  expect(screen.getByRole('navigation')).toBeTruthy()
  expect(screen.getByRole('link').getAttribute('href')).toBe('/')
  expect(screen.getByText('Projetos').getAttribute('aria-current')).toBe('page')
})
it('omits an empty trail', () => {
  render(<Breadcrumb items={[]} />)
  expect(screen.queryByRole('navigation')).toBeNull()
})
