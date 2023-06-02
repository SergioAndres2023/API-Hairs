import Router from 'express';
import * as servicesController from './services.controller.js';

const router = Router();

router.get('/all', servicesController.getAll);

router.post('/', servicesController.create);

export default router;
