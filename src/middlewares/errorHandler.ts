import { Request, Response, NextFunction } from 'express';

/* use next(error) middleware and errors get passed into here */
interface Error {
  message?: string;
  stack?: any;
}

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === `production` ? `🥞` : error.stack,
  });
};

export default errorHandler;
