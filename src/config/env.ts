import { z } from 'zod';

const envSchema = z.object({
    PORT: z.number().optional(),
    // DB_URL: z.string().optional(),
    DB_HOST: z.string().optional(),
    DB_PORT: z.number().optional(),
    DB_USER: z.string().optional(),
    DB_PASSWORD: z.string().optional(),
    DB_DATABASE: z.string().optional(),
    JWT_SECRET: z.string().optional(),
    JWT_EXPIRY: z.string().optional(),
    NODE_ENV: z.enum(['development', 'production']).optional(),
});

export default envSchema.parse(process.env);
