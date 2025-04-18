import { getAllPhotos, getPhotoById, getUploadSasUrl, uploadPhoto } from '@/controllers/photo.controller';
import { isLogin } from '@/middlewares/auth.middleware';
import { Router } from 'express';

const router = Router();

router.get('/', getAllPhotos);
router.get('/generate-upload-url', isLogin, getUploadSasUrl);
router.get('/:id', getPhotoById);
router.post('/upload', isLogin, uploadPhoto);

export default router;
