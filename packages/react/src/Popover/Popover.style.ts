import styled from '@emotion/styled'
import { spacing } from '@art-liz/tokens'
import { FloatingSurface, FloatingTrigger } from '../internal/Floating.style'
export const PopoverSurface = styled(FloatingSurface)`
  & > h2 {
    margin-bottom: ${spacing[2]};
  }
`
export const PopoverTrigger = styled(FloatingTrigger)``
