import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

function Productos() {
    //guardamos lo que nos llega en un estado
    const [productos, setProductos] = useState([]);

    //muestro los productos
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/productos")
            .then((res) => setProductos(res.data))
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
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {productos &&
                        productos.map((producto) => (
                            <tr key={producto._id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>
                                <td>
                                    <img
                                        src={`http://localhost:3000/img/productos/${producto.imagen}`}
                                        width={100}
                                        alt={producto.nombre}
                                    />
                                </td>
                            
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
export default Productos