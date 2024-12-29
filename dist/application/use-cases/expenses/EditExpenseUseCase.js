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
exports.EditExpenseUseCase = void 0;
const expense_1 = require("../../../domain/entities/expenses/expense");
class EditExpenseUseCase {
    constructor(expenseGateway) {
        this.expenseGateway = expenseGateway;
    }
    static create(expenseGateway) {
        return new EditExpenseUseCase(expenseGateway);
    }
    execute(input, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.replicar) {
                const aExpense = expense_1.Expense.create(input);
                yield this.expenseGateway.editAll(input, customerId);
                return this.presentOutput(aExpense);
            }
            else {
                const expenseSingle = expense_1.Expense.create(input);
                yield this.expenseGateway.edit(input);
                return this.presentOutput(expenseSingle);
            }
        });
    }
    presentOutput(expense) {
        var _a, _b;
        return {
            id: expense.id,
            customerId: expense.customerId,
            vencimento: expense.vencimento,
            tipoLancamento: expense.tipoLancamento,
            range: {
                inicio: (_a = expense.range) === null || _a === void 0 ? void 0 : _a.inicio,
                fim: (_b = expense.range) === null || _b === void 0 ? void 0 : _b.fim
            },
            nome: expense.nome,
            replicar: expense.replicar,
            meses: expense.meses,
        };
    }
}
exports.EditExpenseUseCase = EditExpenseUseCase;
