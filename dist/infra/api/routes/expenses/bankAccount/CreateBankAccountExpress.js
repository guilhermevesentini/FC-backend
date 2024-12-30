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
exports.CreateBankAccountRoute = void 0;
const route_1 = require("../../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../../interfaces/controllers/ResponseHandlers");
class CreateBankAccountRoute {
    constructor(path, method, createBankAccountUseCase) {
        this.path = path;
        this.method = method;
        this.createBankAccountUseCase = createBankAccountUseCase;
    }
    static create(createBankAccountUseCase) {
        return new CreateBankAccountRoute("/create-bank-account", route_1.HttpMethod.POST, createBankAccountUseCase);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const accountData = request.body;
                    const customerId = request.cookies.customerId;
                    const output = yield this.createBankAccountUseCase.execute(Object.assign(Object.assign({}, accountData), { customerId: customerId }));
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
exports.CreateBankAccountRoute = CreateBankAccountRoute;
