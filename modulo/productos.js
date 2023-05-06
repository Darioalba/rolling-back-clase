const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken")

//aqui traigo los productos
const Producto = require("../models/lista");


//vamos a requerir multrt
const multer = require("multer")
//creo un storage para guarda la imagen
// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/productos") //ubicacion donde se va a guarda
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ "-" + file.originalname) //nombre original del archivo
  }
})
const upload = multer({ storage: storage })


//cuando coloco un await la funcion tiene que tener un async
router.get("/productos", async (req, res) => {
  try {
    //token
    console.log(req.headers)
    //saco el authorizacion del headers
    const {authorization} = req.headers

    //separo el string y genero un array
    console.log(authorization.split(" "))

    //saco el token
    const token = authorization.split(" ").pop()

    //comparo el token y la firma
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    console.log(payload)

    //aqui busco los datos dentro de la base
    //esto es una promesa
    const productos = await Producto.find();
    console.log(productos);
    // estos datos ya viene de la base de datos
    res.json(productos);
  } catch (err) {
    console.log(err);
  }
});

//vamos a traer un solo producto, usa findById
router.get("/productos/:id", async (req, res) => {
  try {
    //aqui busco los datos dentro de la base
    //esto es una promesa y se trae por el ID
    const producto = await Producto.findById(req.params.id);
    console.log(productos)
    // estos datos ya viene de la base de datos
    res.json(producto);
  } catch (err) {
    console.log(err);
  }
});

//vamos a crear un solo producto
//upload sigle sube una sola imagen
router.post("/productos", upload.single("imagen"), async (req, res) => {
console.log(req.body, req.file)
  try {
    //creamos un product
    const producto = new Producto({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      imagen: req.file.filename,
      precio: req.body.precio,
      stock: req.body.stock,
    });
    const result = await producto.save();
    // console.log(result)
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

//vamos a actualizar un registro 
router.put("/productos/:id", async (req, res) => {
  // console.log(req.body)
  try {
    //modifica un parametro por ID
    const result = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); //trae el registro que acaba de crear
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

//vamos a borrar un registro 
router.delete("/productos/:id", async (req, res) => {
  // console.log(req.body)
  try {
    //busca y brorra el elemento
    const result = await Producto.findByIdAndDelete(req.params.id)
    const msg = result ? "Registro borrado" : "No se encontro el registro"
    res.json({ msg }); //me trae el registro que borro
  } catch (err) {
    console.log(err);
  }
});

//exporto el modulo
module.exports = router;
