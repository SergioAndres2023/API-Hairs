import servicesModel from './services.model.js';

export async function create({ serviceData }) {
  const newService = await servicesModel
    .create(serviceData);
  return newService;
}
