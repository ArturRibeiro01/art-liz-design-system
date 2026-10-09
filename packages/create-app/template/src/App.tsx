import { colors, typography } from '@art-liz/tokens'
import { Global, css } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 60_000 },
  },
})

const globalStyles = css`
  :root {
    background: ${colors.white};
    color: ${colors.neutral[900]};
    font-family: ${typography.fontFamilies.component};
  }

  * {
    box-sizing: border-box;
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    margin: 0;
  }

  a {
    color: inherit;
  }
`

export function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<AboutPage />} path="/sobre" />
            <Route element={<HomePage />} path="*" />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}
