"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenValidator {
    validate(token) {
        try {
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "mysecretkeyfcbackend");
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.TokenValidator = TokenValidator;
