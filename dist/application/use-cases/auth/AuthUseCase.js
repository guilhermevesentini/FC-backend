"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUseCase = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthUseCase {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    static create(secretKey) {
        return new AuthUseCase(secretKey);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (token) {
                // Validar o token existente
                try {
                    jsonwebtoken_1.default.verify(token, this.secretKey);
                    return { valid: true };
                }
                catch (error) {
                    return { valid: false };
                }
            }
            else {
                // Gerar um novo token
                const newToken = jsonwebtoken_1.default.sign({}, this.secretKey, { expiresIn: "1h" });
                return { valid: true, token: newToken };
            }
        });
    }
}
exports.AuthUseCase = AuthUseCase;
