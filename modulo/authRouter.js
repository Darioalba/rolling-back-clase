// Ruta de autenticacion (validacion) de usuario registro y login 

//Establecemos las ruta
const express = require("express");
const { login, register } = require("../controller/authController");
const { body } = require("express-validator");

//metodo para crear ruta
const router = express.Router();

//definimos ruta de login
router.post("/login", login);

//Definimos ruta de registro
// aqui se coloca un capa intermedia miderwork que controla antes de seguir
router.post(
  "/register",
  [
    //aqui ponemos el miderwork que establece reglas de validacion
    body("email")
      .trim() //le saco todos los espacios
      .notEmpty()
      .withMessage("El correo es requerido") //que no este vacio
      .isEmail()
      .withMessage("El email es incorrecto"), //que sea un email
    body("password")
      .notEmpty()
      .withMessage("El password es requerido") //que no este vacio
      .isLength(5) //numero de caractereaas
      .withMessage("El password debe tener como minimo 5 caracteres") //que no este vacio
      .custom((value, {req}) => value === req.body.password_confirmation) //chequeo si los password dan iguales
      .withMessage("La contraseña no coinside") 
    ],
  register
);

//exporto ruta
module.exports = router;
