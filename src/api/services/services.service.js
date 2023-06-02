import * as servicesRepo from './services.repository.js';

export async function getAll() {
  const services = await servicesRepo.getAll();
  return services;
}

export async function create({ serviceData }) {
  const services = await servicesRepo.create({ serviceData });
  return services;
}
