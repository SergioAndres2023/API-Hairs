import Router from 'express';

import servicesRouter from './services/services.router.js';

const router = Router();
router.use('/services', servicesRouter);

export default router;
