import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductoEdit() {
  const [values, setValues] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });

  const [imagen, setImagen] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/productos/${id}`)
      .then((res) => {
        console.log(res);
        setValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("nombre", values.nombre);
    formData.append("descripcion", values.descripcion);
    formData.append("precio", values.precio);
    formData.append("stock", values.stock);

    axios
      .put(`http://localhost:3000/api/productos/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/productos");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleChangeFile = (event) => {
    if (event.target.files[0]) {
      setImagen(event.target.files[0]);
    }
  };

  return (
    <div className="container">
      <h1>Editar producto nuevo</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            required
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
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
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">
            Imagen
          </label>
          <input
            accept="image/png, image/svg, image/jpg, image/jpeg"
            type="file"
            className="form-control"
            id="imagen"
            name="imagen"
            // value={imagen}
            onChange={handleChangeFile}
          />
        </div>
        <img
          src={`http://localhost:3000/img/productos/${values.imagen}`}
          width={100}
          alt={values.nombre}
        />
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">
            Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="precio"
            required
            name="precio"
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
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ProductoEdit;
