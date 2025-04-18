import db from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const isUserExist = async (email: string) => {
    try {
        const [user] = await db.select().from(users).where(eq(users.email, email));
        return user ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
};
