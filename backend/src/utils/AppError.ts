import { NODE_ENV } from './constants.js';

class AppError extends Error {
    public status: string;
    public isOperational: boolean;
    public stack?: string;

    constructor(public statusCode: number, public message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        this.isOperational = true;
        
        if (NODE_ENV === 'development') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = undefined;
        }
    }
}

export default AppError;