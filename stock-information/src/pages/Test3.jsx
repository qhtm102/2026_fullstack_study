import { useNavigate } from "react-router-dom";

export default function Test3() {
    const navigate = useNavigate();
    return (
        <>
            <h1>회사 재무정보 확인</h1>

            <button onClick={()=>navigate("/company/1301110006246/삼성전자")}>
                삼성전자
            </button>

            <button onClick={()=>navigate("/company/1101112810590/금호타이어")}>
                금호 타이어
            </button>

            <button onClick={()=>navigate("/company/1101111707178/네이버")}>
                네이버
            </button>
        </>
    )
}