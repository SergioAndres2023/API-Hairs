import Router from 'express';
import * as servicesController from './services.controller.js';

const router = Router();

router.post('/', servicesController.create);

export default router;
