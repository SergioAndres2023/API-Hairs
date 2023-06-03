import Router from 'express';
import * as bookingsController from './bookings.controller.js';

const router = Router();

router.get('/day/:date', bookingsController.getByDate);

export default router;
