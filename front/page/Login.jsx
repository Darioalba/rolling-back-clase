import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

function Login() {
  //condicion inidial
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  //navegacion  a pagina principal
  const navigate = useNavigate()

  //captura el boton enviar del form
  const handleSumbit = (e) => {
    //evito un evento predeterminado
    e.preventDefault();

    //con el metodo post envio del front a back
    axios
      .post("http://localhost:3000/api/login", values)
      .then((res) => {
      console.log(res)
      navigate("/")}) //redirecciono a pagina principal
      .catch((err) => console.log(err));
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
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
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

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}
export default Login;
