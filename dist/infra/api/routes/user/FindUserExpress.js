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
exports.FindUserRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../interfaces/controllers/ResponseHandlers");
class FindUserRoute {
    constructor(path, method, findUserService) {
        this.path = path;
        this.method = method;
        this.findUserService = findUserService;
    }
    static create(findUserService) {
        return new FindUserRoute("/find-user/:username", route_1.HttpMethod.GET, findUserService);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { username } = request.params;
                    if (!username) {
                        ResponseHandlers_1.ResponseHandler.error(response, 'Nome do usuário é obrigatório');
                        return;
                    }
                    const output = yield this.findUserService.execute({ username });
                    if (!output) {
                        ResponseHandlers_1.ResponseHandler.error(response, 'Usuário não encontrado');
                        return;
                    }
                    const responseBody = this.present(output);
                    ResponseHandlers_1.ResponseHandler.success(response, responseBody);
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
            username: input.username,
            password: input.password
        };
        return response;
    }
}
exports.FindUserRoute = FindUserRoute;
