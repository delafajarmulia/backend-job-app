import { NextFunction, Request, Response } from "express"

interface ValidationErrorItem {
    message: string;
    [key: string]: any;
}

interface MongooseValidationError extends Error {
    name: 'ValidationError';
    errors: Record<string, ValidationErrorItem>;
    stack?: string;
}

export const errorHandler = (
    err: Error | MongooseValidationError,
    req: Request,
    res: Response,
    next: NextFunction
):void => {
    if(err.name === 'ValidationError'){
        const validationErr = err as MongooseValidationError

        const messages = Object.values(validationErr.errors).map(
            (item) => item.message
        )

        res.status(400).json({
            message: 'Validation Error',
            errors: messages,
            stack: validationErr.stack,
        })
        return
    } else {
        next(err)
    }
} 