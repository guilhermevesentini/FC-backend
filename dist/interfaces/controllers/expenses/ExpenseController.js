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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
class ExpenseController {
    constructor(createExpenseUseCase) {
        this.createExpenseUseCase = createExpenseUseCase;
    }
    createExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { meses } = _a, expenseData = __rest(_a, ["meses"]);
                // Salva a despesa
                const createdExpense = yield this.createExpenseUseCase.execute(expenseData);
                // Se houver meses, salva-os
                if (meses && meses.length > 0) {
                    const monthsData = meses.map((mes) => (Object.assign(Object.assign({}, mes), { expenseId: createdExpense.id })));
                    //await this.createExpenseMonthUseCase.execute(monthsData);
                }
                return res.status(201).json({
                    message: "Expense and months created successfully",
                    expense: createdExpense,
                });
            }
            catch (error) {
                return res.status(500).json({ error: 'error.message' });
            }
        });
    }
}
exports.ExpenseController = ExpenseController;
