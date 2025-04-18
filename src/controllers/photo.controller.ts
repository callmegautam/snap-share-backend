import db from '@/db';
import { Request, Response } from 'express';
import { photos, users } from '@/db/schema';
import asyncHandler from '@/utils/asyncHandler';
import { isUserExist } from '@/utils/db';
import { generateToken } from '@/utils/jwt';
import { photoCreateSchema, userCreateSchema, userLoginSchema } from '@/utils/validators';
import { eq } from 'drizzle-orm';

export const uploadPhoto = asyncHandler(async (req, res) => {
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
