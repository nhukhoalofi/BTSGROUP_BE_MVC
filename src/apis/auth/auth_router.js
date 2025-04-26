//Định nghĩa các route như /login, /register và gán controller tương ứng.
import express from 'express';
import AuthController from './auth_controller.js';  // Đảm bảo bạn import đúng file controller
const router = express.Router();
router.post('/register', AuthController.register);
router.post('/login',AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
export default router;
