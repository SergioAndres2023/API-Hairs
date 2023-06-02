import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: [true, 'El nombre es obligatorio'] }, // ¿ponemos mensajes para informar?
  Phone: { type: String, required: true },
  Mail: { type: String, required: true },
  Points: { type: Number, required: true, default: 0 },
  password: { type: String, required: true },
  Deleted: { type: Boolean, required: true, default: false },
  Rol: { type: String, required: true, enum: ['admin', 'client'] },
});

const userModel = model('User', userSchema);

export default userModel;
