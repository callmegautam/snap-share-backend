import db from '@/db';
import { users } from '@/db/schema';
import asyncHandler from '@/utils/asyncHandler';
import { isUserExist } from '@/utils/db';
import { generateToken } from '@/utils/jwt';
import { userCreateSchema, userLoginSchema } from '@/utils/validators';
import { eq } from 'drizzle-orm';

export const registerUser = asyncHandler(async (req, res) => {
    const data = userCreateSchema.parse(req.body);

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

export const loginUser = asyncHandler(async (req, res) => {
    const data = userLoginSchema.parse(req.body);

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
