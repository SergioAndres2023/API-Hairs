import Router from 'express';
import * as usersController from './users.controller.js';
import * as changePasswordController from './changePasswordController.js';

const router = Router();

router.get('/all', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/changepasswordrequest', changePasswordController.changePasswordRequest);
router.get('/changepassword/:id/:token', changePasswordController.changePassword);

router.patch('/:id', usersController.patchId);

export default router;
