import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';
import nodemailer from 'nodemailer';
import * as usersRepository from '../users/users.repository.js';
import userModel from '../users/users.model.js';

export async function register({
  username, password, phone, mail, rol,
}) {
  try {
    const hashedPassword = hashSync(password, 10);
    const dbUser = await usersRepository.create({
      username, password: hashedPassword, phone, mail, rol,
    });
    if (!dbUser) {
      const myError = {
        status: 500,
        message: 'Some problem creating the user',
      };

      throw new Error(JSON.stringify(myError));
    }
    const emailToken = jwt.sign(
      { mail },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const url = `http://localhost:3001/confirm/${emailToken}`;
    await transporter.sendMail({
      from: '"FullStack PartTime" <theBridgeFsPt@gmx.es>',
      to: 'jcm.odero@gmail.com',
      subject: 'Confirma tu registro huevón',
      html: `<img src="https://static.vecteezy.com/system/resources/previews/000/599/237/large_2x/hair-and-face-salon-logo-vector-templates.jpg" width="250px">
      <h3>Bienvenido, estás a un paso de registrarte🚶</h3>
    <h2><a href="${url}">👉 Click aqui para confirmar tu registro 👈</a></h2>
    `,
    });
    console.log(`Usuario registrado con éxito. Valida tu usuario en el enlace recibido en ${mail}`, dbUser);
  } catch (error) {
    console.error('error', error);
  }
}

export async function confirm({ emailtoken }) {
  try {
    const token = emailtoken;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    await userModel.updateOne(
      { mail: payload.mail },

      {
        confirmed: true,
      },
    );
    console.log('Usuario confirmado con éxito');
  } catch (error) {
    console.error(error);
  }
}

export async function login({ username, password }) {
  const dbUser = await usersRepository.getByUsername({ username });
  if (!dbUser) {
    const myError = {
      status: 401,
      message: 'Wrong credentials',
    };

    throw new Error(JSON.stringify(myError));
  }

  const isSamePassword = compareSync(password, dbUser.password);
  if (!isSamePassword) {
    const myError = {
      status: 401,
      message: 'Wrong credentials',
    };

    throw new Error(JSON.stringify(myError));
  }
}
