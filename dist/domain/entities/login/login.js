"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Login {
    constructor(props, token) {
        this.props = props;
        this.token = token;
    }
    static generateToken(username) {
        const secretKey = process.env.SECRET_KEY || 'mysecretkeyfcbackend';
        return jsonwebtoken_1.default.sign({ username }, secretKey, { expiresIn: '24h' });
    }
    static with(props, token) {
        return new Login(props, token);
    }
    get email() {
        return this.props.email;
    }
    get username() {
        return this.props.username || undefined;
    }
    get password() {
        return this.props.password;
    }
    get tokenJwt() {
        return this.token;
    }
}
exports.Login = Login;
