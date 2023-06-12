import nm from 'nodemailer';
import jwt from 'jsonwebtoken';
import { hashSync } from 'bcrypt';
import * as dotenv from 'dotenv';
import * as usersRepo from './users.repository.js';

export async function getAll() {
  const users = await usersRepo.getAll();
  return users;
}

export async function getById({ id }) {
  const user = await usersRepo.getById({ id });
  return user;
}

dotenv.config();

const {
  EMAIL, EMAIL_PASSWORD, HOST, CHANGE_PASSWORD_ROUTE, JWT_SECRET, JWT_EXPIRES_IN,
} = process.env;

export async function changePasswordRequest({ email }) {
  const user = await usersRepo.getByEmail({ email });
  if (!user) {
    const myError = { status: 403, message: 'Mail does not exist' };
    throw new Error(JSON.stringify(myError));
  }

  const payload = { email };
  const tempToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  const transporter = nm.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });

  const htmlLink = `<a href='${HOST}${CHANGE_PASSWORD_ROUTE}${tempToken}' target='_blank'>Pincha aquí</a>`;

  const mailOptions = {
    from: 'Los máquinas de TheBridge <correothebridge01@gmail.com',
    to: `${email}`,
    subject: 'Enlace para recuperar su contraseña:',
    text: `localhost:3001/users/changepassword/${tempToken}`,
    html: htmlLink,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      const myError = { status: 405, message: 'Error sending email' };
      throw new Error(JSON.stringify(myError));
    }
  });
}

export async function changePassword({ token }) {
  let email;
  jwt.verify(token, JWT_SECRET, async (error, payload) => {
    if (error) {
      const myError = { status: 403, message: 'Token error' };
      throw new Error(JSON.stringify(myError));
    }
    email = payload.email;
  });
  return email;
}

export async function updateByEmail({ email, password }) {
  const hashedPassword = hashSync(password, 10);
  const updatedUser = await usersRepo.updateByEmail({ email, hashedPassword });
  if (!updatedUser) {
    const myError = { status: 403, message: 'Mail does not exist' };
    throw new Error(JSON.stringify(myError));
  }
  return updatedUser;
}

export async function patchId({ id, newProps }) {
  const updatedUser = await usersRepo.patchId({ id, newProps });
  return updatedUser;
}

export async function getByUsername({ username }) {
  const user = await usersRepo.getByUsername({ username });
  return user;
}
