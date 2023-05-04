import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

function Register() {
  //condicion inidial
  const [values, setValues] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  //navegacion  a pagina principal
  const navigate = useNavigate()

  //captura el boton enviar del form
  const handleSumbit = (e) => {
    //evito un evento predeterminado
    e.preventDefault();

    //con el metodo post envio del front a back
    axios
      .post("http://localhost:3000/api/register", values)
      .then((res) => {
        console.log(res)
        alert("Usuario registrado")
        navigate("/login")
      }) //redirecciono a pagina principal
      .catch((err) => {
        console.log(err)
        alert(err.response.data.errors[0].msg || "Server Error" )
      });
  };

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
      <h1 className="text-center">Realice su registro</h1>
      <form onSubmit={handleSumbit}>
        <div className="mb-3">
          <label htmlFor="emai" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="emai"
            name="email"
            value={values.email}
            onChange={handleChange}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="`password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password_confirmation" className="form-label">
            Confirmacion de contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="`password_confirmation"
            name="password_confirmation"
            value={values.password_confirmation}
            onChange={handleChange}
            required
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}
export default Register;
