import { useState } from "react";

function LottoEx1() {

    const [numbers, setNumberList] = useState([0,0,0,0,0,0])
    return(
        <>
           <table>
            <tr>
                <td colSpan={6}>
                <button onClick={() => {
                        const numbers2 = [];
                        for (let i = 0; i < 6; i++) {
                            const number = Math.floor(Math.random() * 45 + 1)
                            numbers2.push(number);
                        }

                        numbers2.sort((n1, n2) => n1 - n2);
                        setNumberList(numbers2);
                }}>
                    SELECT
                </button>
                </td>
            </tr>

            <tr>
                {numbers.map((number, idx)=> {
                    return <td key={idx}> {number} </td>
                })}
            </tr>
            </table>  
        </>
    )
}
export default LottoEx1