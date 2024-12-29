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
exports.GetExpenseRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
class GetExpenseRoute {
    constructor(path, method, getExpensePerMonthService //criar usecase
    ) {
        this.path = path;
        this.method = method;
        this.getExpensePerMonthService = getExpensePerMonthService;
    }
    static create(getExpensePerMonthService) {
        return new GetExpenseRoute("/get-expense/", route_1.HttpMethod.GET, getExpensePerMonthService);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { mes, ano } = request.query;
                    if (!mes || !ano)
                        return response.status(400).json({ error: "Obrigatório mes e ano" });
                    const customerId = request.cookies.customerId;
                    const input = {
                        mes: Number(mes),
                        ano: Number(ano),
                        customerId
                    };
                    const output = yield this.getExpensePerMonthService.execute(input);
                    response.status(200).json({
                        statusCode: 200,
                        result: output
                    });
                }
                catch (error) {
                    console.error("Error in CreateUserRoute:", error);
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
exports.GetExpenseRoute = GetExpenseRoute;
