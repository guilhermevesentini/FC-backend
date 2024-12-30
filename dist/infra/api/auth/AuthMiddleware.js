"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ResponseHandlers_1 = require("../../../interfaces/controllers/ResponseHandlers");
class AuthMiddleware {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    handle(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return ResponseHandlers_1.ResponseHandler.unauthorized(res, 'Token não fornecido');
        }
        const [, token] = authHeader.split(' ');
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.secretKey);
            req.user = decoded;
            next();
        }
        catch (_a) {
            return ResponseHandlers_1.ResponseHandler.unauthorized(res, 'Token inválido');
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
