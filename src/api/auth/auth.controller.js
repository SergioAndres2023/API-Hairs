import * as authService from './auth.service.js';
import * as usersRepository from '../users/users.repository.js';

export async function register(req, res) {
  const {
    username, password, mail,
  } = req.body;

  let token;

  if (!username || !password || !mail) {
    res.status(400);
    res.json('Empty required params');
    return;
  }

  const userExists = await usersRepository.getByEmail({ mail });
  if (userExists) {
    res.status(400);
    res.json('User exists');
    return;
  }

  try {
    token = await authService.register({
      username, password, mail, rol: 'client',
    });
  } catch (err) {
    const myError = JSON.parse(err.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }

  res.json(token);
}

export async function login(req, res) {
  const { username, password } = req.body;
  let token;

  if (!username || !password) {
    res.status(400);
    res.json('Empty required params');
    return;
  }

  try {
    token = await authService.login({ username, password });
  } catch (err) {
    const myError = JSON.parse(err.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }

  res.json({ token });
}

export async function confirm(req, res) {
  const { emailtoken } = req.params;
  await authService.confirm({ emailtoken });
  res.json('Usuario Confirmado HTML');
}
