//Establecemos las rutas
const User = require("../models/User");

//En el controlador creamos una funcion y le asiganmos la logica
const login = async (req, res) => {
  //recibo el email y login
  const { email, password } = req.body;
  try {
    //primero me fijo si existe el usuario
    let user = await User.findOne({ email });

    //vemos si el mail existe
    if (!user) {
      //tira un error de duplicado de usuario
      return res
        .status(403)
        .json({ error: "El usuario y/o contraseña es incorrecta" });
    }

    //comparo el password espero al async
    const passwordCorrecto = await user.comparePassword(password);

    if (!passwordCorrecto) {
      return res
        .status(403)
        .json({ error: "El password o contraseña es incorrecto" });
    }
    //retorna el login tru y user ID
    console.log(user);
    res.json({ login: true, userID: user.id });
  } catch (error) {
    //tira un error de duplicado de usuario
    res.status(500).json({ error: "Server Error" });
  }
};

const register =  async (req, res) => {
    //desestructuro del body
    const { email, password } = req.body;
    console.log(req.body);
    //guardo los datos que me manda el usuario y el modelo
    try {
      const user = new User({
        email,
        password,
      });
  
      //     antes de grabar hasheamos la contraseña
      //     espero que el usuario se termine de guardar
      await user.save();
  
      //     respuesta
      res.json({ register: true, userid: user.id });
    } catch (error) {
      // tira un error de duplicado de usuario
      res.status(500).json({ error: "Server Error" });
    }
  }

module.exports = {
  login,
  register,
};
