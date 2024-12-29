"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseMonthPresenter = void 0;
class ExpenseMonthPresenter {
    month(input) {
        return {
            id: input.id,
            vencimento: input.vencimento,
            ano: input.ano,
            customerId: input.customerId,
            descricao: input.descricao,
            contaId: input.contaId,
            despesaId: input.despesaId,
            categoria: input.categoria,
            mes: input.mes,
            observacao: input.observacao,
            status: input.status,
            valor: input.valor
        };
    }
}
exports.ExpenseMonthPresenter = ExpenseMonthPresenter;
