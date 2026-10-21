import { useId } from 'react'
import type { HTMLAttributes } from 'react'
import {
  ChartRoot,
  ChartCaption,
  ChartList,
  ChartRow,
  ChartTrack,
  ChartHalf,
  ChartBar,
  ChartValue,
} from './Chart.style'
export interface ChartDatum {
  id: string
  label: string
  value: number
}
export interface ChartProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: string
  description?: string
  data: readonly ChartDatum[]
  valueFormatter?: (value: number) => string
  emptyLabel?: string
}
export function Chart({
  title,
  description,
  data,
  valueFormatter = String,
  emptyLabel = 'Sem dados para exibir.',
  ...props
}: ChartProps) {
  const id = useId()
  if (data.some((item) => !Number.isFinite(item.value)))
    throw new TypeError('Chart values must be finite numbers.')
  const max = data.reduce((max, item) => Math.max(max, Math.abs(item.value)), 0) || 1
  const diverging = data.some((item) => item.value < 0)
  return (
    <ChartRoot
      {...props}
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
    >
      <ChartCaption id={`${id}-title`}>{title}</ChartCaption>
      {description && <p id={`${id}-description`}>{description}</p>}
      {data.length ? (
        <ChartList aria-label="Dados do gráfico">
          {data.map((item) => (
            <ChartRow key={item.id}>
              <span>{item.label}</span>
              <ChartTrack aria-hidden="true">
                {diverging && (
                  <ChartHalf negative>
                    <ChartBar percent={item.value < 0 ? (Math.abs(item.value) / max) * 100 : 0} />
                  </ChartHalf>
                )}
                <ChartHalf>
                  <ChartBar percent={item.value > 0 ? (item.value / max) * 100 : 0} />
                </ChartHalf>
              </ChartTrack>
              <ChartValue>{valueFormatter(item.value)}</ChartValue>
            </ChartRow>
          ))}
        </ChartList>
      ) : (
        <p>{emptyLabel}</p>
      )}
    </ChartRoot>
  )
}
