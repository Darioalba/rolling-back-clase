// Ruta de autenticacion de usuario registro y login

//Establecemos las ruta
const express = require("express");

const { login, register } = require("../controller/authController");

//metodo para crear ruta
const router = express.Router();

//definimos ruta de login
router.post("/login",login);

//Definimos ruta de registro
//aqui se coloca un capa intermedia miderwork que controla antes de seguir
router.post("/register", [
  body("email")
] , register);

//exporto ruta
module.exports = router;
