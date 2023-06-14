import Router from 'express';
import * as bookingsController from './bookings.controller.js';
import admin from '../../middlewares/admin.middleware.js';

const router = Router();

router.get('/day/:date', bookingsController.getByDate);
router.post('/date', admin, bookingsController.create);
router.patch('/archive/:id', admin, bookingsController.archive);
router.patch('/:id', admin, bookingsController.update);

export default router;
