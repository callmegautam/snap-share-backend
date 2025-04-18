import db from '@/db';
import { Request, Response } from 'express';
import { photos, users } from '@/db/schema';
import asyncHandler from '@/utils/asyncHandler';
import { isUserExist } from '@/utils/db';
import { generateToken } from '@/utils/jwt';
import { userCreateSchema, userLoginSchema } from '@/utils/validators';
import { eq } from 'drizzle-orm';

// create /me controller which will return authorization = true

export const me = asyncHandler(async (req: Request, res: Response) => {
    return res.status(200).json({ success: true, message: 'Authorized', data: { authorization: true } });
});

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const data = userCreateSchema.parse(req.body);
    console.log(data);

    const userExists = await isUserExist(data.email);

    if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists', data: null });
    }

    const result = await db
        .insert(users)
        .values({
            name: data.name,
            email: data.email,
            password: data.password,
        })
        .$returningId();

    const [user] = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
        })
        .from(users)
        .where(eq(users.id, result[0]?.id));

    return res.status(201).json({ success: true, message: 'User created', data: user });
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const data = userLoginSchema.parse(req.body);
    console.log(`login user -> ${data.email}`);

    const [user] = await db.select().from(users).where(eq(users.email, data.email));

    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found', data: null });
    }

    if (user.password !== data.password) {
        return res.status(400).json({ success: false, message: 'Invalid password', data: null });
    }

    const token = generateToken({ id: user.id, email: user.email });
    return res
        .status(200)
        .cookie('authorization', token)
        .json({
            success: true,
            message: 'Login successful',
            data: { id: user.id, email: user.email, token },
        });
});

export const getPhotosByUserId = asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid user id', data: null });
    }

    const allPhotos = await db
        .select({
            id: photos.id,
            caption: photos.caption,
            tags: photos.tags,
            photoUrl: photos.photoUrl,
        })
        .from(photos)
        .where(eq(photos.userId, userId));

    if (allPhotos.length === 0) {
        return res.status(400).json({ success: false, message: 'No photos found', data: null });
    }

    return res.status(200).json({ success: true, message: 'Photos found', data: allPhotos });
});
