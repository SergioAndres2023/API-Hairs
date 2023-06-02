import userModel from './users.model.js';

export async function create({ username, password }) {
  const newUser = await userModel.create({ username, password });
  return newUser;
}

export async function remove({ id }) {
  const users = await userModel.findByIdAndDelete(id);
  console.log('delete', users);
  return {};
}
