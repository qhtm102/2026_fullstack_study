import { useEffect, useRef, useState } from "react"

export default function EffectDemo() {

    const [randNumber1, setRanNumber1] = useState(0);
    const [randNumber2, setRanNumber2] = useState(0);

    // useRef = useState 처럼 변수를 만드는데 변경 함수가 별도로 존재하지 않고, 값의 변경이 렌더링을 촉발하지 않습니다.
    const isMounted = useRef(false)     // useRef는 { current : false; ... } 값 반환
    
    useEffect( () => {
        if(isMounted.current == true) {
            console.log(`무작위 난수 1의 값이 변경되었습니다. ${ new Date() }`);
        } else {
            isMounted.current = true;
        }
        
    }, [randNumber1]);

    useEffect( () => {
        console.log(`무작위 난수 2의 값이 변경되었습니다. ${ new Date() }`);

        // return 되는 함수는 
        // 1. randNumver2 의 값의 변경으로 인해 useEffect에 지정된 함수가 호출되기 전,
        // 2.  컴포넌트가 언마운트 될 때 호출
        return () => console.log("무작위 난수 2와 관련된 클린업 함수가 호출되었습니다.");
    }, [randNumber2]);
    
    useEffect( () => {
        console.log(`무작위 난수 1 또는 2의 값이 변경되었습니다. ${ new Date() }`);
    });

    useEffect( () => {
        console.log(`컴포넌트가 마운트 될 때, 한 번만 호출됩니다. ${ new Date() }`);
    },[]);



    return (
        <>
            <h2>이펙트 연습</h2>
            <button onClick={() => {
                const n = Math.floor(Math.random() * 900 + 100 )
                setRanNumber1(n);
            }}>
            새로 번호 만들기 1
            </button>

            <button onClick={() => {
                const n = Math.floor(Math.random() * 900 + 100 )
                setRanNumber2(n);
            }}>
            새로 번호 만들기 2
            </button>

            
            <h2> {randNumber1} </h2>  
            <h2> {randNumber2} </h2>  
        </>
    )
}