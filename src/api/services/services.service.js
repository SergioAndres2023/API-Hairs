import * as servicesRepo from './services.repository.js';

export async function create({ serviceData }) {
  const services = await servicesRepo.create({ serviceData });
  return services;
}
