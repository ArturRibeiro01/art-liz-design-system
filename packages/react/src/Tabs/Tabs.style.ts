import styled from '@emotion/styled'
import { colors, spacing } from '@art-liz/tokens'
import { componentText, keyboardFocus } from '../internal/Field.style'
export const TabsRoot = styled.div`
  display: grid;
  gap: ${spacing[4]};
  min-width: 0;
  &[data-orientation='vertical'] {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
  }
`
export const TabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[1]};
  &[aria-orientation='vertical'] {
    flex-direction: column;
  }
`
export const TabButton = styled.button`
  ${componentText};
  ${keyboardFocus};
  border: 0;
  border-bottom: 2px solid transparent;
  padding: ${spacing[2]} ${spacing[3]};
  background: transparent;
  color: ${colors.neutral[700]};
  cursor: pointer;
  &[aria-selected='true'] {
    color: ${colors.primary[900]};
    border-color: ${colors.primary[900]};
  }
  &:disabled {
    color: ${colors.neutral[500]};
    cursor: not-allowed;
  }
`
export const TabPanel = styled.div`
  ${componentText};
  ${keyboardFocus};
  color: ${colors.neutral[700]};
  min-width: 0;
  overflow-wrap: anywhere;
  &[hidden] {
    display: none;
  }
`
