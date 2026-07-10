export default function SearchPanel({
  keyword,
  isLoading,
  isDarkMode,
  onKeywordChange,
  onSubmit,
  onThemeToggle,
}) {
  return (
    <section className="stock-page__hero">
      <div>
        
        <h1>주식 시세 정보</h1>
      </div>

      <form className="stock-page__search" onSubmit={onSubmit}>
        <input
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          placeholder="종목명 또는 종목코드"
          aria-label="종목명 또는 종목코드"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? '조회 중' : '조회'}
        </button>
      </form>

      <button className="stock-page__theme-button" type="button" onClick={onThemeToggle}>
        {isDarkMode ? '라이트 모드' : '다크 모드'}
      </button>
    </section>
  )
}
