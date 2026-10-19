import styled from '@emotion/styled'
import { Badge, Box, Button, Text } from '@art-liz/react'
import { colors, radii, shadows, spacing, typography } from '@art-liz/tokens'
import { Link as RouterLink } from 'react-router-dom'

export const Page = styled.div`
  min-height: 100vh;
  background: ${colors.neutral[50]};
  color: ${colors.neutral[700]};
`
export const Navigation = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing[4]};
  padding: ${spacing[6]} 0;
  border-bottom: 1px solid ${colors.neutral[300]};
`
export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`
export const BrandMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${radii.medium};
  background: ${colors.primary[900]};
  color: ${colors.white};
`
export const NavigationLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing[4]};
`
export const RouteLink = styled(RouterLink)`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  color: ${colors.primary[900]};
  font-size: 14px;
  text-decoration: underline;
  text-underline-offset: 4px;
  &:hover {
    color: ${colors.neutral[700]};
  }
  &:focus-visible {
    outline: 3px solid ${colors.primary[800]};
    outline-offset: 4px;
  }
`
export const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  align-items: center;
  gap: ${spacing[8]};
  padding: 72px 0;
  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
    padding: 48px 0;
  }
`
export const HeroIntro = styled.div`
  display: grid;
  justify-items: start;
  gap: ${spacing[6]};
  min-width: 0;
`
export const Eyebrow = styled(Text)`
  color: ${colors.primary[900]};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`
export const PageTitle = styled.h1`
  margin: 0;
  max-width: 650px;
  font-size: clamp(2.5rem, 5.5vw, 4.5rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.045em;
  overflow-wrap: anywhere;
`
export const Introduction = styled(Text)`
  max-width: 480px;
  font-size: 16px;
  line-height: 1.75;
  color: ${colors.neutral[600]};
`
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing[3]};
`
export const PrimaryButton = styled(Button)`
  background: ${colors.primary[900]};
  border-color: ${colors.primary[900]};
  color: ${colors.white};
  &:hover:not(:disabled),
  &:active:not(:disabled) {
    background: ${colors.neutral[700]};
    border-color: ${colors.neutral[700]};
    color: ${colors.white};
  }
  &:focus-visible {
    outline-color: ${colors.primary[800]};
  }
`
export const Stack = styled.div`
  display: grid;
  gap: ${spacing[4]};
  min-width: 0;
`
export const Preview = styled(Box)`
  position: relative;
  border: 1px solid ${colors.neutral[300]};
  box-shadow: ${shadows.md};
  overflow-wrap: anywhere;
`
export const PreviewHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[8]};
`
export const PreviewIcon = styled(BrandMark)`
  width: 48px;
  height: 48px;
  background: ${colors.primary[100]};
  color: ${colors.primary[900]};
`
export const Divider = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid ${colors.neutral[200]};
  margin: ${spacing[6]} 0;
`
export const SmallBadge = styled(Badge)`
  font-size: 12px;
`
export const Workspace = styled.section`
  padding-bottom: 64px;
  min-width: 0;
  & > h2 {
    margin-bottom: ${spacing[2]};
  }
  & > p {
    margin-bottom: ${spacing[6]};
  }
`
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${spacing[6]};
  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
  }
`
export const Card = styled(Box)`
  border: 1px solid ${colors.neutral[300]};
  min-width: 0;
  overflow-wrap: anywhere;
`
export const Count = styled(Text)`
  font-size: 48px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  @media (max-width: 640px) {
    font-size: ${typography.textStyles.h1.fontSize};
  }
`
export const Feature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[3]};
  & > svg {
    color: ${colors.primary[900]};
    flex-shrink: 0;
  }
`
export const Footer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing[4]};
  border-top: 1px solid ${colors.neutral[300]};
  padding: ${spacing[6]} 0;
`
