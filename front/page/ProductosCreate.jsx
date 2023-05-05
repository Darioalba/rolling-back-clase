import { useState } from "react";

function ProductosCreate() {
    //condicion inidial
    const [values, setValues] = useState({
        nombre: "",
        descripcion: "",
        imagen: "",
        precio: "",
        stock: "",
    });

    //escuchador de evento de casillertos de formulario
    const handleChange = (e) => {
        //target es cuando se cambia algo
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    return (
        <div className="container">
            <h1 className="text-center">Creacion de productos</h1>

            <form>
                <div className="mb-3 ">
                    <label htmlFor="nombre" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="emai"
                        name="nombre"
                        required
                        value={values.nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">
                        Descripcion
                    </label>
                    <textarea
                        className="form-control"
                        name="descripcion"
                        id="descripcion"
                        cols="30"
                        rows="5"
                        value={values.descripcion}
                        onChange={handleChange}
                    ></textarea>

                </div>

                <div class="mb-3">
                    <label htmlFor="imagen"
                        class="form-label"
                    >Cargar Imagen</label>
                    <input
                        class="form-control"
                        type="file"
                        id="imagen"
                        required
                        name="imagen"
                        value={values.imagen}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">
                        Precio
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="precio"
                        name="precio"
                        required
                    value={values.precio}
                    onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">
                        Stock
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="stock"
                        name="stock"
                    value={values.stock}
                    onChange={handleChange}
                    />
                </div>
            </form>

        </div>
    )
}

export default ProductosCreate