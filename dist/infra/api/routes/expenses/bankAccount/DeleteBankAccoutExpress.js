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
exports.DeleteBankAccountRoute = void 0;
const route_1 = require("../../../../../interfaces/routes/route");
const ResponseHandlers_1 = require("../../../../../interfaces/controllers/ResponseHandlers");
class DeleteBankAccountRoute {
    constructor(path, method, deleteBankAccountUseCase) {
        this.path = path;
        this.method = method;
        this.deleteBankAccountUseCase = deleteBankAccountUseCase;
    }
    static create(deleteBankAccountUseCase) {
        return new DeleteBankAccountRoute("/delete-bank-account", route_1.HttpMethod.POST, deleteBankAccountUseCase);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const body = request.body;
                    const customerId = request.cookies.customerId;
                    yield this.deleteBankAccountUseCase.execute({ customerId: customerId, id: body.id });
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
exports.DeleteBankAccountRoute = DeleteBankAccountRoute;
