import { getPhotosByUserId, loginUser, me, registerUser } from '@/controllers/user.controller';
import { isLogin } from '@/middlewares/auth.middleware';
import { Router } from 'express';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id/photos', getPhotosByUserId);
router.get('/me', isLogin, me);

export default router;
