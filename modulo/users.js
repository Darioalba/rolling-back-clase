//necesito de express
const express = require("express")

//aqui defino el modod de ruta
const router = express.Router()

//se usa el metodo GET
router.get("/users", (req, res) =>{
    res.send("Listado de usuarios por GET")
})

//se usa el metodo POST
router.post("/users", (req, res) =>{
    res.send("Crear usuario por POST")
})

//se usa el metodo put
router.put("/users", (req, res) =>{
    res.send("Modificar usuarios por PUT")
})

//se usa el metodo delete
router.delete("/users", (req, res) =>{
    res.send("Borrar usuarios usuarios por DELETE")
})

module.exports = router
