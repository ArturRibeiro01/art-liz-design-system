const defaultSansFontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'

const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.375rem',
} as const

const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

export const typography = {
  cssVariables: {
    fontFamily: '--art-liz-font-family',
  },
  fontFamilies: {
    sans: defaultSansFontFamily,
    component: `var(--art-liz-font-family, ${defaultSansFontFamily})`,
    mono: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
  },
  fontSizes,
  fontWeights,
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
  textStyles: {
    h1: { fontSize: fontSizes['3xl'], lineHeight: fontSizes['4xl'] },
    h2: { fontSize: fontSizes['2xl'], lineHeight: '2rem' },
    h3: { fontSize: fontSizes.xl, lineHeight: '1.75rem' },
    title: { fontSize: fontSizes.lg, lineHeight: '1.625rem' },
    subtitle: { fontSize: fontSizes.md, lineHeight: '1.5rem' },
    body: { fontSize: fontSizes.sm, lineHeight: '1.375rem' },
    caption: { fontSize: fontSizes.xs, lineHeight: '1.125rem' },
  },
} as const
