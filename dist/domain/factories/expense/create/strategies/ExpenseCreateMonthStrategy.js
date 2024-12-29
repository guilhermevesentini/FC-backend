"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseCreateMonthStrategy = void 0;
class ExpenseCreateMonthStrategy {
    create(input) {
        return {
            id: input.id,
            mes: input.mes + 1,
            ano: input.ano,
            valor: input.valor,
            status: input.status,
            descricao: input.descricao,
            despesaId: input.id,
            categoria: input.categoria,
            customerId: input.customerId,
            vencimento: input.vencimento,
            observacao: input.observacao,
            contaId: input.contaId
        };
    }
}
exports.ExpenseCreateMonthStrategy = ExpenseCreateMonthStrategy;
