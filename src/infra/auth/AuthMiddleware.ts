import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export class AuthMiddleware {
  constructor(private readonly secretKey: string) {}

  public handle(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = jwt.verify(token, this.secretKey);

      req.user = decoded; // Adiciona o usuário ao objeto de requisição
      
      next();
    } catch {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }
}
