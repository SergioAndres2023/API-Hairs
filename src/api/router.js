import Router from 'express';
import usersRouter from './users/users.router.js';
import servicesRouter from './services/services.router.js';
import awardsRouter from './awards/awards.router.js';
import * as authController from './auth/auth.controller.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/services', servicesRouter);
router.use('/awards', awardsRouter);
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
