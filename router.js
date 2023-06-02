import Router from 'express';
import * as authController from './auth/auth.controller.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
