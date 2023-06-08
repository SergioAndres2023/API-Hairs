import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';
import * as usersRepository from '../users/users.repository.js';
import nodemailer from 'nodemailer';
import userModel from '../users/users.model.js';

// function getToken({ username }) {
//   const payload = {
//     username,
//   };

//   const token = jwt.sign(payload, 'secretWord', {
//     expiresIn: 60 * 60,
//   });

//   return token;
// }

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
      { expiresIn: '48h' },
    );
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    // eslint-disable-next-line prefer-template
    const url = 'https:///' + emailToken;
    await transporter.sendMail({
      from: '"FullStack PartTime" <theBridgeFsPt@outlook.com>',
      to: 'jcm.odero@gmail.com',
      subject: 'Confirma tu registro huevón',
      html: `<h3>Bienvenido, estás a un paso de registrarte🚶</h3>
    <h2><a href="${url}">👉 Click aqui para confirmar tu registro 👈</a></h2>
    `,
    });
    // res.status(201).send({ msg: 'Usuario registrado con éxito', dbUser });
  } catch (error) {
    console.error('error', error);
  }
}

export async function confirm(req, res) {
  try {
    const token = req.params.emailToken;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    await userModel.updateOne(
      { email: payload.email },

      {
        confirmed: true,
      },
    );

    // res.status(201).send('Usuario confirmado con éxito');
  } catch (error) {
    console.error(error);
  }
}

// const token = getToken({ username: dbUser.username });
// if (!token) {
//   const myError = {
//     status: 500,
//     message: 'Some problem generating token',
//   };

//   throw new Error(JSON.stringify(myError));
// }

// return token;

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

  const token = getToken({ username: dbUser.username });
  if (!token) {
    const myError = {
      status: 500,
      message: 'Some problem generating token',
    };

    throw new Error(JSON.stringify(myError));
  }

  return token;
}
