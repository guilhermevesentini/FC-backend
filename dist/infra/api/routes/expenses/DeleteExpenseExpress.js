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
exports.DeleteExpenseRoute = void 0;
const route_1 = require("../../../../interfaces/routes/route");
class DeleteExpenseRoute {
    constructor(path, method, deleteExpenseUseCase) {
        this.path = path;
        this.method = method;
        this.deleteExpenseUseCase = deleteExpenseUseCase;
    }
    static create(deleteExpenseUseCase) {
        return new DeleteExpenseRoute("/delete-expense", route_1.HttpMethod.POST, deleteExpenseUseCase);
    }
    getHandler() {
        return [
            (request, response) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { despesaId, mes } = request.body;
                    const customerId = request.cookies.customerId;
                    yield this.deleteExpenseUseCase.execute({ customerId, id: despesaId, mes });
                    response.status(200).json({
                        statusCode: 200,
                        result: true
                    });
                }
                catch (error) {
                    console.error("Error in DeletedExpenseRoute:", error);
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
exports.DeleteExpenseRoute = DeleteExpenseRoute;
