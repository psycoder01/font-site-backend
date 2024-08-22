import dotnenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotnenv.config();

export const verify = (req: any, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Unauthorized access');

  try {
    const verified = jwt.verify(token, process.env.TOKEN ?? '');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
