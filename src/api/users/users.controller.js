import * as userService from './users.service.js';

export async function getAll(req, res) {
  const users = await userService.getAll();
  res.json(users);
}

export async function getById(req, res) {
  const { id } = req.params;
  const userById = await userService.getById({ id });
  res.json(userById);
}
