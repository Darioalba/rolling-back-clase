import axios from "axios"
import { useEffect } from "react"

function Productos(){
    //muestro los productos
    useEffect(()=>{
        axios.get("http://localhost:3000/api/productos", {
            headers:{
                Authorization: "Bearer" + localStorage.getItem("token")
            }
        })
        .then(response => console.log(response))
        .catch((err)=> console.log(err))
    }, [])
    return(
        <>
        <h1>Soy el home de la Productos</h1>
        </>
    )
}
export default Productos