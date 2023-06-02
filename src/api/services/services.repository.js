import servicesModel from './services.model.js';

export async function getAll() {
  const services = await servicesModel
    .find({ deleted: false })
    .lean();
  return services;
}
export async function create({ serviceData }) {
  const newService = await servicesModel
    .create(serviceData);
  return newService;
}
