import * as usersRepo from './users.repository.js';

export async function getAll() {
  const users = await usersRepo.getAll();
  return users;
}

export async function getById({ id }) {
  const user = await usersRepo.getById({ id });
  return user;
}
