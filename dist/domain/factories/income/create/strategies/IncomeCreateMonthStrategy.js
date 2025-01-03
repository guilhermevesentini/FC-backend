"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeCreateMonthStrategy = void 0;
class IncomeCreateMonthStrategy {
    create(input) {
        return {
            id: input.id,
            mes: input.mes,
            ano: input.ano,
            valor: input.valor,
            status: input.status,
            descricao: input.descricao,
            incomeId: input.id,
            categoria: input.categoria,
            customerId: input.customerId,
            recebimento: input.recebimento,
            observacao: input.observacao,
            contaId: input.contaId
        };
    }
}
exports.IncomeCreateMonthStrategy = IncomeCreateMonthStrategy;
