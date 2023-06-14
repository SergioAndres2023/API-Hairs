import Router from 'express';
import * as usersController from './users.controller.js';

const router = Router();

router.get('/all', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/changepasswordrequest', usersController.changePasswordRequest);
router.post('/changepassword/:token', usersController.changePassword);

router.patch('/:id', usersController.patchId);

export default router;
