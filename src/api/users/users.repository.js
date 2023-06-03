import userModel from './users.model.js';

export async function getAll() {
  const users = await userModel
    .find({ deleted: false })
    .lean();

  return users;
}

export async function create({ username, password }) {
  const newUser = await userModel.create({ username, password });
  return newUser;
}

