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
exports.LoginRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class LoginRoute {
    constructor(path, method, loginUserService) {
        this.path = path;
        this.method = method;
        this.loginUserService = loginUserService;
    }
    static create(loginUserService) {
        return new LoginRoute("/auth/login", route_1.HttpMethod.POST, loginUserService);
    }
    //logout res.clearCookie('userId');
    getHandler() {
        return [
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { username, password } = req.body;
                    if (!username || !password) {
                        return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
                    }
                    const output = yield this.loginUserService.execute({ username, password });
                    if (!output) {
                        res.status(200).json({ statusCode: 400, result: 'Ocorreu um erro, tente novamente mais tarde.' });
                        return;
                    }
                    res.cookie('customerId', output.customerId, {
                        httpOnly: true,
                        maxAge: 86400000, // 24 horas
                        secure: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development",
                        sameSite: "none"
                    });
                    return res.status(200).json({
                        statusCode: 200,
                        result: output.token
                    });
                }
                catch (error) {
                    this.handleError(res, error);
                }
            }),
        ];
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
    sendError(res, statusCode, message) {
        res.status(statusCode).json({
            statusCode,
            error: message,
        });
    }
    handleError(res, error) {
        const errorMap = {
            UserNotFoundError: { statusCode: 404, message: "Usuário não encontrado." },
            InvalidCredentialsError: { statusCode: 401, message: "Senha inválida." },
        };
        if (error instanceof Error) {
            const mappedError = errorMap[error.name];
            if (mappedError) {
                this.sendError(res, mappedError.statusCode, mappedError.message);
                return;
            }
            console.error("Erro desconhecido:", error);
            this.sendError(res, 500, "Erro interno do servidor");
        }
    }
}
exports.LoginRoute = LoginRoute;
