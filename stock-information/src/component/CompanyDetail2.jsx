import { NavLink } from "react-router-dom";


export default function CompanyDetail({companyInfo}) {

    const formatMoney = (value) => {
        if (value >= 1_0000_0000_0000) {
            return `${(value / 1_0000_0000_0000).toFixed(1)}조`;
        }

        if (value >= 1_0000_0000) {
            return `${(value / 1_0000_0000).toFixed(1)}억`;
        }

        return value.toLocaleString();
    }

    console.log({companyInfo})
    let saleAmtSum = 0;
    for(let i=0; i< companyInfo.length; i++) {
        
        saleAmtSum =+ companyInfo[i].enpSaleAmt
    }


    let tastAmtSum = 0;
    for(let i=0; i< companyInfo.length; i++) {
        
        tastAmtSum =+ companyInfo[i].enpTastAmt
    }
    
    return(
        <>
            <div>
                <br />
                <NavLink to="/test3" > 기업 재무 목록으로 </NavLink>
            </div>
            <div>
                <h2>5년간 평균 기업매출 금액 : {formatMoney(saleAmtSum / 5)}</h2>
                <h2>5년간 평균 기업총자산 금액 : {formatMoney(tastAmtSum / 5)}</h2>
            </div>
            
            
        </>
    )
}