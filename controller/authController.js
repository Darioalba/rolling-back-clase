//Establecemos las rutas
const { validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { response } = require("express");

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

    //cuando me logeo genero el token y lo firmo(guardo el pailot)
    //tengo el id, tengo la firma y tengo la duracion del toquen
    const token = jwt.sign({ uid: user.id }, process.env.JWR_SECRET, {
      expiresIn: "1h",
    });

    //retorna el login tru, user ID, y token
    console.log(user);
    res.json({ login: true, userID: user.id, token });
  } catch (error) {
    //tira un error de duplicado de usuario
    res.status(500).json({ error: "Server Error" });
  }
};

const register = async (req, res) => {
  //verifico los requisitos de mail y password
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }

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
};

//es para mail invalidos, email no registrado
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    //buscamos a ver si existe el usuario
    const user = await User.findOne({ email });
    //preguntamos
    if (!user) {
      return res.status(422).json({ error: "No existe el usuario" });
    }

    //creamos token
    const secret = process.env.JWR_SECRET + user.password;

    //firmamos el token
    const token = jwt.sign({ uid: user.id }, secret, { expiresIn: "1h" });
    //aqui le pego el node mailer
    //creo el transporter que va a enviar el mail
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    //creamos el link de restablecer contraseña en el front
    //usamos el formato query string(clave valor)
    const link = `http://localhost:5173/api/reset/${user.id}?token=${token}`;

    //vamos a crear el email de quin a quien se envia
    //incrustramos el mail
    let emailOptions = {
      from: "forgot@x.com",
      to: user.email,
      subject: "Forgot password",
      html: `
      <h1>Forgot password</h1>
      <a href="${link}">Reset password</a>
      `,
    };

    //realizamos el envio del mail y me llega el link, aca se envia el mail
    transporter.sendMail(emailOptions, function (err, data) {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json({
        user,
        link,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};

const resetPassword = async (req, res) => {
  //parametro de id y token
  const { id, token } = req.params;
  //password de body
  const { password } = req.body;

  try {
    //buscamos si existe el usuario
    const user = await User.findById(id);
    //regfunto si existe el usuario
    if (!user) {
      return res.status(422).json({ error: "No existe el usuario" });
    }

    //creamos token
    const secret = process.env.JWT_SECRET + user.password;

    //verifico que el token no este vencido o alterado
    const verified = jwt.verify(token, secret);
    console.log(verified);

    if (!verified) {
      user.password = password;
      await user.save();
    }

    response.json({
      user,
      verified,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
};
