import { Request, Response, NextFunction } from "express";

export function validate(schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ error: error.details });
        next();
    };
}