import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from 'process';
import globalErrorHandler from '@/middlewares/errorHandler.middleware';

const app = express();

const isProduction = env.NODE_ENV === 'production';
const httpLoggerMode = isProduction ? 'combined' : 'dev';

app.use(cors());
app.use(cookieParser());
app.use(morgan(httpLoggerMode));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (_: Request, res: Response) => {
    res.send('Backend is running');
});

import userRoute from '@/routes/user.route';
import photoRoute from '@/routes/photo.route';
app.use('/api/v1/user', userRoute);
app.use('/api/v1/photo', photoRoute);

app.use('*', (_: Request, res: Response) => {
    res.status(404).send('Not found');
});

app.use(globalErrorHandler);

export default app;
