import { getAllPhotos, getPhotoById, uploadPhoto } from '@/controllers/photo.controller';
import { isLogin } from '@/middlewares/auth.middleware';
import { Router } from 'express';

const router = Router();

router.post('/upload', isLogin, uploadPhoto);
router.get('/:id', getPhotoById);
router.get('/', getAllPhotos);

export default router;
