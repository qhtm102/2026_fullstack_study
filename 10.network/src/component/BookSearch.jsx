import React, { useState } from "react";
import axios from "axios";
import BookSearchList from "./BookSearchList";
import "./BookSearch.css";

export default function BookSearch() {
  const [query, setQuery] = useState("리액트");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchBook = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    const url = '/naver/v1/search/book.json';
    const display = 100;
    const clientId = '';
    const clientSecret = '';
    
    try {
      const response = await axios.get(
        `${url}?query=${encodeURIComponent(query)}&display=${display}`,
        {
          headers: {
            'X-Naver-Client-Id': clientId,
            'X-Naver-Client-Secret': clientSecret
          }
        }
      );
      if (response.data && response.data.items) {
        setBooks(response.data.items);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error("도서 검색 에러:", err);
      setError("도서 정보를 가져오는 중 오류가 발생했습니다. (API 프록시 설정을 확인해주세요)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-search-container">
      <h2 className="book-search-title">Naver 도서 검색</h2>
      <form onSubmit={searchBook} 
            className="book-search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요 (예: 리액트)"
          className="book-search-input"
        />
        <button type="submit" className="book-search-btn" disabled={loading}>
          {loading ? "검색 중..." : "도서 검색"}
        </button>
      </form>
      
      <hr style={{ margin: '30px 0', borderColor: 'var(--border)', borderStyle: 'solid', borderWidth: '0 0 1px 0' }} />
      
      {error && <div style={{ color: 'red', textAlign: 'center', margin: '20px 0' }}>{error}</div>}
      
      {/* If books is empty, BookSearchList will show default mock data */}
      <BookSearchList books={books} />
    </div>
  );

}