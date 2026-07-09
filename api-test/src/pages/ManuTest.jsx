import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManuTest.css';

// Predefined corporate registration numbers of famous companies
const PRESET_COMPANIES = [
  { name: '삼성전자', crno: '1301110006246' },
  { name: '현대자동차', crno: '1101110004566' },
  { name: 'SK하이닉스', crno: '1301110010049' },
  { name: 'NAVER', crno: '1101111700140' },
  { name: '카카오', crno: '1101111075783' },
  { name: 'LG에너지솔루션', crno: '1101117957388' }
];

const SERVICE_KEY = 'amkVoiGffeamYHpKvHLnPo6aNRUoVFS7nqkVjpw9LD%2Byf8CPGLYtmZH9U4fwvXTlj9L4lpDF7K9apDE26gF%2F%2BA%3D%3D';

export default function ManuTest() {
  const [selectedCrno, setSelectedCrno] = useState(PRESET_COMPANIES[0].crno);
  const [customCrno, setCustomCrno] = useState('');
  const [companyName, setCompanyName] = useState(PRESET_COMPANIES[0].name);
  const [rawData, setRawData] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [selectedDcd, setSelectedDcd] = useState('110'); // '110' for Consolidated (연결), '120' for Separate (별도)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Chart states
  const [selectedMetric, setSelectedMetric] = useState('sales'); // 'sales', 'profit', 'assets'
  const [hoveredPoint, setHoveredPoint] = useState(null); // { index, x, y, value, year }

  // Helper: Find company name from preset or show as general
  const getCompanyName = (crno) => {
    const found = PRESET_COMPANIES.find(c => c.crno === crno);
    return found ? found.name : `조회 기업 (법인번호: ${crno})`;
  };

  // Helper: Format large numbers to Korean Trillion/Billion Won units
  const formatKoreanWon = (value) => {
    if (value === undefined || value === null || value === '') return '-';
    const num = Number(value);
    if (isNaN(num)) return value;
    
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    
    const trillion = Math.floor(absNum / 1000000000000);
    const billion = Math.floor((absNum % 1000000000000) / 100000000);
    const million = Math.floor((absNum % 100000000) / 10000);
    
    let result = '';
    if (trillion > 0) result += `${trillion}조 `;
    if (billion > 0) result += `${billion}억 `;
    if (million > 0 && trillion === 0) result += `${million}만`; // only show man-won if it's small, otherwise it gets too cluttered
    
    if (result === '') return '0원';
    
    result = result.trim() + '원';
    return isNegative ? `-${result}` : result;
  };

  // Helper: Format with commas
  const formatNumberWithCommas = (value) => {
    if (value === undefined || value === null || value === '') return '-';
    const num = Number(value);
    if (isNaN(num)) return value;
    return num.toLocaleString('ko-KR') + ' 원';
  };

  const fetchData = async (crno) => {
    setLoading(true);
    setError(null);
    setRawData([]);
    setProcessedData([]);
    
    // We try to request through local vite server proxy first, and fallback to direct API
    const isDev = import.meta.env.DEV;
    const devUrl = `/api-proxy/1160100/service/GetFinaStatInfoService_V2/getSummFinaStat_V2?serviceKey=${SERVICE_KEY}&resultType=json&numOfRows=100&pageNo=1&crno=${crno}`;
    const prodUrl = `https://apis.data.go.kr/1160100/service/GetFinaStatInfoService_V2/getSummFinaStat_V2?serviceKey=${SERVICE_KEY}&resultType=json&numOfRows=100&pageNo=1&crno=${crno}`;
    
    let response;
    try {
      if (isDev) {
        try {
          response = await axios.get(devUrl);
        } catch (proxyError) {
          console.warn('Proxy request failed, falling back to direct API request:', proxyError);
          response = await axios.get(prodUrl);
        }
      } else {
        response = await axios.get(prodUrl);
      }

      const resData = response.data;
      
      // Handle data.go.kr service errors returned in body/header
      const resultCode = resData?.response?.header?.resultCode;
      const resultMsg = resData?.response?.header?.resultMsg;
      
      if (resultCode && resultCode !== '00') {
        throw new Error(`[오픈 API 에러 코드: ${resultCode}] ${resultMsg || 'API 요청 처리 중 오류가 발생했습니다.'}`);
      }
      
      const items = resData?.response?.body?.items?.item || [];
      if (items.length === 0) {
        throw new Error('해당 법인등록번호에 대한 요약재무제표 데이터를 찾을 수 없습니다. 법인등록번호가 정확한지 확인해 주세요.');
      }
      
      setRawData(items);
      setCompanyName(getCompanyName(crno));
    } catch (err) {
      console.error('API Connection Error:', err);
      // Give a friendly Korean error message
      setError(
        err.message || '공공데이터 포탈 오픈 API에 연결하는 데 실패했습니다. 네트워크 상태를 확인하시거나 잠시 후 다시 시도해 주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when selected crno changes
  useEffect(() => {
    fetchData(selectedCrno);
  }, [selectedCrno]);

  // Process rawData whenever rawData or selectedDcd changes
  useEffect(() => {
    if (rawData.length === 0) return;

    // Filter by financial statement division code (Consolidated/Separate)
    const filtered = rawData.filter(item => item.fnclDcd === selectedDcd);
    
    // Group by business year to avoid duplicates, keeping the one with the latest base date (basDt)
    const yearGroups = {};
    filtered.forEach(item => {
      const year = item.bizYear;
      if (!yearGroups[year] || Number(item.basDt) > Number(yearGroups[year].basDt)) {
        yearGroups[year] = item;
      }
    });

    // Convert to array and sort by year ascending
    const sorted = Object.values(yearGroups).sort((a, b) => Number(a.bizYear) - Number(b.bizYear));
    
    // Take the latest 5 years
    const latest5 = sorted.slice(-5);
    
    setProcessedData(latest5);
  }, [rawData, selectedDcd]);

  // Preset click handler
  const handlePresetClick = (crno) => {
    setCustomCrno('');
    setSelectedCrno(crno);
  };

  // Custom search handler
  const handleCustomSearchSubmit = (e) => {
    e.preventDefault();
    const cleanCrno = customCrno.replace(/[^0-9]/g, ''); // strip dashes or spaces
    if (cleanCrno.length !== 13) {
      setError('법인등록번호는 숫자 13자리여야 합니다.');
      return;
    }
    setSelectedCrno(cleanCrno);
  };

  // Extract the latest year's metrics for the stats cards
  const getLatestMetrics = () => {
    if (processedData.length === 0) return { sales: 0, profit: 0, assets: 0, year: '-' };
    const latest = processedData[processedData.length - 1];
    return {
      sales: latest.enpSaleAmt,
      profit: latest.enpBzopPft,
      assets: latest.enpTastAmt,
      year: latest.bizYear
    };
  };

  const latestMetrics = getLatestMetrics();

  // SVG Chart Dimensions & Computations
  const renderChart = () => {
    if (processedData.length < 2) {
      return (
        <div className="text-center" style={{ padding: '60px 0', color: 'var(--text)' }}>
          차트를 표시하기에 충분한 데이터가 없습니다. (최소 2년 이상의 데이터가 필요합니다)
        </div>
      );
    }

    const width = 650;
    const height = 280;
    const paddingLeft = 80;
    const paddingRight = 40;
    const paddingTop = 40;
    const paddingBottom = 40;

    // Map metrics
    const chartPoints = processedData.map((d, index) => {
      let val = 0;
      if (selectedMetric === 'sales') val = Number(d.enpSaleAmt || 0);
      else if (selectedMetric === 'profit') val = Number(d.enpBzopPft || 0);
      else if (selectedMetric === 'assets') val = Number(d.enpTastAmt || 0);

      return {
        year: d.bizYear,
        value: val,
        raw: d
      };
    });

    const values = chartPoints.map(p => p.value);
    const maxVal = Math.max(...values, 0);
    const minVal = Math.min(...values, 0);

    // Dynamic range with 15% padding
    const valRange = maxVal - minVal;
    const pad = valRange === 0 ? 1000 : valRange * 0.15;
    const yMax = maxVal + pad;
    const yMin = minVal - pad;

    // Coordinate mapping functions
    const getX = (index) => {
      const chartWidth = width - paddingLeft - paddingRight;
      return paddingLeft + (index * chartWidth) / (chartPoints.length - 1);
    };

    const getY = (val) => {
      const chartHeight = height - paddingTop - paddingBottom;
      const pct = (val - yMin) / (yMax - yMin);
      return height - paddingBottom - pct * chartHeight;
    };

    // Build the SVG path string (Line and Area)
    let linePathStr = '';
    let areaPathStr = '';

    chartPoints.forEach((p, idx) => {
      const x = getX(idx);
      const y = getY(p.value);
      if (idx === 0) {
        linePathStr += `M ${x} ${y}`;
        areaPathStr += `M ${x} ${y}`;
      } else {
        linePathStr += ` L ${x} ${y}`;
        areaPathStr += ` L ${x} ${y}`;
      }
    });

    // Close the area path at the bottom baseline (or yMin)
    if (chartPoints.length > 0) {
      const firstX = getX(0);
      const lastX = getX(chartPoints.length - 1);
      const baselineY = getY(Math.max(yMin, 0)); // baseline at 0 if possible, or yMin
      areaPathStr += ` L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
    }

    // Grid lines count
    const gridLines = 4;
    const gridElements = [];
    for (let i = 0; i <= gridLines; i++) {
      const ratio = i / gridLines;
      const val = yMin + ratio * (yMax - yMin);
      const y = getY(val);
      gridElements.push({
        y,
        val,
        formatted: formatKoreanWon(val).replace('원', '')
      });
    }

    // Get color for chart theme
    const chartColor = selectedMetric === 'profit' 
      ? (latestMetrics.profit >= 0 ? '#10b981' : '#ef4444')
      : (selectedMetric === 'assets' ? '#aa3bff' : '#3b82f6');

    return (
      <div className="chart-body">
        <svg className="svg-chart" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={chartColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines and Y axis labels */}
          {gridElements.map((g, i) => (
            <g key={i}>
              <line 
                x1={paddingLeft} 
                y1={g.y} 
                x2={width - paddingRight} 
                y2={g.y} 
                className="chart-grid-line" 
              />
              <text 
                x={paddingLeft - 12} 
                y={g.y + 4} 
                textAnchor="end" 
                className="chart-axis-text"
              >
                {g.formatted}
              </text>
            </g>
          ))}

          {/* X Axis line (at y = 0 if visible, otherwise at bottom) */}
          <line 
            x1={paddingLeft} 
            y1={getY(0) >= paddingTop && getY(0) <= height - paddingBottom ? getY(0) : height - paddingBottom} 
            x2={width - paddingRight} 
            y2={getY(0) >= paddingTop && getY(0) <= height - paddingBottom ? getY(0) : height - paddingBottom} 
            className="chart-axis-line" 
          />

          {/* SVG Area Path */}
          <path d={areaPathStr} fill="url(#chartGrad)" className="chart-area-path" />

          {/* SVG Line Path */}
          <path d={linePathStr} stroke={chartColor} className="chart-line-path" />

          {/* Data Points / Interaction Dots */}
          {chartPoints.map((p, idx) => {
            const x = getX(idx);
            const y = getY(p.value);
            const isHovered = hoveredPoint && hoveredPoint.index === idx;

            return (
              <g key={idx}>
                {/* Invisible hover helper for easier touch/hover */}
                <circle 
                  cx={x} 
                  cy={y} 
                  r="14" 
                  fill="transparent" 
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredPoint({ index: idx, x, y, value: p.value, year: p.year })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <circle 
                  cx={x} 
                  cy={y} 
                  r={isHovered ? 7 : 5} 
                  fill={chartColor} 
                  className="chart-dot"
                  onMouseEnter={() => setHoveredPoint({ index: idx, x, y, value: p.value, year: p.year })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* Year Label */}
                <text 
                  x={x} 
                  y={height - 12} 
                  textAnchor="middle" 
                  className="chart-axis-text"
                  style={{ fontWeight: 600 }}
                >
                  {p.year}년
                </text>
              </g>
            );
          })}

          {/* Tooltip Overlay */}
          {hoveredPoint && (
            <g className="chart-tooltip-group">
              <rect 
                x={hoveredPoint.x - 70} 
                y={hoveredPoint.y - 45} 
                width="140" 
                height="32" 
                className="chart-tooltip-bg" 
              />
              <text 
                x={hoveredPoint.x} 
                y={hoveredPoint.y - 25} 
                textAnchor="middle" 
                className="chart-tooltip-text"
              >
                {hoveredPoint.year}년: {formatKoreanWon(hoveredPoint.value)}
              </text>
              <line 
                x1={hoveredPoint.x} 
                y1={hoveredPoint.y - 13} 
                x2={hoveredPoint.x} 
                y2={hoveredPoint.y - 5} 
                stroke="var(--text-h)" 
                strokeWidth="1.5" 
              />
            </g>
          )}
        </svg>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Title Header */}
      <header className="dashboard-header">
        <div className="dashboard-title-wrapper">
          <div className="dashboard-title-icon">📊</div>
          <div>
            <h1 className="dashboard-title">기업 재무 정보 분석 대시보드</h1>
            <p className="dashboard-subtitle">공공데이터포털 기업재무정보 Open API 기반 5개년 요약재무제표 조회 서비스</p>
          </div>
        </div>
      </header>

      {/* Control Panel (Presets and Search input) */}
      <section className="control-card">
        <div className="preset-container">
          <span className="preset-label">추천 기업 바로가기</span>
          <div className="preset-buttons">
            {PRESET_COMPANIES.map(company => (
              <button
                key={company.crno}
                type="button"
                className={`preset-btn ${selectedCrno === company.crno ? 'active' : ''}`}
                onClick={() => handlePresetClick(company.crno)}
              >
                {company.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleCustomSearchSubmit} className="search-form">
          <div className="input-group">
            <label htmlFor="crno-input" className="input-label">법인등록번호 직접 입력</label>
            <div className="search-input-wrapper">
              <input
                id="crno-input"
                type="text"
                placeholder="숫자 13자리 입력 (예: 1301110006246)"
                value={customCrno}
                onChange={(e) => setCustomCrno(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          <button type="submit" className="search-submit-btn">
            🔍 조회하기
          </button>
        </form>
      </section>

      {/* Connection Errors Alert */}
      {error && (
        <section className="error-card">
          <div className="error-header">
            <span>⚠️ API 연결 또는 처리 오류 발생</span>
          </div>
          <p className="error-msg">{error}</p>
          <button type="button" className="retry-btn" onClick={() => fetchData(selectedCrno)}>
            다시 시도
          </button>
        </section>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <span className="loader-text">공공데이터 포탈에서 재무정보를 가져오는 중입니다...</span>
        </div>
      ) : (
        !error && processedData.length > 0 && (
          <div className="dashboard-grid">
            {/* Left Side: Corporate Details */}
            <aside className="company-info-card">
              <h2 className="info-title">🏢 법인 기본 정보</h2>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">기업명</span>
                  <span className="info-value accent">{companyName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">법인등록번호</span>
                  <span className="info-value">{selectedCrno.slice(0, 6)}-{selectedCrno.slice(6)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">기준 통화</span>
                  <span className="info-value">{processedData[0]?.curCd || 'KRW'} (대한민국 원화)</span>
                </div>
                <div className="info-item">
                  <span className="info-label">재무 구분</span>
                  <span className="info-value">
                    {selectedDcd === '110' ? '연결재무제표 (Consolidated)' : '별도재무제표 (Separate)'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">데이터 범위</span>
                  <span className="info-value">
                    {processedData[0]?.bizYear}년 ~ {processedData[processedData.length - 1]?.bizYear}년 (최근 5개년)
                  </span>
                </div>
              </div>
            </aside>

            {/* Right Side: Main Dashboard Panels */}
            <main className="main-panel">
              {/* Financial Type Tabs (연결 vs 별도) */}
              <div className="toggle-tabs-container">
                <button
                  type="button"
                  className={`tab-btn ${selectedDcd === '110' ? 'active' : ''}`}
                  onClick={() => setSelectedDcd('110')}
                >
                  연결재무제표
                </button>
                <button
                  type="button"
                  className={`tab-btn ${selectedDcd === '120' ? 'active' : ''}`}
                  onClick={() => setSelectedDcd('120')}
                >
                  별도재무제표
                </button>
              </div>

              {/* Stats Cards (Latest Year) */}
              <div className="stats-row">
                {/* Sales Card */}
                <div className="stat-card">
                  <div className="stat-header">
                    <span>기업매출금액</span>
                    <span className="stat-icon">💰</span>
                  </div>
                  <div className="stat-value" title={formatNumberWithCommas(latestMetrics.sales)}>
                    {formatKoreanWon(latestMetrics.sales)}
                  </div>
                  <div className="stat-footer">
                    {latestMetrics.year} 사업연도 기준
                  </div>
                </div>

                {/* Operating Profit Card */}
                <div className="stat-card">
                  <div className="stat-header">
                    <span>기업영업이익</span>
                    <span className="stat-icon">📈</span>
                  </div>
                  <div className={`stat-value ${Number(latestMetrics.profit) < 0 ? 'negative-val' : 'positive-val'}`} title={formatNumberWithCommas(latestMetrics.profit)}>
                    {formatKoreanWon(latestMetrics.profit)}
                  </div>
                  <div className="stat-footer">
                    {latestMetrics.year} 사업연도 기준
                  </div>
                </div>

                {/* Total Assets Card */}
                <div className="stat-card">
                  <div className="stat-header">
                    <span>기업 총자산금액</span>
                    <span className="stat-icon">🏛️</span>
                  </div>
                  <div className="stat-value" title={formatNumberWithCommas(latestMetrics.assets)}>
                    {formatKoreanWon(latestMetrics.assets)}
                  </div>
                  <div className="stat-footer">
                    {latestMetrics.year} 사업연도 기준
                  </div>
                </div>
              </div>

              {/* SVG Analytics Chart */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3 className="chart-title">📈 5개년 재무 성과 지표 추이</h3>
                  <div className="chart-metric-selector">
                    <button
                      type="button"
                      className={`chart-selector-btn ${selectedMetric === 'sales' ? 'active' : ''}`}
                      onClick={() => setSelectedMetric('sales')}
                    >
                      매출액
                    </button>
                    <button
                      type="button"
                      className={`chart-selector-btn ${selectedMetric === 'profit' ? 'active' : ''}`}
                      onClick={() => setSelectedMetric('profit')}
                    >
                      영업이익
                    </button>
                    <button
                      type="button"
                      className={`chart-selector-btn ${selectedMetric === 'assets' ? 'active' : ''}`}
                      onClick={() => setSelectedMetric('assets')}
                    >
                      총자산
                    </button>
                  </div>
                </div>
                {renderChart()}
              </div>

              {/* Data Table */}
              <div className="table-card">
                <h3 className="chart-title">📋 5개년 상세 재무제표 현황</h3>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th className="text-center">사업연도</th>
                        <th>법인등록번호</th>
                        <th className="text-right">기업매출금액</th>
                        <th className="text-right">기업영업이익</th>
                        <th className="text-right">기업 총자산금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processedData.map((data, index) => {
                        const isLatest = index === processedData.length - 1;
                        const opProfit = Number(data.enpBzopPft || 0);
                        return (
                          <tr key={data.bizYear} className={isLatest ? 'highlight' : ''}>
                            <td className="text-center">
                              <span className="table-badge">{data.bizYear}년</span>
                            </td>
                            <td>{data.crno}</td>
                            <td className="text-right" title={formatNumberWithCommas(data.enpSaleAmt)}>
                              {formatKoreanWon(data.enpSaleAmt)}
                            </td>
                            <td className={`text-right ${opProfit < 0 ? 'negative-val' : 'positive-val'}`} title={formatNumberWithCommas(data.enpBzopPft)}>
                              {formatKoreanWon(data.enpBzopPft)}
                            </td>
                            <td className="text-right" title={formatNumberWithCommas(data.enpTastAmt)}>
                              {formatKoreanWon(data.enpTastAmt)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
        )
      )}
    </div>
  );
}
