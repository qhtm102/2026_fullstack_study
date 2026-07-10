import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { compactNumber, formatNumber } from '../utils/stockFormat'

const chartUnits = [
  { value: 'day', label: '일봉' },
  { value: 'week', label: '주봉' },
  { value: 'month', label: '월봉' },
]

const tooltipStyle = {
  background: 'var(--stock-surface)',
  border: '1px solid var(--stock-line)',
  borderRadius: 6,
  color: 'var(--stock-text)',
  boxShadow: 'var(--stock-shadow)',
}

const tooltipLabelStyle = {
  color: 'var(--stock-muted)',
  fontWeight: 700,
}

export default function StockCharts({ chartData, chartUnit, onChartUnitChange }) {
  return (
    <section className="stock-page__charts">
      <ChartPanel
        title="주식 차트"
        subtitle={`${getUnitLabel(chartUnit)} ${chartData.length}개`}
        action={
          <div className="stock-page__unit-tabs" aria-label="차트 단위">
            {chartUnits.map((unit) => (
              <button
                key={unit.value}
                type="button"
                className={chartUnit === unit.value ? 'is-active' : ''}
                onClick={() => onChartUnitChange(unit.value)}
              >
                {unit.label}
              </button>
            ))}
          </div>
        }
        custom
      >
        <CandlestickChart data={chartData} unit={chartUnit} />
      </ChartPanel>

      <ChartPanel title="거래량" subtitle={`${getUnitLabel(chartUnit)} 거래량`}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="var(--stock-line)" vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            stroke="var(--stock-muted)"
            tick={{ fill: 'var(--stock-muted)' }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={compactNumber}
            stroke="var(--stock-muted)"
            tick={{ fill: 'var(--stock-muted)' }}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value) => formatNumber(value)}
          />
          <Bar dataKey="volume" fill="var(--stock-volume)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartPanel>
    </section>
  )
}

function ChartPanel({ title, subtitle, action, children, custom = false }) {
  return (
    <article className="stock-page__panel">
      <div className="stock-page__panel-header">
        <div>
          <h2>{title}</h2>
          <span>{subtitle}</span>
        </div>
        {action}
      </div>
      <div className="stock-page__chart">
        {custom ? (
          children
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        )}
      </div>
    </article>
  )
}

