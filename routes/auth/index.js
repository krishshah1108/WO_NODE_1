import express from 'express';
import { authController } from './controller/auth.controller.js';

export const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/refresh-token', authController.getNewAccessToken);
router.get('/logout', authController.logoutUser);
