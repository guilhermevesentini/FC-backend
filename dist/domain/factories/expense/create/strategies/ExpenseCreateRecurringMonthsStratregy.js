"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseCreateRecurringMonthsStratregy = void 0;
class ExpenseCreateRecurringMonthsStratregy {
    buildMonth(input, month, year) {
        const originalDate = new Date(input.vencimento);
        const day = originalDate.getUTCDate();
        const Data = {
            id: input.id,
            ano: year,
            mes: month,
            valor: input.valor,
            descricao: input.descricao,
            observacao: input.observacao,
            status: input.status,
            despesaId: input.despesaId,
            vencimento: new Date(year, month - 1, day),
            customerId: input.customerId,
            categoria: input.categoria,
            incomeId: input.id,
            contaId: input.contaId
        };
        return Data;
    }
    create(input) {
        const { vencimento } = input;
        const months = [];
        const currentDate = new Date(vencimento);
        const currentYear = currentDate.getUTCFullYear();
        const startMonth = currentDate.getUTCMonth() + 1;
        for (let month = startMonth; month <= 12; month++) {
            const day = currentDate.getUTCDate();
            const newDate = new Date(currentYear, month - 1, day);
            months.push(this.buildMonth(Object.assign(Object.assign({}, input), { vencimento: newDate }), month, currentYear));
        }
        //if (replicar && tipoLancamento === ETipoOptions.recorrente)
        // for (let month = startMonth; month <= 12; month++) {
        //   months.push(this.buildMonth(input, month, currentYear));
        // }
        return months;
    }
}
exports.ExpenseCreateRecurringMonthsStratregy = ExpenseCreateRecurringMonthsStratregy;
