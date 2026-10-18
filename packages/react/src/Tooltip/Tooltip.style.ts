import styled from '@emotion/styled'
import { colors, radii, shadows, spacing, zIndices } from '@art-liz/tokens'
import { componentText } from '../internal/Field.style'
export const TooltipRoot = styled.span`
  display: inline-flex;
`
export const TooltipSurface = styled.span`
  ${componentText};
  display: block;
  position: fixed;
  z-index: ${zIndices.toast};
  max-width: min(240px, calc(100vw - 16px));
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: ${radii.small};
  box-shadow: ${shadows.md};
  background: ${colors.neutral[800]};
  color: ${colors.white};
  overflow-wrap: anywhere;
  box-sizing: border-box;
  &[hidden] {
    display: none;
  }
`
