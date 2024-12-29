"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensePresenter = void 0;
class ExpensePresenter {
    expense(input) {
        var _a, _b;
        return {
            id: input.id,
            customerId: input.customerId,
            vencimento: input.vencimento,
            nome: input.nome,
            replicar: input.replicar,
            tipoLancamento: input.tipoLancamento,
            meses: input.meses,
            range: {
                inicio: (_a = input.range) === null || _a === void 0 ? void 0 : _a.inicio,
                fim: (_b = input.range) === null || _b === void 0 ? void 0 : _b.fim
            }
        };
    }
}
exports.ExpensePresenter = ExpensePresenter;
