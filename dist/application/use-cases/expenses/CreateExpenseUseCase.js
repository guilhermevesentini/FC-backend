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
exports.CreateExpenseUseCase = void 0;
const enums_1 = require("../../../@types/enums");
const expense_1 = require("../../../domain/entities/expenses/expense");
const ExpenseCreateInstallmentsStrategy_1 = require("../../../domain/factories/expense/create/strategies/ExpenseCreateInstallmentsStrategy");
const ExpenseCreateMonthStrategy_1 = require("../../../domain/factories/expense/create/strategies/ExpenseCreateMonthStrategy");
const ExpenseCreateRecurringMonthsStratregy_1 = require("../../../domain/factories/expense/create/strategies/ExpenseCreateRecurringMonthsStratregy");
class CreateExpenseUseCase {
    constructor(expenseGateway) {
        this.expenseGateway = expenseGateway;
        this.createRecurring = new ExpenseCreateRecurringMonthsStratregy_1.ExpenseCreateRecurringMonthsStratregy(),
            this.createMonth = new ExpenseCreateMonthStrategy_1.ExpenseCreateMonthStrategy(),
            this.createInstallments = new ExpenseCreateInstallmentsStrategy_1.ExpenseCreateInstallmentstrategy();
    }
    static create(expenseGateway) {
        return new CreateExpenseUseCase(expenseGateway);
    }
    execute(expense) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let strategy;
            let months;
            if (expense.tipoLancamento == enums_1.ETipoOptions.recorrente) { //tratar aqui a seleção de range
                months = this.createRecurring.create(expense);
            }
            else if (expense.tipoLancamento == enums_1.ETipoOptions.parcelado) {
                months = this.createInstallments.create(expense);
            }
            else {
                months = [this.createMonth.create(expense)];
            }
            strategy = {
                id: expense.id,
                vencimento: expense.vencimento,
                replicar: expense.replicar,
                tipoLancamento: expense.tipoLancamento,
                range: {
                    inicio: ((_a = expense.range) === null || _a === void 0 ? void 0 : _a.inicio) || undefined,
                    fim: ((_b = expense.range) === null || _b === void 0 ? void 0 : _b.fim) || undefined
                },
                nome: expense.nome,
                customerId: expense.customerId,
                meses: months
            };
            const expenseOutput = expense_1.Expense.create(strategy);
            yield this.expenseGateway.create(expenseOutput);
            return expenseOutput;
        });
    }
}
exports.CreateExpenseUseCase = CreateExpenseUseCase;
