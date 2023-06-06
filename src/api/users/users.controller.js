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

export async function patchId(req, res) {
  const { id } = req.params;
  const newProps = req.body;
  if (newProps.password) {
    res.startus(401);
    res.json('This property cant be updeted');
  }
  const updatedUser = await userService.patchId({ id, newProps });
  res.json(updatedUser);
}
