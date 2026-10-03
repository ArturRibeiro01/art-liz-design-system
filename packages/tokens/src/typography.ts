const defaultSansFontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif'

export const typography = {
  cssVariables: {
    fontFamily: '--art-liz-font-family',
  },
  fontFamilies: {
    sans: defaultSansFontFamily,
    component: `var(--art-liz-font-family, ${defaultSansFontFamily})`,
    mono: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
} as const
