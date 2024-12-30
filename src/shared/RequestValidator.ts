import { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../interfaces/controllers/ResponseHandlers";

export function validate(schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) return ResponseHandler.error(res, error.details);
        next();
    };
}