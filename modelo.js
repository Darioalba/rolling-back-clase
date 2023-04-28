const mensaje ="Un mensaje"

const saludar = () =>{
    console.log("Hola mundo")
}

//forma de exporta la funcion
//pra tener varias cosas en el modulo creo un objeto
module.exports = {
    saludar,
    mensaje
}