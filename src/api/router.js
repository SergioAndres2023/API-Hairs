import Router from 'express';
import * as authController from './auth/auth.controller.js';
// import countriesRouter from './countries/countries.router.js';
import usersRouter from './users/users.router.js';
import bookingsRouter from './bookings/bookings.router.js';
import awardsRouter from './awards/awards.router.js';
import servicesRouter from './services/services.router.js';

const router = Router();

// router.use('/countries', countriesRouter);
router.use('/users', usersRouter);
router.use('/bookings', bookingsRouter);
router.use('/awards', awardsRouter);
router.use('/services', servicesRouter);

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
