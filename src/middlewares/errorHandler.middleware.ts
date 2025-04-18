import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof ZodError) {
        return res.status(400).json({ success: false, message: err.issues[0].message, data: null });
    }

    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
};

export default globalErrorHandler;
