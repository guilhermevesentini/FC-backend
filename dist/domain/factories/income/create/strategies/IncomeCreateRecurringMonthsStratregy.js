"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeCreateRecurringMonthsStratregy = void 0;
const enums_1 = require("../../../../../@types/enums");
class IncomeCreateRecurringMonthsStratregy {
    buildMonth(input, month, year) {
        const originalDate = new Date(input.recebimento);
        const day = originalDate.getUTCDate();
        const Data = {
            id: input.id,
            ano: year,
            mes: month,
            valor: input.valor,
            descricao: input.descricao,
            observacao: input.observacao,
            status: input.status,
            recebimento: new Date(year, month - 1, day),
            customerId: input.customerId,
            categoria: input.categoria,
            incomeId: input.id,
            contaId: input.contaId
        };
        return Data;
    }
    create(input) {
        const { recebimento, replicar, tipoLancamento } = input;
        const months = [];
        const currentDate = new Date(recebimento);
        const currentYear = currentDate.getUTCFullYear();
        const startMonth = currentDate.getUTCMonth() + 1;
        if (replicar && tipoLancamento === enums_1.ETipoOptions.recorrente) {
            for (let month = 1; month <= 12; month++) {
                const day = currentDate.getUTCDate();
                const newDate = new Date(currentYear, month - 1, day);
                months.push(this.buildMonth(Object.assign(Object.assign({}, input), { recebimento: newDate }), month, currentYear));
            }
            return months;
        }
        if (tipoLancamento === enums_1.ETipoOptions.recorrente) { //tratar recorrente
            for (let month = startMonth; month <= 12; month++) {
                months.push(this.buildMonth(input, month, currentYear));
            }
        }
        else if (tipoLancamento === enums_1.ETipoOptions.unicio) {
            months.push(this.buildMonth(input, startMonth, currentYear));
        }
        return months;
    }
}
exports.IncomeCreateRecurringMonthsStratregy = IncomeCreateRecurringMonthsStratregy;
