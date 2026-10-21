import { interactiveMotion } from '../internal/motion.style'
import styled from '@emotion/styled'
import { colors } from '@art-liz/tokens'
import { componentText, keyboardFocus } from '../internal/Field.style'
export const StyledLink = styled.a`
  ${componentText};
  ${keyboardFocus};
  color: ${colors.primary[900]};
  text-decoration: underline;
  text-underline-offset: 0.15em;
  &:hover {
    color: ${colors.primary[900]};
  }
  ${interactiveMotion};
`
