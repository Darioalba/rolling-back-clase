//Aqui vamos a hacer todo la parte del server

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

//requerimos las cors para enlazar frint y back, 
const cors = require("cors");
app.use(cors())

//del modulo requiero la funcion saludar y mensaje
//desestructuro el modulo y los utilizoS
const { saludar, mensaje } = require("./modelo");
saludar();
console.log(mensaje);

//crear miderwords, tranforma la peticion en un    obtiene el req.body con imagenes
app.use(express.urlencoded({extended: false})); //req.body
//creo un miderwok para hacer la imagen publica
app.use(express.static("public"))
//crear miderwords, tranforma la peticion en un json obtiene req.body
app.use(express.json()); //req.body

//aqui creamos la ruta
app.get("/", (req, res) => {
  //escuche por el metodo get
  console.log(req);
  res.send("hola soy el Back");
});

//llamo la ruta y se lo aplico a app
// la ruta apì y el modul
app.use("/api", require("./modulo/users"));
app.use("/api", require("./modulo/productos"));
app.use("/api", require("./modulo/authRouter"))


const PORT = process.env.PORT
//aqui escuchamos por un puerto
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
