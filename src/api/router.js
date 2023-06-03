import Router from 'express';
import bookingsRouter from './bookings/bookings.router.js';

const router = Router();

router.use('/bookings', bookingsRouter);

export default router;
