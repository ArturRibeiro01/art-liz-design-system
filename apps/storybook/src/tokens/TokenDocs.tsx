import type { CSSProperties, ReactNode } from 'react'

const pageStyle: CSSProperties = {
  color: '#1f1f1f',
  fontFamily:
    'var(--art-liz-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif)',
  margin: '0 auto',
  maxWidth: '1120px',
  padding: '48px 32px 64px',
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gap: '16px',
}

export function TokenPage({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <main style={pageStyle}>
      <header
        style={{ borderBottom: '1px solid #eeeeee', marginBottom: '32px', paddingBottom: '32px' }}
      >
        <p style={{ color: '#8e8e8e', fontSize: '14px', margin: '0 0 16px' }}>Design tokens</p>
        <h1 style={{ fontSize: '40px', lineHeight: 1.2, margin: '0 0 16px' }}>{title}</h1>
        <p
          style={{
            color: '#4b4b4b',
            fontSize: '16px',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '760px',
          }}
        >
          {description}
        </p>
      </header>
      <div style={gridStyle}>{children}</div>
    </main>
  )
}

export function TokenSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section style={{ display: 'grid', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '22px', lineHeight: 1.3, margin: '0 0 8px' }}>{title}</h2>
        {description ? (
          <p style={{ color: '#4b4b4b', lineHeight: 1.6, margin: 0, maxWidth: '760px' }}>
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      style={{
        background: '#fafafa',
        border: '1px solid #eeeeee',
        borderRadius: '8px',
        color: '#4b4b4b',
        fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
        fontSize: '13px',
        lineHeight: 1.6,
        margin: 0,
        overflowX: 'auto',
        padding: '16px',
        whiteSpace: 'pre-wrap',
      }}
    >
      <code>{children}</code>
    </pre>
  )
}

export function TokenTable({
  rows,
}: {
  rows: Array<{ name: string; value: string | number; preview?: ReactNode }>
}) {
  return (
    <div style={{ border: '1px solid #eeeeee', borderRadius: '8px', overflow: 'hidden' }}>
      {rows.map((row) => (
        <div
          key={row.name}
          style={{
            alignItems: 'center',
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'minmax(160px, 1fr) minmax(160px, 1fr) minmax(160px, 2fr)',
            padding: '14px 16px',
          }}
        >
          <strong style={{ fontSize: '14px' }}>{row.name}</strong>
          <code style={{ color: '#4b4b4b', fontSize: '13px' }}>{row.value}</code>
          <div>{row.preview}</div>
        </div>
      ))}
    </div>
  )
}
