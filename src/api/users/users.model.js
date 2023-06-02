import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  boss: {
    type: ObjectId,
    ref: 'User',
  },
});

const userModel = model('User', userSchema);

export default userModel;
