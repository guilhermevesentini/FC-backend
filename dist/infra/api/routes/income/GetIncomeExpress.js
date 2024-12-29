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
exports.GetIncomeRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
class GetIncomeRoute {
    constructor(path, method, getIncomeUseCase) {
        this.path = path;
        this.method = method;
        this.getIncomeUseCase = getIncomeUseCase;
    }
    static create(getIncomeUseCase) {
        return new GetIncomeRoute("/get-income", route_1.HttpMethod.GET, getIncomeUseCase);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { mes, ano } = request.query;
                    const customerId = request.cookies.customerId;
                    const incomes = yield this.getIncomeUseCase.execute({ mes: Number(mes), ano: Number(ano), customerId: customerId });
                    response.status(200).json({
                        statusCode: 200,
                        result: incomes
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
exports.GetIncomeRoute = GetIncomeRoute;
