import express from 'express'
import authController from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const { Register, Login, User } = authController;

const router = express.Router();

router.post('/register', Register);

router.post('/login', Login);

router.get('/user', authMiddleware, User)

export default router;