import { Link } from "react-router-dom"

export default function ProductList() {

    return(
        <div>
            <Link to="/">홈</Link>
            <hr />

            <h1>제품 목록</h1>
            <Link to="/products/1">상품1 상세 보기</Link> <br />
            <Link to="/products/2">상품2 상세 보기</Link> <br />
            <Link to="/products/3">상품3 상세 보기</Link> <br />
        </div>
    )
}