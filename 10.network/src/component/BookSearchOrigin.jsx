import axios from "axios"
import { useState } from "react";

export default function BookSearch() {

    const [books, setBooks] = useState([]);

    const searchBook = async () => {
        // const url = 'https://openapi.naver.com/v1/search/book.json';
        const url = '/naver/v1/search/book.json';
        const query = '리액트';
        const display = 100;
        const clientId = '';
        const clientSecret = '';
        
        // 비동기 방식 호출
        // axios.get(`${url}?query=${query}&display=${display}`,
        //             { headers: {'X-Naver-Client-Id':clientId, 'X-Naver-Client-Secret': clientSecret} })
        //     .then( (res) => console.log(res.data) )   

        // 동기 방식 호출 : await 비동기 함수 호출 ( await는 async 함수 내부에서만 사용할 수 있습니다. )
        const response = await axios.get(`${url}?query=${query}&display=${display}`,
                    { headers: {'X-Naver-Client-Id':clientId, 'X-Naver-Client-Secret': clientSecret} })
        console.log(response.data);
        console.log("언제 실행될까요")    

        setBooks(response.data.items)
    }

    return (
        <>
            <button onClick={ searchBook }> 도서 검색 </button>
            <hr />
            <div>

            </div>
        </>
   ) 
}