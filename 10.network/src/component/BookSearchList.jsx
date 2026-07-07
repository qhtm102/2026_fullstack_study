import React from "react";
import BookSearchItem from "./BookSearchItem";
import "./BookSearch.css";

// Default mock data based on prompt requirements and related content for pre-rendering
const defaultBooks = [
  {
    author: "네빌고다드",
    description: "내 마음속 반응만이 바뀌었을 뿐인데 정말 외부세상도 그것에 따라 바뀔까?\n이 의문에 대한 답을 알기 위해서는 직접 해보는 수밖에 없다.\n\n나를 옭아매는 특정한 상황을 생각해본다. \n나의 마음이 일정한 상황에 대해 똑같은 반응을 하고 있다는 것을 알 수 있다.\n이제 그 반응을 바꿔본다.\n\n예를 들어 한 상사가 나를 계속 괴롭혔을 때,\n상사가 생각날 때면 나의 마음은 일정하게 화를 내거나 복수하는 장면을 떠올리는 반응을 한다. \n\n이제 이것과는 다른 반응이 마음에서 \"저절로\" 일어날 때까지 \n내 마음속 상사의 이미지를 바꿔보자.\n나의 반응만이 바뀌고 세상은 그대로일까?\n아니면 마음을 따라 세상이 변할까?\n\n이 책은 네빌고다드가 반응에 중점을 두고 강의한 것을 묶은 것이다.\n반응은 우리의 삶을 옭아매기도 하고, 반대로 우리의 삶에 자유를 줄 수도 있다.\n이 책을 통해 우리는 반응을 관찰해서, 바꾸는 법을 배울 수 있다.",
    discount: "11250",
    image: "https://shopping-phinf.pstatic.net/main_3247373/32473737977.20260122071925.jpg",
    isbn: "9788997228232",
    link: "https://search.shopping.naver.com/book/catalog/32473737977",
    pubdate: "20200430",
    publisher: "서른세개의계단",
    title: "리액트 (반응을 바꾸면 세상이 달라진다)"
  },
  {
    author: "이웅모",
    description: "자바스크립트를 소개하는 가장 완벽한 가이드. 기본 개념부터 최신 스펙인 ES6+까지 작동 원리를 깊이 있게 파헤친다. 기본 개념과 동작 원리를 정확히 이해함으로써 자바스크립트 개발자로서의 기틀을 견고히 다질 수 있다.",
    discount: "38000",
    image: "https://shopping-phinf.pstatic.net/main_3243621/32436213622.20241029074033.jpg",
    isbn: "9791158392239",
    link: "https://search.shopping.naver.com/book/catalog/32436213622",
    pubdate: "20200925",
    publisher: "위키북스",
    title: "모던 자바스크립트 <b>Deep Dive</b>"
  },
  {
    author: "소플 (이인제)",
    description: "처음 배우는 입장에서 설명하여 리액트 입문자나 초급 개발자가 쉽게 따라 할 수 있도록 설계되었습니다. 최신 리액트 버전을 다루며 훅(Hooks), 컴포넌트, 가상 돔(Virtual DOM) 등의 핵심 개념을 실습 위주로 쉽고 빠르게 습득할 수 있습니다.",
    discount: "25200",
    image: "https://shopping-phinf.pstatic.net/main_3243615/32436157622.20241113070851.jpg",
    isbn: "9791168473683",
    link: "https://search.shopping.naver.com/book/catalog/32436157622",
    pubdate: "20221115",
    publisher: "한빛미디어",
    title: "처음 만난 <b>리액트</b>(React)"
  }
];

export default function BookSearchList({ books }) {
  // If books prop is not passed or empty, default to mock books for initial UI preview
  const displayBooks = books && books.length > 0 ? books : defaultBooks;

  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h3>검색 결과</h3>
        <span className="book-count-badge">총 {displayBooks.length}건</span>
      </div>

      <div className="book-grid">
        {displayBooks.map((book, index) => (
          <BookSearchItem key={book.isbn || index} book={book} />
        ))}
      </div>
    </div>
  );
}
