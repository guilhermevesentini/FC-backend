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
exports.RecoverPasswordUserRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../interfaces/controllers/ResponseHandlers");
class RecoverPasswordUserRoute {
    constructor(path, method, recoverPasswordUseCase) {
        this.path = path;
        this.method = method;
        this.recoverPasswordUseCase = recoverPasswordUseCase;
    }
    static create(recoverPasswordUseCase) {
        return new RecoverPasswordUserRoute("/recover-password/:email", route_1.HttpMethod.GET, recoverPasswordUseCase);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { email } = request.params;
                    if (!email) {
                        ResponseHandlers_1.ResponseHandler.error(response, 'Nome do usuário é obrigatório');
                        return;
                    }
                    const output = yield this.recoverPasswordUseCase.execute({ email });
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
    present(input) {
        const response = {
            id: input.id,
            email: input.email,
            username: input.username,
            password: input.password
        };
        return response;
    }
}
exports.RecoverPasswordUserRoute = RecoverPasswordUserRoute;
