import userModel from './users.model.js';

export async function getAll() {
  const users = await userModel
    .find({ deleted: false })
    .populate({
      path: 'boss',
      select: 'username -_id',
    })
    .lean();

  return users;
}

export async function getByIndex({ index }) {
  const user = await userModel
    .findOne({}).skip(index)
    .populate({
      path: 'boss',
      select: 'username -_id',
    })
    .lean();

  return user;
}

export async function getByUsername({ username }) {
  const user = await userModel
    .findOne({ username })
    .populate({
      path: 'boss',
      select: 'username -_id',
    })
    .lean();

  return user;
}

export async function getById({ id }) {
  const user = await userModel
    .findById(id)
    .populate({
      path: 'boss',
      select: 'username -_id',
    })
    .lean();

  return user;
}

export async function create({ username, password }) {
  const newUser = await userModel.create({ username, password });
  return newUser;
}

export async function replace({ id, newUser }) {
  const query = { _id: id };
  const replacedUser = await userModel.findOneAndReplace(query, newUser);
  return replacedUser;
}