function CandlestickChart({ data, unit }) {
  const svgRef = useRef(null)
  const [range, setRange] = useState(null)
  const [dragStart, setDragStart] = useState(null)
  const [dragEnd, setDragEnd] = useState(null)

  const visibleRange = normalizeRange(range, data.length)
  const visibleData = useMemo(
    () => data.slice(visibleRange.start, visibleRange.end + 1),
    [data, visibleRange.start, visibleRange.end],
  )

  const chartMeta = useMemo(() => {
    if (!visibleData.length) {
      return null
    }

    // SVG viewBox 기준으로 캔들 위치, 축, 여백을 계산한다.
    const width = 1040
    const height = 310
    const padding = { top: 18, right: 42, bottom: 34, left: 12 }
    const values = visibleData.flatMap((item) => [item.high, item.low]).filter(Number.isFinite)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const plotWidth = width - padding.left - padding.right
    const plotHeight = height - padding.top - padding.bottom
    const gap = plotWidth / visibleData.length

    return {
      width,
      height,
      padding,
      min,
      max,
      rangeValue: max - min || 1,
      plotHeight,
      gap,
      candleWidth: Math.max(5, Math.min(18, gap * 0.5)),
      ticks: makeTicks(min, max),
      labelStep: Math.max(1, Math.ceil(visibleData.length / 6)),
    }
  }, [visibleData])

  useEffect(() => {
    const node = svgRef.current
    if (!node || !chartMeta || data.length <= 5) {
      return undefined
    }

    function onWheel(event) {
      // 차트 위에서 휠을 돌리면 페이지 스크롤 대신 차트 확대/축소만 처리한다.
      event.preventDefault()
      event.stopPropagation()

      const direction = event.deltaY > 0 ? 1 : -1
      const currentSize = visibleRange.end - visibleRange.start + 1
      const nextSize = Math.max(5, Math.min(data.length, currentSize + direction * 4))
      const center = getIndexFromPointer(event, node, chartMeta, visibleData.length, visibleRange)
      const start = Math.max(0, Math.min(data.length - nextSize, Math.round(center - nextSize / 2)))

      setRange(nextSize === data.length ? null : { start, end: start + nextSize - 1 })
    }

    node.addEventListener('wheel', onWheel, { passive: false })
    return () => node.removeEventListener('wheel', onWheel)
  }, [chartMeta, data.length, visibleData.length, visibleRange])

  if (!data.length || !chartMeta) {
    return <div className="stock-page__chart-empty">조회 후 차트가 표시됩니다.</div>
  }

  const { width, height, padding, max, rangeValue, plotHeight, gap, candleWidth, ticks, labelStep } =
    chartMeta
  const dragBox = getDragBox(dragStart, dragEnd, visibleRange, padding, gap)

  function y(value) {
    return padding.top + ((max - value) / rangeValue) * plotHeight
  }

  function handlePointerDown(event) {
    event.currentTarget.setPointerCapture(event.pointerId)
    const index = getIndexFromPointer(event, event.currentTarget, chartMeta, visibleData.length, visibleRange)
    setDragStart(index)
    setDragEnd(index)
  }

  function handlePointerMove(event) {
    if (dragStart === null) {
      return
    }
    setDragEnd(getIndexFromPointer(event, event.currentTarget, chartMeta, visibleData.length, visibleRange))
  }

  function handlePointerUp(event) {
    if (dragStart === null || dragEnd === null) {
      return
    }

    event.currentTarget.releasePointerCapture(event.pointerId)
    const start = Math.min(dragStart, dragEnd)
    const end = Math.max(dragStart, dragEnd)

    // 일정 구간 이상 드래그했을 때만 해당 구간으로 확대한다.
    if (end - start >= 2) {
      setRange({ start, end })
    }

    setDragStart(null)
    setDragEnd(null)
  }

  return (
    <div className="stock-page__candle-wrap">
      <svg
        ref={svgRef}
        className="stock-page__candle-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          setDragStart(null)
          setDragEnd(null)
        }}
        onDoubleClick={() => setRange(null)}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke="var(--stock-line)"
            />
            <text x={width - padding.right + 7} y={y(tick) + 4} fill="var(--stock-muted)" fontSize="12">
              {compactNumber(tick)}
            </text>
          </g>
        ))}

        {visibleData.map((item, index) => {
          const x = padding.left + gap * index + gap / 2
          const openY = y(item.open)
          const closeY = y(item.close)
          const highY = y(item.high)
          const lowY = y(item.low)
          const isUp = item.close >= item.open
          const color = isUp ? 'var(--stock-up)' : 'var(--stock-down)'
          const bodyHeight = Math.max(3, Math.abs(closeY - openY))
          const bodyY = Math.min(openY, closeY) - (bodyHeight === 3 ? 1.5 : 0)

          return (
            <g key={`${unit}-${item.rawDate}-${index}`}>
              <title>
                {`${item.date} 시가 ${formatNumber(item.open)} 고가 ${formatNumber(item.high)} 저가 ${formatNumber(item.low)} 종가 ${formatNumber(item.close)}`}
              </title>
              <line x1={x} x2={x} y1={highY} y2={lowY} stroke={color} strokeWidth="2" />
              <rect
                x={x - candleWidth / 2}
                y={bodyY}
                width={candleWidth}
                height={bodyHeight}
                fill={color}
                stroke={color}
                strokeWidth="1"
              />
              {index % labelStep === 0 && (
                <text x={x} y={height - 10} fill="var(--stock-muted)" fontSize="12" textAnchor="middle">
                  {item.date}
                </text>
              )}
            </g>
          )
        })}

        {dragBox && (
          <rect
            className="stock-page__drag-box"
            x={dragBox.x}
            y={padding.top}
            width={dragBox.width}
            height={plotHeight}
          />
        )}
      </svg>
      {range && (
        <button className="stock-page__reset-zoom" type="button" onClick={() => setRange(null)}>
          전체 보기
        </button>
      )}
    </div>
  )
}

function getIndexFromPointer(event, node, chartMeta, visibleLength, visibleRange) {
  const bounds = node.getBoundingClientRect()
  const x = ((event.clientX - bounds.left) / bounds.width) * chartMeta.width
  const clampedX = Math.max(
    chartMeta.padding.left,
    Math.min(chartMeta.width - chartMeta.padding.right, x),
  )
  const localIndex = Math.floor((clampedX - chartMeta.padding.left) / chartMeta.gap)
  return Math.max(0, Math.min(visibleLength - 1, localIndex)) + visibleRange.start
}

function normalizeRange(range, length) {
  if (!range || length === 0) {
    return { start: 0, end: Math.max(0, length - 1) }
  }

  return {
    start: Math.max(0, Math.min(length - 1, range.start)),
    end: Math.max(0, Math.min(length - 1, range.end)),
  }
}

function getDragBox(start, end, visibleRange, padding, gap) {
  if (start === null || end === null || start === end) {
    return null
  }

  const min = Math.max(visibleRange.start, Math.min(start, end))
  const max = Math.min(visibleRange.end, Math.max(start, end))
  const localStart = min - visibleRange.start
  const localEnd = max - visibleRange.start

  return {
    x: padding.left + localStart * gap,
    width: Math.max(8, (localEnd - localStart + 1) * gap),
  }
}

function makeTicks(min, max) {
  const step = (max - min || 1) / 4
  return Array.from({ length: 5 }, (_, index) => Math.round(min + step * index)).reverse()
}

function getUnitLabel(unit) {
  if (unit === 'week') {
    return '주봉'
  }
  if (unit === 'month') {
    return '월봉'
  }
  return '일봉'
}
