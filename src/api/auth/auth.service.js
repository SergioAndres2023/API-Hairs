import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';
import * as usersRepository from '../users/users.repository.js';

function getToken({ username }) {
  const payload = {
    username,
  };

  const token = jwt.sign(payload, 'secretWord', {
    expiresIn: 60 * 60,
  });

  return token;
}

export async function register(
  {
    username, password, phone, mail, rol,
  },
) {
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
