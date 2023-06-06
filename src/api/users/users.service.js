import * as usersRepo from './users.repository.js';

export async function getAll() {
  const users = await usersRepo.getAll();
  return users;
}

export async function getById({ id }) {
  const user = await usersRepo.getById({ id });
  return user;
}

export async function patchId({ id, newProps }) {
  const updatedUser = await usersRepo.patchId({ id, newProps });
  return updatedUser;
}

export async function getByUsername({ username }) {
  const user = await usersRepo.getByUsername({ username });
  return user;
}
