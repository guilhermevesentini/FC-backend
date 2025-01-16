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
exports.GetCategoriesRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../interfaces/controllers/ResponseHandlers");
class GetCategoriesRoute {
    constructor(path, method, getCategoriesUseCase) {
        this.path = path;
        this.method = method;
        this.getCategoriesUseCase = getCategoriesUseCase;
    }
    static create(getCategoriesUseCase) {
        return new GetCategoriesRoute("/get-categories", route_1.HttpMethod.GET, getCategoriesUseCase);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { tipo } = request.query;
                    const customerId = request.headers['x-customer-id'];
                    if (!customerId) {
                        throw Error('Erro ao obter o customerId dos cabeçalhos');
                    }
                    const tipoData = tipo ? Number(tipo) : undefined;
                    const output = yield this.getCategoriesUseCase.execute({ tipo: tipoData, customerId: customerId });
                    ResponseHandlers_1.ResponseHandler.success(response, output);
                }
                catch (error) {
                    ResponseHandlers_1.ResponseHandler.internalError(response, error);
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
}
exports.GetCategoriesRoute = GetCategoriesRoute;
