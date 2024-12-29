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
                try {
                    const customerId = request.cookies.customerId;
                    const output = yield this.getBankAccountUseCase.execute({ customerId: customerId });
                    response.status(200).json({
                        statusCode: 200,
                        result: output
                    });
                }
                catch (error) {
                    console.error("Error in CreateExpenseRoute:", error);
                    response.status(500).json({ error: "Internal server error" });
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
