import styled from '@emotion/styled'
import { spacing } from '@art-liz/tokens'
export const StyledForm = styled('form', { shouldForwardProp: (prop) => prop !== 'gap' })<{
  gap: keyof typeof spacing
}>`
  display: grid;
  gap: ${({ gap }) => spacing[gap]};
  min-width: 0;
  width: 100%;
`
