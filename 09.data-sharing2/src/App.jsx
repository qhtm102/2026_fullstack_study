
import DecreaseBtn from "./component/DecreaseBtn"
import IncreaseBtn from "./component/IncreaseBtn"
import Display from "./component/Display"
import { CommonContext } from "./component/CommonContext"
import { useState } from "react"


function App() {

  const [appData, setAppData] = useState( {
     count : 0, 
     name : "Sam", 
     work: "setDo"
    }
  )

  // json에서 이름과 값에 할당된 식별자(변수 이름이나 함수이름)가 같을 때 축약 가능
  // context, state를 사용해서 객체로 전달하는 방법 || {appData : appData, setAppData : setAppData} -> { appData, setAppData }
  return (
    <CommonContext.Provider value={ {appData : appData, setAppData : setAppData} } > {/* CommonContext 공유 저장소에 데이터 저잘 + 사용 범위 결정 */}
      <table>
        <tr>
          <th colSpan={2}>
            <Display />
          </th>
        </tr>
        <tr>
          <td><DecreaseBtn /></td>
          <td><IncreaseBtn /></td>
        </tr>

     
      </table>

    </CommonContext.Provider>
  
  )
}

export default App
