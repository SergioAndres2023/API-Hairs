import Router from 'express';
import * as usersController from './users.controller.js';
import admin from '../../middlewares/admin.middleware.js';

const router = Router();

router.get('/all', admin, usersController.getAll);
router.get('/:id', admin, usersController.getById);

router.patch('/:id', admin, usersController.patchId);

export default router;
