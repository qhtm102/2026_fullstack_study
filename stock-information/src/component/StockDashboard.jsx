import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { formatDate, formatNumber, toNumber } from '../utils/stockFormat'
import SearchPanel from './SearchPanel'
import StockCharts from './StockCharts'
import StockHistoryTable from './StockHistoryTable'
import StockRankingPanel from './StockRankingPanel'
import StockSummary from './StockSummary'
import './stock-dashboard.css'

const STOCK_API_URL =
  'http://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo'
const SERVICE_KEY = '7e6755b54e575c9038738bacba43836b4d1d4b63b6a2aa5190f52f40dfde3945'

export default function StockDashboard() {
  const [keyword, setKeyword] = useState('')
  const [stocks, setStocks] = useState([])
  const [rankingStocks, setRankingStocks] = useState([])
  const [message, setMessage] = useState('종목명 또는 6자리 종목코드를 입력하세요.')
  const [rankingError, setRankingError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRankingLoading, setIsRankingLoading] = useState(false)
  const [chartUnit, setChartUnit] = useState('day')
  const [isDarkMode, setIsDarkMode] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia?.('(prefers-color-scheme: dark)').matches,
  )

  // 다크모드 상태를 body class에 반영해서 페이지 전체 배경까지 같이 바뀌게 한다.
  useEffect(() => {
    document.body.classList.toggle('stock-theme-dark', isDarkMode)
    document.body.classList.toggle('stock-theme-light', !isDarkMode)

    return () => {
      document.body.classList.remove('stock-theme-dark', 'stock-theme-light')
    }
  }, [isDarkMode])

  // 첫 화면 진입 시 시장 전체 최신 데이터를 받아 랭킹 패널의 원본 데이터로 사용한다.
  useEffect(() => {
    let ignore = false

    async function loadRankingStocks() {
      setIsRankingLoading(true)
      setRankingError('')

      try {
        const items = await fetchMarketSnapshot()
        if (!ignore) {
          setRankingStocks(items)
        }
      } catch {
        if (!ignore) {
          setRankingStocks([])
          setRankingError('랭킹을 불러오지 못했습니다.')
        }
      } finally {
        if (!ignore) {
          setIsRankingLoading(false)
        }
      }
    }

    loadRankingStocks()

    return () => {
      ignore = true
    }
  }, [])

  const latest = stocks[0]
  const tableStocks = stocks.slice(0, 30)
  const chartData = useMemo(() => {

    
    // API 응답은 최신일이 먼저 올 수 있어서 차트용 데이터는 날짜 오름차순으로 정렬한다.
    const dailyData = [...stocks]
      .sort((a, b) => a.basDt.localeCompare(b.basDt))
      .map((stock) => ({
        date: formatDate(stock.basDt, 'short'),
        rawDate: stock.basDt,
        open: toNumber(stock.mkp),
        high: toNumber(stock.hipr),
        low: toNumber(stock.lopr),
        close: toNumber(stock.clpr),
        volume: toNumber(stock.trqu),
      }))

    return groupChartData(dailyData, chartUnit)
  }, [stocks, chartUnit])

  async function loadStockHistory(query) {
    setIsLoading(true)
    setMessage('조회 중입니다.')

    try {
      const data = await fetchStockHistory(query)
      const items = data.items || []

      setStocks(items)
      setMessage(`${formatNumber(data.totalCount)}건 중 ${items.length}건을 불러왔습니다.`)
    } catch (error) {
      setStocks([])
      setMessage(error instanceof Error ? error.message : '조회 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const query = keyword.trim()
    if (!query) {
      setMessage('검색어를 입력하세요.')
      return
    }

    await loadStockHistory(query)
  }

  function handleRankingSelect(code) {
    // 랭킹에서 종목을 누르면 검색창에도 코드가 들어가고 해당 종목 상세 시세를 조회한다.
    setKeyword(code)
    loadStockHistory(code)
  }

  return (
    <main className={`stock-page ${isDarkMode ? 'stock-page--dark' : 'stock-page--light'}`}>
      <div className="stock-page__layout">
        <SearchPanel
          keyword={keyword}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
          onKeywordChange={setKeyword}
          onSubmit={handleSubmit}
          onThemeToggle={() => setIsDarkMode((value) => !value)}
        />
        <StockSummary latest={latest} keyword={keyword} />
        <StockRankingPanel
          stocks={rankingStocks}
          isLoading={isRankingLoading}
          error={rankingError}
          onStockSelect={handleRankingSelect}
        />
        <section className="stock-page__main">
          <StockCharts
            chartData={chartData}
            chartUnit={chartUnit}
            onChartUnitChange={setChartUnit}
          />
        </section>
      </div>

      <StockHistoryTable stocks={tableStocks} />
      <p className="stock-page__message" aria-live="polite">
        {message}
      </p>
    </main>
  )
}

async function fetchStockHistory(keyword) {
  const query = keyword.trim()
  const isStockCode = /^\d{6}$/.test(query)
  const params = {
    serviceKey: SERVICE_KEY,
    pageNo: 1,
    numOfRows: 240,
    resultType: 'json',
    // 6자리 숫자는 종목코드로, 그 외에는 종목명으로 조회한다.
    ...(isStockCode ? { likeSrtnCd: query } : { itmsNm: query }),
  }

  const response = await axios.get(STOCK_API_URL, { params })
  const body = response.data?.response?.body
  const header = response.data?.response?.header
  const item = body?.items?.item || []
  const rawItems = Array.isArray(item) ? item : [item]
  const items = isStockCode ? rawItems.filter((stock) => stock?.srtnCd === query) : rawItems

  return {
    resultCode: header?.resultCode,
    resultMsg: header?.resultMsg,
    totalCount: Number(body?.totalCount || 0),
    items,
  }
}

async function fetchMarketSnapshot() {
  const response = await axios.get(STOCK_API_URL, {
    params: {
      serviceKey: SERVICE_KEY,
      pageNo: 1,
      numOfRows: 3000,
      resultType: 'json',
    },
  })
  const item = response.data?.response?.body?.items?.item || []
  const items = Array.isArray(item) ? item : [item]
  const latestDate = items.reduce((maxDate, stock) => {
    if (!stock?.basDt) {
      return maxDate
    }
    return stock.basDt > maxDate ? stock.basDt : maxDate
  }, '')

  // 여러 기준일 데이터가 섞일 수 있어서 가장 최신 기준일의 종목만 랭킹에 사용한다.
  return items.filter((stock) => stock?.basDt === latestDate && stock?.srtnCd && stock?.itmsNm)
}

function groupChartData(data, unit) {
  if (unit === 'day') {
    return data
  }

  const groups = new Map()

  data.forEach((item) => {
    const key = unit === 'week' ? getWeekKey(item.rawDate) : item.rawDate.slice(0, 6)
    const label =
      unit === 'week'
        ? getWeekLabel(item.rawDate)
        : `${item.rawDate.slice(2, 4)}.${item.rawDate.slice(4, 6)}`
    const group = groups.get(key)

    if (!group) {
      groups.set(key, {
        date: label,
        rawDate: item.rawDate,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.volume,
      })
      return
    }

    // 주봉/월봉은 첫날 시가, 기간 최고가/최저가, 마지막 날 종가, 누적 거래량으로 만든다.
    group.high = Math.max(group.high, item.high)
    group.low = Math.min(group.low, item.low)
    group.close = item.close
    group.volume += item.volume
  })

  return Array.from(groups.values())
}

function getWeekKey(rawDate) {
  const date = parseRawDate(rawDate)
  const monday = new Date(date)
  const day = monday.getDay() || 7
  monday.setDate(monday.getDate() - day + 1)
  return monday.toISOString().slice(0, 10)
}

function getWeekLabel(rawDate) {
  const key = getWeekKey(rawDate).replaceAll('-', '')
  return `${key.slice(2, 4)}.${key.slice(4, 6)}.${key.slice(6, 8)}`
}

function parseRawDate(rawDate) {
  return new Date(
    Number(rawDate.slice(0, 4)),
    Number(rawDate.slice(4, 6)) - 1,
    Number(rawDate.slice(6, 8)),
  )
}
