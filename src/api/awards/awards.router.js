import Router from 'express';
import * as awardsController from './awards.controller.js';

const router = Router();

router.get('/all', awardsController.getAll);

router.post('/', awardsController.create);

router.patch('/archive/:id', awardsController.archive);
router.patch('/:id', awardsController.update);

export default router;
