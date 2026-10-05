import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ButtonIntent, ButtonVariant } from './Button'
import { Button } from './Button'

const intents: ButtonIntent[] = ['primary', 'danger', 'success', 'info', 'warning']
const variants: ButtonVariant[] = ['primary', 'outline', 'ghost', 'link']
const combinations = intents.flatMap((intent) => variants.map((variant) => ({ intent, variant })))

describe('Button', () => {
  it('renders its label and forwards native button attributes', () => {
    render(<Button disabled>Salvar</Button>)

    expect(screen.getByRole('button', { name: 'Salvar' }).hasAttribute('disabled')).toBe(true)
  })

  it('defaults to the primary variant', () => {
    render(<Button>Continuar</Button>)

    expect(screen.getByRole('button', { name: 'Continuar' })).toBeTruthy()
  })

  it.each(combinations)(
    'renders $intent intent with $variant variant without forwarding intent to the DOM',
    ({ intent, variant }) => {
      const label = `${intent} ${variant}`
      render(
        <Button intent={intent} variant={variant}>
          {label}
        </Button>,
      )

      const button = screen.getByRole('button', { name: label })
      expect(button.hasAttribute('intent')).toBe(false)
    },
  )

  it.each(combinations)(
    'keeps $intent intent with $variant variant disabled and prevents its click handler',
    ({ intent, variant }) => {
      const onClick = vi.fn()
      render(
        <Button disabled intent={intent} onClick={onClick} variant={variant}>
          {intent} {variant} disabled
        </Button>,
      )

      const button = screen.getByRole('button', { name: `${intent} ${variant} disabled` })
      expect(button.hasAttribute('disabled')).toBe(true)
      expect(window.getComputedStyle(button).cursor).toBe('not-allowed')
      fireEvent.click(button)
      expect(onClick).not.toHaveBeenCalled()
    },
  )

  it('renders start and end icons as decorative content', () => {
    render(
      <>
        <Button startIcon="+">Adicionar</Button>
        <Button endIcon="+">Prosseguir</Button>
      </>,
    )

    expect(screen.getByRole('button', { name: 'Adicionar' }).textContent).toBe('+Adicionar')
    expect(screen.getByRole('button', { name: 'Prosseguir' }).textContent).toBe('Prosseguir+')
  })

  it('supports the three visual sizes without forwarding its size prop to the DOM', () => {
    render(
      <>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </>,
    )

    for (const name of ['Small', 'Medium', 'Large']) {
      expect(screen.getByRole('button', { name }).hasAttribute('size')).toBe(false)
    }
  })
})
