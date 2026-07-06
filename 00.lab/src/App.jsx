import Ex1 from "./component/Ex1"
import Ex2List from "./component/Ex2List"

function App() {

  const pList = [
    {
      name : "김치",
      price : "38,000",
      href : "",
      inStock : true
    },
    {
      name : "감자",
      price : "4,000",
      href : "",
      inStock : false
    },
    {
      name : "닭고기",
      price : "15,000",
      href : "",
      inStock : true
    },
    {
      name : "에어건",
      price : "111,000",
      href : "",
      inStock : false
    },

  ]
  
  return (
   <>
    <Ex1 name={"김도끼"} age={42} job={"나무꾼"} isAdmin={false} />

    <Ex2List pList = {pList}/>
   </>
  )
}

export default App
