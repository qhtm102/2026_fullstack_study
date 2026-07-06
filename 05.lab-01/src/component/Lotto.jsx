import { useState } from "react";

function Lotto() {

const [numbers, changeNumbers] = useState([])    

    function selectNumbers() {
        const numbers2 = [];
        for (let i = 0; i < 6; i++) {
            const number = Math.floor(Math.random() * 45 + 1)
            numbers2.push(number);
        }

        numbers2.sort((n1, n2) => n1 - n2)
        return numbers2;
    }

    return(
    <>
        <table style={{width: "500px", margin:"0, auto" ,height: "500px", border:"1px solid black", textAlign:"center"}}>
            <tr style={{border:"1px solid black"}}>
                <td colSpan={6}>
                    <button style={{textAlign:"center", width:"100%"}} 
                    onClick={() => {
                        const numberList = selectNumbers();
                        
                        
                        changeNumbers(numberList);
                        
                    }}
                >SELECT</button>
                </td>
                
            </tr>
            <tr>
                {numbers.map( (number, idx) => {
                   return <td key={idx} style={{textAlign: "center", height:"60px", width:"100px", border:"solid 1px black"}}>{number}</td>
                })}
            </tr>
        </table>

        
    </>
    )
}

export default Lotto;