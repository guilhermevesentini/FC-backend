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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverPasswordUseCase = void 0;
const EmailService_1 = require("../../../infra/services/EmailService");
const hashUtils_1 = require("../../../shared/utils/hashUtils");
class RecoverPasswordUseCase {
    constructor(userGateway) {
        this.userGateway = userGateway;
        this.emailService = new EmailService_1.EmailService;
    }
    static create(userGateway) {
        return new RecoverPasswordUseCase(userGateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const aUser = yield this.userGateway.findUser(input.email);
            if (!aUser) {
                throw Error('Usuário não encontrado');
            }
            const generatedPassword = (0, hashUtils_1.generateRandomPassword)();
            yield this.emailService.sendPasswordResetEmail(aUser.email, generatedPassword);
            const reset = yield this.userGateway.updatePassword({ email: aUser.email, password: generatedPassword });
            if (!reset.id)
                return false;
            return true;
        });
    }
}
exports.RecoverPasswordUseCase = RecoverPasswordUseCase;
