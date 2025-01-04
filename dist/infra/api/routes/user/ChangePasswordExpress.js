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
exports.ChangePasswordUserRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../interfaces/controllers/ResponseHandlers");
class ChangePasswordUserRoute {
    constructor(path, method, changePasswordUseCase) {
        this.path = path;
        this.method = method;
        this.changePasswordUseCase = changePasswordUseCase;
    }
    static create(changePasswordUseCase) {
        return new ChangePasswordUserRoute("/change-password/", route_1.HttpMethod.POST, changePasswordUseCase);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { form } = request.body;
                    if (!form.email && !form.senha && !form.novaSenha) {
                        ResponseHandlers_1.ResponseHandler.error(response, 'Houve um erro ao solicitar para alterar a senha');
                        return;
                    }
                    const output = yield this.changePasswordUseCase.execute({ email: form.email, senha: form.senha, novaSenha: form.novaSenha });
                    if (!output) {
                        ResponseHandlers_1.ResponseHandler.error(response, 'Usuário não encontrado');
                        return;
                    }
                    ResponseHandlers_1.ResponseHandler.success(response, true);
                }
                catch (error) {
                    console.error("Error in FindUserRoute:", error);
                    ResponseHandlers_1.ResponseHandler.internalError(response, error);
                }
            })
        ];
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
}
exports.ChangePasswordUserRoute = ChangePasswordUserRoute;
