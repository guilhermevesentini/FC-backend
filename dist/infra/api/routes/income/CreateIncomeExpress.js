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
exports.CreateIncomeRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../interfaces/controllers/ResponseHandlers");
class CreateIncomeRoute {
    constructor(path, method, createIncomeUseCase) {
        this.path = path;
        this.method = method;
        this.createIncomeUseCase = createIncomeUseCase;
    }
    static create(createIncomeUseCase) {
        return new CreateIncomeRoute("/create-income", route_1.HttpMethod.POST, createIncomeUseCase);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const incomeData = request.body;
                    const customerId = (_a = request.headers['x-customer-id']) === null || _a === void 0 ? void 0 : _a.toString();
                    if (!customerId) {
                        throw Error('Erro ao obter o customerId');
                    }
                    yield this.createIncomeUseCase.execute(Object.assign(Object.assign({}, incomeData), { customerId: customerId }));
                    ResponseHandlers_1.ResponseHandler.success(response, true);
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
exports.CreateIncomeRoute = CreateIncomeRoute;
