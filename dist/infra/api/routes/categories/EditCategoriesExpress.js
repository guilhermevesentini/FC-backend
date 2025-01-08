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
exports.EditCategoriesRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../interfaces/controllers/ResponseHandlers");
class EditCategoriesRoute {
    constructor(path, method, editCategoriesUseCase) {
        this.path = path;
        this.method = method;
        this.editCategoriesUseCase = editCategoriesUseCase;
    }
    static create(editCategoriesUseCase) {
        return new EditCategoriesRoute("/edit-category", route_1.HttpMethod.POST, editCategoriesUseCase);
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
                    const output = yield this.editCategoriesUseCase.execute(Object.assign(Object.assign({}, categoryData), { customerId: customerId }));
                    ResponseHandlers_1.ResponseHandler.success(response, { id: output.id });
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
exports.EditCategoriesRoute = EditCategoriesRoute;
