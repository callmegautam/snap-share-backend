import db from '@/db';
import { users } from '@/db/schema';
import asyncHandler from '@/utils/asyncHandler';
import { isUserExist } from '@/utils/db';
import { userCreateSchema } from '@/utils/validators';
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
