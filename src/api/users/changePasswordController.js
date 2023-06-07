import nm from 'nodemailer';
import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';
import * as dotenv from 'dotenv';
import * as usersRepository from './users.repository.js';

dotenv.config({});

const { EMAIL, EMAIL_PASSWORD } = process.env;

let tempToken;

export async function changePasswordRequest(req, res) {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.status(400);
    res.json({ message: 'Datos incompletos' });
    return;
  }

  const user = await usersRepository.getByEmail({ email });
  if (!user) {
    res.status(403);
    res.json({ message: 'No existe ese email' });
    return;
  }

  // const isAuthorized = compareSync(password, user.password);
  // if (!isAuthorized) {
  //   res.status(403);
  //   res.json({ message: 'Contraseña incorrecta' });
  //   return;
  // }

  const username = user.name;

  try {
    const payload = { username };
    tempToken = jwt.sign(payload, 'esternocleidomastoideo', { expiresIn: '1h' });

    const transporter = nm.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
      },
    });

    const htmlLink = `<a href='http://localhost:3001/users/changepassword/${user.id}/${tempToken}' target='_blank'>Pincha aquí</a>`;

    const mailOptions = {
      from: 'Los máquinas de TheBridge <correothebridge01@gmail.com',
      to: `${email}`,
      subject: 'Enlace para recuperar su contraseña:',
      text: `localhost:3001/users/changepassword/${user.id}/${tempToken}`,
      html: htmlLink,
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('Error enviando correo:', err);
      } else {
        console.log('Respuesta:', response);
        res.status(200);
        res.json('El email para la recuperacion ha sido enviado');
      }
    });
  } catch (error) {
    res.status(500);
    res.json({ message: 'Error con ese email', error });
  }
}

export async function changePassword(req, res) {
  const { id, token } = req.params;
  console.log(`Entrando en 'changePassword' con id usuario (${id} y token (${token}))`);
  // recuperar token guardado y commparar con el token recibido en la funcion
  // si son iguales (todavia existe el token) permitir cambiar la contraseña, hashearla y guardarla
  // si distinto o token caducado enviar mensaje con link de nueva peticion de cambio de contraseña
  res.json('Saliendo de changePassword');
}
