import Router from 'express';

import servicesRouter from './services/services.router.js';
import * as authController from './auth/auth.controller.js';

const router = Router();
router.use('/services', servicesRouter);
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
