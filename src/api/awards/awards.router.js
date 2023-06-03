import Router from 'express';
import * as awardsController from './awards.controller.js';

const router = Router();

router.get('/all', awardsController.getAll);

router.post('/', awardsController.create);

router.patch('/update/:id', awardsController.update);

export default router;
