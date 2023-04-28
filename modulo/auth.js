//Ruta para anteuticar usiarios

//creo la ruta
const express = require("express")
const router = express.Router()

//creo ruta de post login
router.post("/login", (req, res)=>{
    res.json({ok: true})
})

//creo ruta de post registro
router.post("/register", (req, res)=>{
    res.json({register: true})
})

//exporto la ruta
module.exports = router


