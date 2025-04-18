import { verifyToken } from '@/utils/jwt';
import { Request, Response, NextFunction } from 'express';

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.authorization;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized', data: null });
    }
    try {
        const decoded = verifyToken(token);
        res.locals.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: 'Unauthorized', data: null });
    }
};
