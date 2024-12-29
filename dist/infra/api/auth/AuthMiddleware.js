"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    handle(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }
        const [, token] = authHeader.split(' ');
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.secretKey);
            req.user = decoded; // Adiciona o usuário ao objeto de requisição
            next();
        }
        catch (_a) {
            return res.status(401).json({ message: 'Token inválido' });
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
