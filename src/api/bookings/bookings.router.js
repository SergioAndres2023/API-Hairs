import Router from 'express';
import * as bookingsController from './bookings.controller.js';

const router = Router();

router.get('/day/:date', bookingsController.getByDate);
router.post('/date', bookingsController.create); // Only permitted to admin
router.patch('/delete/:id', bookingsController.logicDelete); // Only permitted to admin

export default router;
