import db from '@/db';
import { Request, Response } from 'express';
import { photos } from '@/db/schema';
import asyncHandler from '@/utils/asyncHandler';
import { photoCreateSchema } from '@/utils/validators';
import { eq } from 'drizzle-orm';
import { generateUploadSasUrl } from '@/utils/fileUpload';

export const uploadPhoto = asyncHandler(async (req: Request, res: Response) => {
    const data = photoCreateSchema.parse(req.body);

    console.log(data);
    console.log(res.locals.user);

    const [photo] = await db
        .insert(photos)
        .values({
            caption: data.caption,
            tags: data.tags,
            photoUrl: data.photoUrl,
            userId: res.locals.user.id,
        })
        .$returningId();

    const [photoData] = await db.select().from(photos).where(eq(photos.id, photo.id));

    return res.status(201).json({ success: true, message: 'Photo uploaded', data: photoData });
});

export const getPhotoById = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'Invalid id', data: null });
    }

    const [photo] = await db.select().from(photos).where(eq(photos.id, id));

    if (!photo) {
        return res.status(400).json({ success: false, message: 'Photo not found', data: null });
    }

    const photoData = { ...photo, tags: photo?.tags ? photo?.tags.split(',') : [] };

    return res.status(200).json({ success: true, message: 'Photo found', data: photoData });
});

export const getAllPhotos = asyncHandler(async (req: Request, res: Response) => {
    const allPhotos = await db.select().from(photos);

    if (allPhotos.length === 0) {
        res.status(400).json({ success: false, message: 'No photos found', data: null });
    }

    return res.status(200).json({ success: true, message: 'Photos found', data: allPhotos });
});

export const getUploadSasUrl = asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(res.locals.user.id);

    if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid user id', data: null });
    }

    const fileName = `${userId}-${Date.now()}.jpg`;
    let sasUrl = '';

    try {
        sasUrl = await generateUploadSasUrl(fileName);
    } catch (error) {
        console.log(`Error generating sas url -> ${error}`);
    }

    if (sasUrl.length === 0) {
        return res.status(400).json({ success: false, message: 'Sas url not generated', data: null });
    }

    return res.status(200).json({ success: true, message: 'Sas url generated', data: sasUrl });
});
