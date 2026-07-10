import { formatDate, formatNumber, formatSigned, toNumber } from '../utils/stockFormat'

export default function StockSummary({ latest, keyword }) {
  const tone = toNumber(latest?.vs) > 0 ? 'up' : toNumber(latest?.vs) < 0 ? 'down' : ''
  const newsKeyword = latest?.itmsNm || keyword

  return (
    <section className="stock-page__metrics">
      <NewsMetric keyword={newsKeyword} />
      <Metric label="종목" value={latest ? `${latest.itmsNm} (${latest.srtnCd})` : '-'} />
      <Metric label="기준일" value={latest ? formatDate(latest.basDt) : '-'} />
      <Metric label="종가" value={latest ? `${formatNumber(latest.clpr)}원` : '-'} tone={tone} />
      <Metric
        label="전일대비"
        value={latest ? `${formatSigned(latest.vs)} (${latest.fltRt}%)` : '-'}
        tone={tone}
      />
      <Metric label="거래량" value={latest ? formatNumber(latest.trqu) : '-'} />
    </section>
  )
}

function NewsMetric({ keyword }) {
  const query = keyword?.trim()
  const href = query
    ? `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(query)}`
    : undefined

  return (
    <div className="stock-page__metric stock-page__metric--news">
      <span>최신 뉴스</span>
      {href ? (
        <a className="stock-page__news-button" href={href} target="_blank" rel="noreferrer">
          네이버 뉴스
        </a>
      ) : (
        <strong>-</strong>
      )}
    </div>
  )
}

function Metric({ label, value, tone = '' }) {
  return (
    <div className="stock-page__metric">
      <span>{label}</span>
      <strong className={tone ? `stock-page__${tone}` : ''}>{value}</strong>
    </div>
  )
}
