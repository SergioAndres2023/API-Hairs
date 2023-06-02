import * as servicesService from './services.service.js';

export async function getAll(req, res) {
  const services = await servicesService.getAll();
  res.json(services);
}

export async function create(req, res) {
  const serviceData = req.body;
  const services = await servicesService.create({ serviceData });
  res.json(services);
}
