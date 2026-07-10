import { useNavigate } from "react-router-dom";

export default function Test3() {
    const navigate = useNavigate();
    return (
        <>
            <h1>회사 재무정보 확인</h1>
            {/* 직접 입력 받은 회사 이름을 넘기게 수정 예정 : api 추가 */}

            <button onClick={()=>navigate("/company/1301110006246/삼성전자")}>
                삼성전자
            </button> &nbsp;&nbsp;

            <button onClick={()=>navigate("/company/1301110001626/삼성전기")}>
                삼성전기
            </button> &nbsp;&nbsp;
            
            <button onClick={()=>navigate("/company/1344110001387/SK하이닉스")}>
                SK하이닉스
            </button> 
            <br />
            <br />


            <button onClick={()=>navigate("/company/1101112810590/금호타이어")}>
                금호 타이어
            </button> &nbsp;&nbsp;
            
            <button onClick={()=>navigate("/company/1101111129497/카카오")}>
                카카오
            </button> &nbsp;&nbsp;

            <button onClick={()=>navigate("/company/1101111707178/네이버")}>
                네이버
            </button> &nbsp;&nbsp;

            
        </>
    )
}