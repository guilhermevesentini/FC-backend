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
exports.GetBankAccountRoute = void 0;
const route_1 = require("../../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../../interfaces/controllers/ResponseHandlers");
class GetBankAccountRoute {
    constructor(path, method, getBankAccountUseCase) {
        this.path = path;
        this.method = method;
        this.getBankAccountUseCase = getBankAccountUseCase;
    }
    static create(getBankAccountUseCase) {
        return new GetBankAccountRoute("/get-bank-account", route_1.HttpMethod.GET, getBankAccountUseCase);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const customerId = (_a = request.headers['x-customer-id']) === null || _a === void 0 ? void 0 : _a.toString();
                    if (!customerId) {
                        throw Error('Erro ao obter o customerId');
                    }
                    const output = yield this.getBankAccountUseCase.execute({ customerId: customerId });
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
exports.GetBankAccountRoute = GetBankAccountRoute;
