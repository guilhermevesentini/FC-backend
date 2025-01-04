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
exports.ChangePasswordUseCase = void 0;
const InvalidCredentialsError_1 = require("../../../shared/errors/login/InvalidCredentialsError");
const UserNotFoundError_1 = require("../../../shared/errors/login/UserNotFoundError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class ChangePasswordUseCase {
    constructor(userGateway) {
        this.userGateway = userGateway;
    }
    static create(userGateway) {
        return new ChangePasswordUseCase(userGateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const aUser = yield this.userGateway.findUser(input.email);
            if (!aUser)
                throw new UserNotFoundError_1.UserNotFoundError();
            const isPasswordValid = yield bcryptjs_1.default.compare(input.senha, aUser.password);
            if (!isPasswordValid)
                throw new InvalidCredentialsError_1.InvalidCredentialsError();
            const reset = yield this.userGateway.updatePassword({ email: aUser.email, password: input.novaSenha });
            if (!reset.id)
                return false;
            return true;
        });
    }
}
exports.ChangePasswordUseCase = ChangePasswordUseCase;
