import { radii, shadows, spacing } from '@art-liz/tokens'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Box } from './Box'

describe('Box', () => {
  it('renders children and forwards native div attributes', () => {
    render(
      <Box aria-label="Resumo" data-testid="summary-box">
        Conteúdo
      </Box>,
    )

    const box = screen.getByTestId('summary-box')
    expect(box.tagName).toBe('DIV')
    expect(box.getAttribute('aria-label')).toBe('Resumo')
    expect(box.textContent).toBe('Conteúdo')
  })

  it('applies spacing, radius, and shadow tokens', () => {
    render(
      <Box borderRadius="medium" data-testid="styled-box" padding={4} shadow="md">
        Conteúdo
      </Box>,
    )

    const styles = window.getComputedStyle(screen.getByTestId('styled-box'))
    expect(styles.padding).toBe(spacing[4])
    expect(styles.borderRadius).toBe(radii.medium)
    expect(styles.boxShadow).toBe(shadows.md)
  })

  it('defaults to no padding, radius, or shadow', () => {
    render(<Box data-testid="default-box">Conteúdo</Box>)

    const styles = window.getComputedStyle(screen.getByTestId('default-box'))
    expect(styles.padding).toBe('0px')
    expect(styles.borderRadius).toBe('0')
    expect(styles.boxShadow).toBe('none')
  })
})
