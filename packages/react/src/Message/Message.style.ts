import styled from '@emotion/styled'
import { shadows, spacing } from '@art-liz/tokens'
import { StyledAlert, AlertClose } from '../Alert/Alert.style'
export const MessageRoot = styled(StyledAlert)`
  align-items: center;
  justify-content: flex-start;
  padding: ${spacing[2]} ${spacing[3]};
  box-shadow: ${shadows.sm};
`
export const MessageContent = styled.div`
  flex: 1;
  min-width: 0;
`
export const MessageClose = styled(AlertClose)``
