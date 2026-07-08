import { Link, useNavigate } from "react-router-dom"

export default function Home() {

    const navigate = useNavigate(); // navigate : js의 location.href 기능
    return(
        <div>
            <h1>홈</h1>
            <Link to="/products">상품 목록 보기 (링크로 이동)</Link> {/* Link : html <a> 태그 */}
            
            <br />
            <br />

            <button onClick={ () => navigate('/products') }>상품 목록 보기 (코드로 이동) </button>
            
            <br />
            <br />
            <Link to="/querystring?email=sss@example.com&phone=000-0000-0000">쿼리스트링 테스트</Link>

        </div>
    )
}