import { breakpoints, colors, spacing } from '@art-liz/tokens'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Container } from './Container'

describe('Container', () => {
  it.each([
    ['sm', breakpoints.sm],
    ['md', breakpoints.md],
    ['lg', breakpoints.lg],
    ['xl', breakpoints.xl],
    ['full', '100%'],
  ] as const)('uses the %s max-width', (maxWidth, expectedMaxWidth) => {
    render(
      <Container data-testid={`container-${maxWidth}`} maxWidth={maxWidth}>
        Conteúdo
      </Container>,
    )

    const container = screen.getByTestId(`container-${maxWidth}`)
    const styles = window.getComputedStyle(container)

    expect(styles.maxWidth).toBe(expectedMaxWidth)
    expect(styles.width).toBe('100%')
    expect(styles.padding).toBe(`0px ${spacing[4]}`)
    expect(styles.margin).toBe('0px auto')
    expect(container.hasAttribute('maxwidth')).toBe(false)
  })

  it('applies a background color token and custom padding and margin tokens', () => {
    render(
      <Container background="success.100" data-testid="custom-container" margin={3} padding={6} />,
    )

    const container = screen.getByTestId('custom-container')
    const styles = window.getComputedStyle(container)

    expect(styles.background).toBe(colors.success[100])
    expect(styles.padding).toBe(spacing[6])
    expect(styles.margin).toBe(spacing[3])
    expect(styles.width).toBe(`calc(100% - 24px)`)
    expect(container.hasAttribute('background')).toBe(false)
    expect(container.hasAttribute('padding')).toBe(false)
    expect(container.hasAttribute('margin')).toBe(false)
  })

  it('defaults to the xl breakpoint and forwards native div attributes', () => {
    render(
      <Container aria-label="Conteúdo principal" data-testid="default-container">
        Conteúdo
      </Container>,
    )

    const container = screen.getByTestId('default-container')
    expect(window.getComputedStyle(container).maxWidth).toBe(breakpoints.xl)
    expect(container.getAttribute('aria-label')).toBe('Conteúdo principal')
    expect(container.textContent).toBe('Conteúdo')
  })
})
