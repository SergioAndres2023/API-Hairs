import userModel from './users.model.js';

export async function getAll() {
  const users = await userModel
    .find({ deleted: false })
    .lean();

  return users;
}

export async function getById({ id }) {
  const user = await userModel
    .findById(id)
    .lean();

  return user;
}

export async function create({ username, password }) {
  const newUser = await userModel.create({ username, password });
  return newUser;
}

export async function getByEmail({ email }) {
  const user = await userModel
    .findOne({ mail: email });
  return user;
}
