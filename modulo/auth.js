// Ruta de autenticacion de usuario registro y login

//Establecemos la ruta
const express = require("express");
const User = require("../models/User");

//metodo para crear ruta
const router = express.Router();

//definimos ruta de login
router.post("/login", (req, res) => {
  res.json({ login: true });
});

//definimos ruta de registro
router.post("/register", async (req, res) => {
  //desestructuro del body
  const { email, password } = req.body;
  console.log(req.body);
  //guardo los datos que me manda el usuario y el modelo
  try {
    const user = new User({
      email,
      password,
    });
    //antes de grabar hasheamos la contraseña

    //espero que el usuario se termine de guardar
    await user.save();

    //respuesta
    res.json({ register: true, user });
  } catch (error) {
    //tira un error de duplicado de usuario
    res.status(500).json({ error: "Server Error" });
  }
  res.json({ register: true });
});

//exporto ruta
module.exports = router;