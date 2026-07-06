
import DecreaseBtn from "./component/DecreaseBtn"
import IncreaseBtn from "./component/IncreaseBtn"
import Display from "./component/Display"
import { CommonContext } from "./component/CommonContext"
import CommonContextProvider from "./component/CommonContext"

function App() {

  return (
    <CommonContextProvider> 
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

    </CommonContextProvider>
  
  )
}

export default App
