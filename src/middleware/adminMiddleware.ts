import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Express Request type with the user property
declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace 'any' with a more specific type if you have one
    }
  }
}

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin role required' });
  }

  next();
};