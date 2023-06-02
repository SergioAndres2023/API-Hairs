import * as usersRepo from './users.repository.js';

export async function getAll() {
  const users = await usersRepo.getAll();
  return users;
}
