//requiero la URI del .env
//config levanta el archivo del env
require("dotenv").config();

//Esto es lo basico de un servidor
//aqui creamos el servidor
const express = require("express");
const app = express();

//aqui voy a requerir mongoose
//el http es de la base de datos de atlas
const mongoose = require("mongoose");
mongoose
  //aqui debo ocultar mi contraseña con variables de entorno
  //llamo al env DB_URI
  .connect(process.env.DB_URI)
  .then(() => console.log("mongoosee conectado"))
  .catch((err) => console.log(err));

// const usersRouter = require("./routes/users")

//del modulo requiero la funcion saludar y mensaje
//desestructuro el modulo y los utilizo
const { saludar, mensaje } = require("./modelo");
saludar();
console.log(mensaje);

//crear miderwords, tranforma la peticion en un json obtiene req.body
app.use(express.json()); //req.body

//aqui creamos la ruta
app.get("/", (req, res) => {
  //escuche por el metodo get
  console.log(req);
  res.send("hola");
});

//llamo la ruta y se lo aplico a app
// la ruta apì y el modulo
app.use("/api", require("./modulo/users"));
app.use("/api", require("./modulo/productos"));

//aqui escuchamos por un puerto
app.listen(3000, () => console.log(`http://localhost:3000`));
