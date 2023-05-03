import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../page/Home"
import Login from "../page/login"
import Register from "../page/Register"
import Productos from "../page/Productos"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/productos" element={<Productos/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
