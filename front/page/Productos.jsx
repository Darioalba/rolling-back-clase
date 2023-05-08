import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

function Productos() {
    //guardamos lo que nos llega en un estado
    const [productos, setProductos] = useState([
    ]);

    //creamos el buscador
    const [search, setSearch] = useState("")

    //funcion para resetear despues de borrar
    const getProductos = () => {
        axios
            .get("http://localhost:3000/api/productos")
            .then((res) => setProductos(res.data))
            .catch((err) => console.log(err))
    }

    //muestro los productos
    useEffect(() => {
        getProductos()
    }, [])

    //destruyo el registro
    const destroy = (id) => {
        if (confirm("¿Esta seguro ?")) {
            axios
                .delete(`http://localhost:3000/api/productos/${id}`)
                .then((res) => {
                    console.log(res)
                    getProductos() //llamo la funcion de productos
                }
                )
                .catch((err) =>
                    console.log(err)
                )
        }
    };

    //Busqueda
    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const buscar = () => {
        if (search == "") {
            getProductos()
        } else {
            axios
                .get(`http://localhost:3000/api/productos/${search}`)
                .then((res) => setProductos(res.data))
                .catch((err) => console.log(err))
        }
    }

    return (
        //aqui vamos a colocar los productos
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Productos</h1>
                <Link to="/productos/create" className="btn btn-primary btn-small">Crear</Link>
            </div>

            {/* Vamos a colocar el buscador */}
            <div className="input-grup mb-3">
                <input
                    type="search"
                    className="form-control"
                    name="search"
                    value={search}
                    onChange={handleChangeSearch}
                />
                <button
                    className="btn btn-outline-secondary"
                    onClick={buscar}
                    type="button"
                >
                    Buscar
                </button>

            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {/* //ruta de productos */}
                    {productos &&
                        productos.map((producto) => (
                            <tr key={producto._id}>
                                <td>{producto._id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>
                                <td>
                                    <img
                                        //ruta para buscar imagen
                                        src={`http://localhost:3000/img/productos/${producto.imagen}`}
                                        width={100}
                                        alt={producto.nombre}
                                    />
                                </td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <Link to={`/productos/edit/${producto._id}`} type="button" class="btn btn-danger">Editar</Link>
                                        <button onClick={() => destroy(producto._id)} type="button" class="btn btn-success">Borrar</button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
export default Productos