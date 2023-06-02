import * as userService from './users.service.js';

export async function getAll(req, res) {
  const users = await userService.getAll();
  res.json(users);
}
