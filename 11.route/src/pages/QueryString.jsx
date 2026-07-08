import { Link, useSearchParams } from "react-router-dom"

export default function QueryString() {
    const [ searchParams ] = useSearchParams();   // query-string data 읽기 도구 가져오기 (url?data1=v2&data2=15...)

    return(
        <div>
            <Link to="/">홈</Link>
            <br />

            <hr />
            <h1>{searchParams.get('email')}</h1>
            <h1>{searchParams.get('phone')}</h1>
            
        </div>
    )
}