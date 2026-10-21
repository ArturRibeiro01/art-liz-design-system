import styled from '@emotion/styled'
import { Dialog } from '../Dialog'
export const StyledDrawer = styled(Dialog)`
  border-radius: 0;
  margin: 0 0 0 auto;
  width: min(400px, calc(100vw - 16px));
  height: 100dvh;
  max-height: 100dvh;
  left: auto;
  right: 0;
  top: 0;
  bottom: 0;
  &[data-side='left'] {
    margin: 0 auto 0 0;
    left: 0;
    right: auto;
  }
  transform: translateX(100%);
  &[open] {
    transform: none;
  }
  &[data-side='left'] {
    transform: translateX(-100%);
  }
  &[data-side='left'][open] {
    transform: none;
  }
  @starting-style {
    &[open] {
      transform: translateX(100%);
    }
    &[data-side='left'][open] {
      transform: translateX(-100%);
    }
  }
`
