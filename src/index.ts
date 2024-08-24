import cors from 'cors';
import dotenv from 'dotenv';
import httpStatus from 'http-status';
import fileUpload from 'express-fileupload';
import express, { Request, Response, NextFunction } from 'express';

import { sequelize } from './config/db';
import fontRoutes from './routes/font.routes';
import authRoutes from './routes/auth.routes';
import { verify as verifyToken } from './middlewares/verify';
import path from 'path';

export const app = express();

const APIError = require('./helpers/APIError');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Check the db server
sequelize
    .authenticate()
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => console.error('Unable to connect to databse ', err));

// Docs
app.use('/api/v1/docs', express.static(path.join(__dirname, '../doc')));

app.use('/api/v1/font', verifyToken, fontRoutes);
app.use('/api/v1/auth', authRoutes);

// Check if api error.
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (!(err instanceof APIError)) {
        const apiError = new APIError(err.message, err.status, err.isPublic);
        return next(apiError);
    }
    return next(err);
});

// Catch 404 error and pass to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new APIError('Wrong API.', httpStatus.NOT_FOUND, true);
    return next(err);
});

// error handler, send stacktrace only during development
app.use((
    err: any,
    req: any,
    res: any,
    next: any, // eslint-disable-line no-unused-vars
) =>
    res.status(err.status).json({
        success: false,
        message: err.isPublic ? err.message : "Something wrong.",
        stack: process.env.MODE === 'dev' ? err.stack : {},
    }),
);

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started server at PORT ${port}`);
});
