import { Request, Response } from "express";

export function adaptRoute(controller: any) {
    return async (req: Request, res: Response) => {
        const httpRequest = {
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers,
        };

        const httpResponse = await controller.handle(httpRequest);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
}
