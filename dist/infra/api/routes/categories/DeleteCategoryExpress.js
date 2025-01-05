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
exports.DeleteCategoriesRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../interfaces/controllers/ResponseHandlers");
class DeleteCategoriesRoute {
    constructor(path, method, deleteCategoriesUseCase) {
        this.path = path;
        this.method = method;
        this.deleteCategoriesUseCase = deleteCategoriesUseCase;
    }
    static create(deleteCategoriesUseCase) {
        return new DeleteCategoriesRoute("/delete-category", route_1.HttpMethod.POST, deleteCategoriesUseCase);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const categoryData = request.body;
                    const customerId = request.headers['x-customer-id'];
                    if (!customerId) {
                        throw Error('Erro ao obter o customerId dos cabeçalhos');
                    }
                    const output = yield this.deleteCategoriesUseCase.execute(Object.assign(Object.assign({}, categoryData), { customerId: customerId }));
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
exports.DeleteCategoriesRoute = DeleteCategoriesRoute;
