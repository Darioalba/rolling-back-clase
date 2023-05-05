//Primero traigo el esquema de mongoo db
// creo un modelo a partir de un esquema
const { Schema, model} = require("mongoose")

//el esquema es un objeto
const schema = new Schema ({
    nombre:  {
        type: String,
        required: true,
    },
    descripcion: String,
    image: String,
    precio: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    }
})

//el modelo se llama Productos y viene de schema, luego lo exporto
// los modelos o moldes se definen con la letra mayuscula
module.exports = model("Producto", schema)