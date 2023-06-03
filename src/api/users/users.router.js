import Router from 'express';
import * as usersController from './users.controller.js';

const router = Router();

router.get('/all', usersController.getAll);
router.get('/:id', usersController.getById);

export default router;
