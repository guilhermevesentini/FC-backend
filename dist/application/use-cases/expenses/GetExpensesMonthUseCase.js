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
exports.GetExpenseMonthUseCase = void 0;
class GetExpenseMonthUseCase {
    constructor(expenseGateway) {
        this.expenseGateway = expenseGateway;
    }
    static create(expenseGateway) {
        return new GetExpenseMonthUseCase(expenseGateway);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const months = yield this.expenseGateway.get(input.mes, input.ano, input.customerId);
            return months;
            // const output: ExpenseDto[] = 
            // return output.map((expense) => this.presentOutput(expense));
        });
    }
    presentOutput(expense) {
        return {
            id: expense.id,
            mes: expense.mes,
            categoria: expense.categoria,
            despesaId: expense.despesaId,
            ano: expense.ano,
            valor: expense.valor,
            status: expense.status,
            descricao: expense.descricao,
            customerId: expense.customerId,
            vencimento: expense.vencimento,
            observacao: expense.observacao,
            contaId: expense.contaId
        };
    }
}
exports.GetExpenseMonthUseCase = GetExpenseMonthUseCase;
