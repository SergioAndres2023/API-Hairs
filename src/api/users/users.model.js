import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: [true, 'El nombre es obligatorio'] },
  phone: { type: String, required: true },
  mail: { type: String, required: true },
  points: { type: Number, required: true, default: 0 },
  password: { type: String, required: true },
  deleted: { type: Boolean, required: true, default: false },
  rol: { type: String, required: true, enum: ['admin', 'client'] },
});

const userModel = model('User', userSchema);

export default userModel;
