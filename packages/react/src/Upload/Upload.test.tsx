import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it } from 'vitest'
import { Upload } from './Upload'
afterEach(cleanup)
it('accepts multiple local files without uploading them', async () => {
  render(<Upload label="Imagens" accept="image/*" multiple />)
  const input = screen.getByLabelText('Imagens') as HTMLInputElement
  const files = [
    new File(['a'], 'a.png', { type: 'image/png' }),
    new File(['b'], 'b.png', { type: 'image/png' }),
  ]
  await userEvent.setup().upload(input, files)
  expect([...input.files!]).toEqual(files)
})
it('does not select files while disabled', async () => {
  render(<Upload label="Arquivo" disabled />)
  const input = screen.getByLabelText('Arquivo') as HTMLInputElement
  await userEvent.setup().upload(input, new File(['x'], 'file.txt'))
  expect(input.files).toHaveLength(0)
})
