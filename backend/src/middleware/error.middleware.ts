import { NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../utils/constants";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: NODE_ENV === 'development' ? err.stack : null,
    });
};