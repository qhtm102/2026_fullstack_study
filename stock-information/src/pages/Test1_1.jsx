// import { useState } from "react"
// import { useEffect } from "react"
// import axios from "axios"
// //import ETFInfo from "../components/ETFInfo";
// //import PriceInfo from "../components/PriceInfo";
// //import FundInfo from "../components/FundInfo";

// export default function Test1() {

//    const [data, setData] = useState([]);
//    const [result, setResult] = useState([]);
//    const [keyword, setKeyword] = useState("");

//     //  const trimmed = data.trim
//     //         if (!trimmed) return


//     useEffect( () => {
//         const url = "https://apis.data.go.kr/1160100/service/GetSecuritiesProductInfoService/getETFPriceInfo";
//         const serviceKey = 'd28c05d54b1f56f5bc2457cb070fb13ae20a7c14fa1b99bd58d7c3ee11539922'
//         const numOfRows = 1000
//         let pageNo = 1
//         const resultType = 'json'
//         let today = new Date()
//         today.setDate(today.getDate() - 1)
//         let month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`
//         let date = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`
//         today = `${today.getFullYear()}${month}${date}`
//         console.log(today)
//         const loadData = async () => {
//             let results = []
//             while (true) {
//                 const response = await axios.get(`${url}?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&resultType=${resultType}&basDt=${today}`)
//                 const result = response.data.response.body.items.item
//                 results = [...results, ...result]
//                 pageNo += 1
//                 console.log(results.length)
//                 if (results.length >= response.data.response.body.totalCount) {
//                     break
//                 }  
//             }
//             // console.log(results)
//             setResult(results);
//         }
        
//         loadData()
       
//     }, [])       
    
//     // const handleSearch = () => {

//         // const url = "https://apis.data.go.kr/1160100/service/GetSecuritiesProductInfoService/getETFPriceInfo";
//         // const serviceKey = 'd28c05d54b1f56f5bc2457cb070fb13ae20a7c14fa1b99bd58d7c3ee11539922'
//         // const numOfRows = 1000
//         // let pageNo = 1
//         // const resultType = 'json'
//         // const today = '20260709'

//         // const loadData = async () => {
//         //     let results = []
//         //     while (true) {
//         //         const response = await axios.get(`${url}?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&resultType=${resultType}&basDt=${today}`)
//         //         const result = response.data.response.body.items.item
//         //         results = [...results, ...result]
//         //         pageNo += 1
//         //         console.log(results.length)
//         //         if (results.length >= response.data.response.body.totalCount) {
//         //             break
//         //         }  
//         //     }
//         //     // console.log(results)
//         //     setResult(results);
//         // }
        
//         // loadData()
        
    

       

//     return (

//         <>

//             <div className="etf-container">

//                 <h1>ETF 조회</h1>

//                 {/* 검색 영역 */}
//                 <div className="search-area">

//                     {/* <input
//                         type="text"
//                         placeholder="종목명 입력"
//                         value={keyword}
//                         onChange={(e) => setKeyword(e.target.value)}
//                     /> */}

//                     {/* <input
//                         type="date"
//                     /> */}

//                     {/* <button onClick={handleSearch}> */}
//                     {/* <button> */}
//                         {/* 조회 */}
//                     {/* </button> */}

//                 </div>

//                 {/* 결과 영역 */}
//                 <div className="result-area">

//                     <h3>ETF 정보</h3>

//                     <table border="1" width="100%">
//                         <thead>
//                             <tr>
//                                 <th>종목코드</th>
//                                 <th>종목명</th>
//                                 <th>고가</th>
//                                 <th>저가</th>
//                                 <th>현재가</th>
//                                 <th>거래량</th>
//                                 <th>상장주식수</th>
//                                 <th>기초지수</th>
//                                 <th>유형</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {
//                                 result.map((item, index) => {
//                                     return(
//                                     <tr key={index}>
//                                         <td>{item.isinCd}</td>
//                                         <td>{item.itmsNm}</td>
//                                         <td>{item.hipr}</td>
//                                         <td>{item.lopr}</td>
//                                         <td>{item.clpr}</td>
//                                         <td>{item.trqu}</td>
//                                         <td>{item.stLstgCnt}</td>
//                                         <td>{item.bssIdxClpr}</td>
//                                         <td>{item.bssIdxIdxNm}</td>
//                                     </tr>
//                                     )
//                                  }
//                                 )
//                             }
//                         </tbody>
//                     </table>

//                 </div>

//             </div>
//         </>
//     )
// }