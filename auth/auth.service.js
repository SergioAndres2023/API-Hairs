import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';

function getToken({ username }) {
  const payload = {
    username,
  };

  const token = jwt.sign(payload, 'secretWord', {
    expiresIn: 60 * 60,
  });

  return token;
}

export async function register({ username, password }) {
  const hashedPassword = hashSync(password, 10);
  const dbUser = await usersRepository.create({ username, password: hashedPassword });
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
