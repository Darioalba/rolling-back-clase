import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../page/Home"
import Login from "../page/login"
import Register from "../page/Register"
import Productos from "../page/Productos"
import ProductosCreate from "../page/ProductosCreate"
import ProductoEdit from "../page/ProductosEdit"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/productos" element={<Productos/>}/>
      <Route path="/productos/create" element={<ProductosCreate/>}/>
      <Route path="/productos/edit/:id" element={<ProductoEdit/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
