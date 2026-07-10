import { formatDate, formatNumber, formatSigned, toNumber } from '../utils/stockFormat'

export default function StockHistoryTable({ stocks }) {
  return (
    <section className="stock-page__panel">
      <div className="stock-page__panel-header">
        <h2>일별 시세</h2>
        <span>{stocks.length ? `${stocks.length}개 데이터` : '조회 전'}</span>
      </div>
      <div className="stock-page__table-wrap">
        <table>
          <thead>
            <tr>
              <th>기준일</th>
              <th>시가</th>
              <th>고가</th>
              <th>저가</th>
              <th>종가</th>
              <th>전일대비</th>
              <th>등락률</th>
              <th>거래량</th>
              <th>시가총액</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length ? (
              stocks.map((stock) => (
                <tr key={`${stock.srtnCd}-${stock.basDt}`}>
                  <td>{formatDate(stock.basDt)}</td>
                  <td>{formatNumber(stock.mkp)}</td>
                  <td>{formatNumber(stock.hipr)}</td>
                  <td>{formatNumber(stock.lopr)}</td>
                  <td>{formatNumber(stock.clpr)}</td>
                  <td className={getToneClass(stock.vs)}>{formatSigned(stock.vs)}</td>
                  <td className={getToneClass(stock.fltRt)}>{stock.fltRt}%</td>
                  <td>{formatNumber(stock.trqu)}</td>
                  <td>{formatNumber(stock.mrktTotAmt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="stock-page__empty" colSpan="9">
                  아직 조회된 데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
