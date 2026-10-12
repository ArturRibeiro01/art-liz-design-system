import { typography } from '@art-liz/tokens'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ButtonIntent, ButtonVariant } from './Button'
import { Button } from './Button'

afterEach(cleanup)

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

  it('defaults to type button and forwards an explicitly supplied type', () => {
    render(
      <>
        <Button data-testid="default-type">Default type</Button>
        <Button data-testid="submit-type" type="submit">
          Submit type
        </Button>
      </>,
    )

    expect(screen.getByTestId('default-type').getAttribute('type')).toBe('button')
    expect(screen.getByTestId('submit-type').getAttribute('type')).toBe('submit')
  })

  it('calls its click handler when enabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is keyboard reachable and activates with Enter and Space', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Keyboard action</Button>)

    const button = screen.getByRole('button', { name: 'Keyboard action' })
    await user.tab()
    expect(document.activeElement).toBe(button)

    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledOnce()
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(2)
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

  it('scales icon slots with the Button size', () => {
    render(
      <>
        <Button size="small" startIcon={<svg data-testid="small-icon" />}>
          Small icon
        </Button>
        <Button endIcon={<svg data-testid="medium-icon" />}>Medium icon</Button>
        <Button size="large" startIcon={<svg data-testid="large-icon" />}>
          Large icon
        </Button>
      </>,
    )

    const iconSlots = [
      screen.getByTestId('small-icon').parentElement,
      screen.getByTestId('medium-icon').parentElement,
      screen.getByTestId('large-icon').parentElement,
    ].filter((slot): slot is HTMLElement => slot !== null)

    expect(iconSlots).toHaveLength(3)
    expect(window.getComputedStyle(iconSlots[0]).fontSize).toBe(typography.fontSizes.md)
    expect(window.getComputedStyle(iconSlots[1]).fontSize).toBe(typography.fontSizes.xl)
    expect(window.getComputedStyle(iconSlots[2]).fontSize).toBe(typography.fontSizes['2xl'])
  })

  it('requires an accessible name for icon-only buttons', () => {
    expect(() => render(<Button startIcon="+" />)).toThrow(
      'Button requires children or an accessible name when rendered with icons only.',
    )
  })

  it('supports icon-only buttons with an accessible name', () => {
    render(<Button aria-label="Excluir" startIcon="+" />)

    expect(screen.getByRole('button', { name: 'Excluir' })).toBeTruthy()
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

  it.each([
    ['small', typography.textStyles.body],
    ['medium', typography.textStyles.subtitle],
    ['large', typography.textStyles.title],
  ] as const)('uses the Text %s variant for its label', (size, textStyle) => {
    render(
      <Button data-testid="text-button" size={size}>
        Action
      </Button>,
    )

    const label = screen.getByTestId('text-button').querySelector('[data-button-label]')
    expect(label).not.toBeNull()
    expect(window.getComputedStyle(label as Element).fontSize).toBe(textStyle.fontSize)
    expect(window.getComputedStyle(label as Element).lineHeight).toBe(textStyle.lineHeight)
  })
})
