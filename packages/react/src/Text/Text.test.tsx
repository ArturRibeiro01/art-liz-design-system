import { colors, typography } from '@art-liz/tokens'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Text } from './Text'

afterEach(cleanup)

const variants = Object.keys(typography.textStyles) as Array<keyof typeof typography.textStyles>

describe('Text', () => {
  it.each(variants)('applies the %s typography tokens', (variant) => {
    render(
      <Text data-testid="text" variant={variant}>
        Sample text
      </Text>,
    )

    const text = screen.getByTestId('text')
    const styles = window.getComputedStyle(text)

    expect(styles.fontSize).toBe(typography.textStyles[variant].fontSize)
    expect(styles.lineHeight).toBe(typography.textStyles[variant].lineHeight)
    expect(styles.margin).toBe('0px')
    expect(text.hasAttribute('variant')).toBe(false)
  })

  it('uses a semantic element through as and forwards native attributes', () => {
    render(
      <Text as="h1" data-testid="heading" id="page-title" variant="h1">
        Account
      </Text>,
    )

    const heading = screen.getByRole('heading', { level: 1, name: 'Account' })
    expect(heading).toBe(screen.getByTestId('heading'))
    expect(heading.tagName).toBe('H1')
    expect(heading.getAttribute('id')).toBe('page-title')
    expect(heading.hasAttribute('as')).toBe(false)
  })

  it('uses the body variant and regular weight by default', () => {
    render(<Text data-testid="default-text">Default text</Text>)

    const styles = window.getComputedStyle(screen.getByTestId('default-text'))
    expect(styles.fontSize).toBe(typography.textStyles.body.fontSize)
    expect(styles.fontWeight).toBe(String(typography.fontWeights.regular))
  })

  it('supports a typography weight token', () => {
    render(
      <Text data-testid="medium-text" weight="medium">
        Medium text
      </Text>,
    )

    expect(window.getComputedStyle(screen.getByTestId('medium-text')).fontWeight).toBe(
      String(typography.fontWeights.medium),
    )
  })

  it('accepts a standard design-system font-family token', () => {
    render(
      <Text data-testid="mono-text" fontFamily="mono">
        Code
      </Text>,
    )

    expect(window.getComputedStyle(screen.getByTestId('mono-text')).fontFamily).toBe(
      typography.fontFamilies.mono,
    )
  })

  it('accepts a custom font-family stack', () => {
    const customFontFamily = '"Figtree", sans-serif'
    render(
      <Text data-testid="custom-font-text" fontFamily={customFontFamily}>
        Custom type
      </Text>,
    )

    const text = screen.getByTestId('custom-font-text')
    expect(window.getComputedStyle(text).fontFamily).toBe(customFontFamily)
    expect(text.hasAttribute('fontfamily')).toBe(false)
  })

  it('applies a selected design-system color token without forwarding color to the DOM', () => {
    render(
      <Text color="danger.600" data-testid="danger-text">
        Error message
      </Text>,
    )

    const text = screen.getByTestId('danger-text')
    expect(window.getComputedStyle(text).color).toBe(colors.danger[600])
    expect(text.hasAttribute('color')).toBe(false)
  })

  it('defaults to the neutral.900 design-system color token', () => {
    render(<Text data-testid="default-color">Default color</Text>)

    expect(window.getComputedStyle(screen.getByTestId('default-color')).color).toBe(
      colors.neutral[900],
    )
  })
})
