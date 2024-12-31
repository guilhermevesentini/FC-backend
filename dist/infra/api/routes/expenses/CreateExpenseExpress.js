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
exports.CreateExpenseRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../interfaces/controllers/ResponseHandlers");
class CreateExpenseRoute {
    constructor(path, method, createExpenseUseCase) {
        this.path = path;
        this.method = method;
        this.createExpenseUseCase = createExpenseUseCase;
    }
    static create(createExpenseUseCase) {
        return new CreateExpenseRoute("/create-expense", route_1.HttpMethod.POST, createExpenseUseCase);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const expenseData = request.body;
                    const customerId = request.headers['x-customer-id'];
                    if (!customerId) {
                        throw Error('Erro ao obter o customerId dos cabeçalhos');
                    }
                    if (!customerId) {
                        throw Error('Erro ao obter o cookie');
                    }
                    const output = yield this.createExpenseUseCase.execute(Object.assign(Object.assign({}, expenseData), { customerId: customerId }));
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
exports.CreateExpenseRoute = CreateExpenseRoute;
