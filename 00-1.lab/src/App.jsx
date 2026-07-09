import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import RootLayout from "./pages/RootLayout"
import TestPage from "./pages/TestPage"


function App() {
 

  return (
    <Routes>
      <Route element={<RootLayout />} >
        <Route path="/" element={<Home />} />
        <Route path="/testpage" element={<TestPage />} />
      </Route>
    </Routes>
  )
}

export default App
