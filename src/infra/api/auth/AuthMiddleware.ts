import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseHandler } from '../../../interfaces/controllers/ResponseHandlers';

export class AuthMiddleware {
  constructor(private readonly secretKey: string) {}

  public handle(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return ResponseHandler.unauthorized(res, 'Token não fornecido');
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = jwt.verify(token, this.secretKey);

      req.user = decoded;
      
      next();
    } catch {
      return ResponseHandler.unauthorized(res, 'Token inválido');
    }
  }
}
