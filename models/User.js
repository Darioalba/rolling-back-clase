//Primero traigo el esquema de mongoo db
// creo un modelo a partir de un esquema
//type: es el tipo de texto
//required: significa que requiere si o si texto
//trim: es para quitarn espacios en blanco
//unique: hace que el email sea unico y no se pueda repetir
//lowercase: hace que todo el estring se transforme en minuscula
//index: me permite buscar rapido un email

const { Schema, model, default: mongoose } = require("mongoose");
const bcryptjs = require("bcryptjs")

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true},

    },
    password:{
        type: String,
        required: true,  
    },   
})

//algo que se ejecuta antes de grabar, en este caso el hash
userSchema.pre("save", async function(){
    try{
        //del esquema toma el password, creo la promesa
       this.password = await bcryptjs.hash(this.password, 12)
    }catch(error){
        console.log(error)
    }
})

//vamos a crear un modelo a partir de lo anterior
const User = model("User", userSchema)
//exportamos el esquema
module.exports = User


