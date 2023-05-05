import axios from "axios"
import { useEffect } from "react"
import { Link } from "react-router-dom";

function Productos() {
    //muestro los productos
    useEffect(() => {
        axios.get("http://localhost:3000/api/productos"
            // , {headers:{
            //         Authorization: "Bearer" + localStorage.getItem("token")
            //     }
            // }
        )
            .then(response => console.log(response))
            .catch((err) => console.log(err))
    }, [])
    return (
        //aqui vamos a colocar los productos
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Productos</h1>
                <Link to="/productos/create" className="btn btn-primary btn-small">Crear</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nombre 1</td>
                        <td>2000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Productos