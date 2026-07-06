import { useState } from "react";

function Counter() {


    // 1.  지역 변수의 변경은 랜더링을 발생시키지 않음 (화면을 갱신하지 않음)
    // let count = 0;
    // return (
    //     <>
    //         <div>
    //             <p>현재 값: {count}</p>
    //             <button onClick={() => count++}>증가</button>
    //             <button onClick={() => count--}>감소</button>
    //         </div>
    //     </>
    // );

    // 2. 
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>현재 값: {count}</p>
            <button onClick={() => setCount(count + 1)}>증가</button>
            <button onClick={() => setCount(count - 1)}>감소</button>
        </div>
  );
}

export default Counter;