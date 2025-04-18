import { z } from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number().optional(),
    // DB_URL: z.string().optional(),

    DB_HOST: z.string().optional(),
    DB_PORT: z.coerce.number().optional(),
    DB_USER: z.string().optional(),
    DB_PASSWORD: z.string().optional(),
    DB_DATABASE: z.string().optional(),
    JWT_SECRET: z.string(),
    JWT_EXPIRY: z.string(),
    NODE_ENV: z.enum(['development', 'production']).optional(),
});

export default envSchema.parse(process.env);
