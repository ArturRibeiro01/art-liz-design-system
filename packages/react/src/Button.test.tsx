import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders its label and forwards native button attributes', () => {
    render(<Button disabled>Salvar</Button>)

    expect(screen.getByRole('button', { name: 'Salvar' }).hasAttribute('disabled')).toBe(true)
  })

  it('defaults to the primary variant', () => {
    render(<Button>Continuar</Button>)

    expect(screen.getByRole('button', { name: 'Continuar' })).toBeTruthy()
  })
})