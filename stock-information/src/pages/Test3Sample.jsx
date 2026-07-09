import axios from "axios";
import { useEffect, useState } from "react";

export default function Test3Sample() {
  const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    const getFinanceData = async () => {
      const years = [2019, 2020, 2021, 2022, 2023];
      const serviceKey = 'amkVoiGffeamYHpKvHLnPo6aNRUoVFS7nqkVjpw9LD%2Byf8CPGLYtmZH9U4fwvXTlj9L4lpDF7K9apDE26gF%2F%2BA%3D%3D'
      const url = '/api-proxy/1160100/service/GetFinaStatInfoService_V2/getSummFinaStat_V2'
      const resultType = 'json'
        const numOfRows = 1;
        const crno = '1746110000741';
        const pageNo = 1;
        const lastUrl = `?serviceKey=${serviceKey}&resultType=${resultType}&numOfRows=${numOfRows}&pageNo=${pageNo}&crno=${crno}`

      try {
        const responses = await Promise.all(
          
          years.map((year) =>
            axios.get(`${url}${lastUrl}&bizYear=${year}`)
            .then((response) => console.log(response.data.response.body.items.item[0]))
            )
          )
        ;

        const result = responses.map((res) => res.data);

        setFinanceData(result);

      } catch (err) {
        console.log(err);
      }
    };

    getFinanceData();
  }, []);

  return (
    <div>
      {financeData.map((data) => {
        return (
          <>
            <h2>{data.basDt}</h2>
            <h2>{data.bizYear}</h2>
            <h2>{data.enpSaleAmt}</h2>
          </>
        )
      })}

    </div>
  );
}