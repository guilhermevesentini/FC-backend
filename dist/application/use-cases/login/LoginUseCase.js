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
exports.LoginUserUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login_1 = require("../../../domain/entities/login/login");
const UserNotFoundError_1 = require("../../../shared/errors/login/UserNotFoundError");
const InvalidCredentialsError_1 = require("../../../shared/errors/login/InvalidCredentialsError");
const LoginPresenter_1 = require("../../../interfaces/presenters/login/LoginPresenter");
class LoginUserUseCase {
    constructor(loginGateway) {
        this.loginGateway = loginGateway;
        this.loginPresenter = new LoginPresenter_1.LoginPresenter;
    }
    static create(loginGateway) {
        return new LoginUserUseCase(loginGateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFromDb = yield this.loginGateway.validateUser(input.email);
            if (!userFromDb)
                throw new UserNotFoundError_1.UserNotFoundError();
            const isPasswordValid = yield bcryptjs_1.default.compare(input.password, userFromDb.password);
            if (!isPasswordValid)
                throw new InvalidCredentialsError_1.InvalidCredentialsError();
            const token = login_1.Login.generateToken(input.email);
            const output = {
                token: token,
                customerId: userFromDb.customerId
            };
            return this.loginPresenter.login(output);
        });
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
