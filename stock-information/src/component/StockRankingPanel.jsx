import { useMemo, useState } from 'react'
import { formatNumber, formatSigned, toNumber } from '../utils/stockFormat'

const rankingTabs = [
  { value: 'up', label: '상승률' },
  { value: 'down', label: '하락률' },
  { value: 'cap', label: '시총' },
]
const RANKING_LIMIT = 10

export default function StockRankingPanel({ stocks, isLoading, error, onStockSelect }) {
  const [rankingType, setRankingType] = useState('up')

  const rankedStocks = useMemo(() => {
    const copiedStocks = [...stocks]

    // 선택한 버튼에 따라 같은 최신 기준일 데이터를 서로 다른 기준으로 정렬한다.
    if (rankingType === 'down') {
      return copiedStocks.sort((a, b) => toNumber(a.fltRt) - toNumber(b.fltRt)).slice(0, RANKING_LIMIT)
    }

    if (rankingType === 'cap') {
      return copiedStocks
        .sort((a, b) => toNumber(b.mrktTotAmt) - toNumber(a.mrktTotAmt))
        .slice(0, RANKING_LIMIT)
    }

    return copiedStocks.sort((a, b) => toNumber(b.fltRt) - toNumber(a.fltRt)).slice(0, RANKING_LIMIT)
  }, [rankingType, stocks])

  return (
    <section className="stock-page__panel stock-page__ranking">
      <div className="stock-page__ranking-head">
        <div>
          <h2>시장 랭킹</h2>
          <span>{isLoading ? '불러오는 중' : `상위 ${RANKING_LIMIT}개`}</span>
        </div>
        <div className="stock-page__ranking-tabs" aria-label="랭킹 기준">
          {rankingTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              className={rankingType === tab.value ? 'is-active' : ''}
              onClick={() => setRankingType(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="stock-page__ranking-list">
        {error && <p className="stock-page__ranking-empty">{error}</p>}
        {!error && !isLoading && !rankedStocks.length && (
          <p className="stock-page__ranking-empty">랭킹 데이터가 없습니다.</p>
        )}
        {!error &&
          rankedStocks.map((stock, index) => (
            <button
              className="stock-page__ranking-item"
              key={`${stock.srtnCd}-${stock.basDt}-${rankingType}`}
              type="button"
              onClick={() => onStockSelect(stock.srtnCd)}
            >
              <span className="stock-page__ranking-rank">{index + 1}</span>
              <span className="stock-page__ranking-name">
                <strong>{stock.itmsNm}</strong>
                <small>{stock.srtnCd}</small>
              </span>
              <span className={getToneClass(stock.fltRt)}>
                {rankingType === 'cap'
                  ? formatNumber(stock.mrktTotAmt)
                  : `${formatSigned(stock.fltRt)}%`}
              </span>
            </button>
          ))}
        {!error && isLoading && (
          <p className="stock-page__ranking-empty">시장 데이터를 불러오고 있습니다.</p>
        )}
      </div>
    </section>
  )
}

function getToneClass(value) {
  if (toNumber(value) > 0) {
    return 'stock-page__up'
  }
  if (toNumber(value) < 0) {
    return 'stock-page__down'
  }
  return ''
}
