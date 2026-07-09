import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios"

import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import CompanyDetail from "../component/CompanyDetail";

const formatMoney = (value) => {
    if(value >= 1_0000_0000_0000) {
    return `${(value / 1_0000_0000_0000).toFixed(1)}조`;
    }

  if (value >= 1_0000_0000) {
    return `${(value / 1_0000_0000).toFixed(1)}억`;
  }

  return value.toLocaleString();
}

export default function Company () {
    const params = useParams()
    let companyId = params.companyId
    let companyName = params.companyName
    console.log(`companyId: ${companyId}`)

    const [financeData, setFinanceData] = useState([]);

    useEffect(() => {
    const getFinanceData = async () => {
        console.log(`in useEffect, ${companyId}`)
      const years = [2019, 2020, 2021, 2022, 2023];
      const serviceKey = 'amkVoiGffeamYHpKvHLnPo6aNRUoVFS7nqkVjpw9LD%2Byf8CPGLYtmZH9U4fwvXTlj9L4lpDF7K9apDE26gF%2F%2BA%3D%3D'
      const url = '/api-proxy/1160100/service/GetFinaStatInfoService_V2/getSummFinaStat_V2'
      const resultType = 'json'
        const numOfRows = 1;
        const crno = companyId;
        const pageNo = 1;
        const lastUrl = `?serviceKey=${serviceKey}&resultType=${resultType}&numOfRows=${numOfRows}&pageNo=${pageNo}&crno=${crno}`

      try {
        // const responses = await Promise.all(
          
        //   years.map((year) =>
        //     axios.get(`${url}${lastUrl}&bizYear=${year}`)
        //     //.then((response) => console.log(response.data.response.body.items.item[0]))
        //     .then( (response) => setFinanceData(response.data.response.body.items.item[0]) )
        //     .finally(console.log(financeData))
        //     )
        //   )
        // ;

        const responses = []
        for (let i = 0; i < years.length; i++) {
            const response = await axios.get(`${url}${lastUrl}&bizYear=${years[i]}`)
            responses.push(response.data.response.body.items.item[0])
        }

        setFinanceData(responses)
        console.log(responses)
        

      } catch (err) {
        console.log(err);
      }
    };
    getFinanceData()
    }, [companyId]);
    
    return (
        <>  
            <CompanyDetail companyInfo={financeData} />

            <h1>{companyName} 기업매출금액</h1>
            <ResponsiveContainer width="100%" height={500}>
                            <LineChart data={financeData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="bizYear" />
                                <YAxis tickFormatter={formatMoney}/>
                                <Tooltip 
                                    formatter={(value) => `${Number(value).toLocaleString("ko-KR")}원`}/>
                                <Line type="monotone" dataKey="enpSaleAmt" stroke="#df07bb" strokeWidth={5} />
                            </LineChart>
                        </ResponsiveContainer>
        </>
    )
}