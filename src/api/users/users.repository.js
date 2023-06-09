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

export async function create({
  username, password, phone, mail, rol,
}) {
  const newUser = await userModel.create({
    username, password, phone, mail, rol,
  });
  return newUser;
}

export async function patchId({ id, newProps }) {
  const query = { _id: id };
  const updatedUser = await userModel.findOneAndUpdate(query, newProps, { new: true })
    .lean();
  return updatedUser;
}

export async function getByUsername({ username }) {
  const user = await userModel
    .findOne({ username })
    .lean();

  return user;
}

export async function confirm({ payload }) {
  try {
    await userModel.updateOne(
      { mail: payload.mail },
      {
        confirmed: true,
      },
    );
    console.log('Usuario confirmado con éxito');
  } catch (error) {
    console.error(error);
  }
}
