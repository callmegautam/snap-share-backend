import { z } from 'zod';

export const userCreateSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6),
});

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const userUpdateSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6),
});

export const photoCreateSchema = z.object({
    caption: z.string().optional(),
    tags: z.string().optional(),
    photoUrl: z.string().min(3).max(500),
});
