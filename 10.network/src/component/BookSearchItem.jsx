import React from "react";
import "./BookSearch.css";

export default function BookSearchItem({ book }) {
  if (!book) return null;

  const {
    title = "",
    image = "",
    author = "",
    discount = "",
    publisher = "",
    pubdate = "",
    description = "",
    link = "",
    isbn = "",
  } = book;

  // Formatting date from YYYYMMDD to YYYY.MM.DD
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;
  };

  // Formatting price/discount to include comma separating thousands and "원" suffix
  const formatPrice = (priceStr) => {
    if (!priceStr) return "판매가 정보 없음";
    const price = parseInt(priceStr, 10);
    if (isNaN(price)) return priceStr;
    return `${price.toLocaleString()}원`;
  };

  return (
    <div className="book-item-card">
      <div className="book-image-wrapper">
        {image ? (
          <img
            src={image}
            alt={title.replace(/<[^>]*>/g, "")}
            className="book-image"
            loading="lazy"
          />
        ) : (
          <div className="book-image-placeholder">이미지 없음</div>
        )}
      </div>

      <div className="book-info-wrapper">
        <div className="book-title-row">
          <h4 className="book-title">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </h4>
          <div className="book-meta">
            <span className="book-author">{author || "저자 미상"}</span>
            <span className="separator">|</span>
            <span className="book-publisher">{publisher || "출판사 정보 없음"}</span>
            <span className="separator">|</span>
            <span className="book-pubdate">{formatDate(pubdate)}</span>
            {isbn && (
              <>
                <span className="separator">|</span>
                <span className="book-isbn-badge">ISBN: {isbn}</span>
              </>
            )}
          </div>
        </div>

        <p
          className="book-description"
          dangerouslySetInnerHTML={{ __html: description || "상세 설명이 없습니다." }}
        />

        <div className="book-footer-row">
          <div className="book-price-box">
            <span className="book-price-label">판매가</span>
            <span className="book-price">{formatPrice(discount)}</span>
          </div>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="book-action-btn"
            >
              네이버 도서 정보 보기
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
