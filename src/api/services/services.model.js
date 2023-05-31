import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
  // nombre: String,
  serviceName: {
    type: String,
    required: true,
  },
  servicePrice: {
    type: Number,
    required: true,
  },
  servicePoints: {
    type: Number,
    required: true,
  },
  serviceMinutes: {
    type: Number,
    required: true,
  },
  serviceDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const serviceModel = model('Service', serviceSchema);

export default serviceModel;
