import { getPhotosByUserId, loginUser, registerUser } from '@/controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id/photos', getPhotosByUserId);

export default router;
