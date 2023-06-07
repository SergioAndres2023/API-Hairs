import Router from 'express';

import awardsRouter from './awards/awards.router.js';
import bookingsRouter from './bookings/bookings.router.js';
import servicesRouter from './services/services.router.js';
import usersRouter from './users/users.router.js';

import * as authController from './auth/auth.controller.js';
import auth from '../middlewares/auth.middleware.js';
import admin from '../middlewares/admin.middleware.js';

const router = Router();

router.use('/awards', admin, awardsRouter);
router.use('/bookings', admin, auth, bookingsRouter);
router.use('/services', admin, servicesRouter);
router.use('/users', admin, auth, usersRouter);

router.post('/register', auth, authController.register);
router.post('/login', auth, authController.login);

export default router;
