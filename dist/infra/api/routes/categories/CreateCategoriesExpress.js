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
exports.CreateCategoriesRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../interfaces/controllers/ResponseHandlers");
class CreateCategoriesRoute {
    constructor(path, method, createCategoriesUseCase) {
        this.path = path;
        this.method = method;
        this.createCategoriesUseCase = createCategoriesUseCase;
    }
    static create(createCategoriesUseCase) {
        return new CreateCategoriesRoute("/create-category", route_1.HttpMethod.POST, createCategoriesUseCase);
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
                    const output = yield this.createCategoriesUseCase.execute(Object.assign(Object.assign({}, categoryData), { customerId: customerId }));
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
exports.CreateCategoriesRoute = CreateCategoriesRoute;
