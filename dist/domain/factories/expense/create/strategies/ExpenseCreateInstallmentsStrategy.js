"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseCreateInstallmentstrategy = void 0;
class ExpenseCreateInstallmentstrategy {
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
        const months = [];
        if (!Array.isArray(input.range)) {
            throw Error('Obrigatório selecionar o range');
        }
        const startDate = new Date(input.range[0]);
        const endDate = new Date(input.range[1]);
        const firstMonth = startDate.getMonth() + 1;
        const endMonth = endDate.getMonth() + 1;
        const currentYear = startDate.getFullYear();
        for (let month = firstMonth; month <= endMonth; month++) {
            const day = startDate.getUTCDate();
            const newDate = new Date(currentYear, month - 1, day);
            months.push(this.buildMonth(Object.assign(Object.assign({}, input), { vencimento: newDate }), month, currentYear));
        }
        return months;
    }
}
exports.ExpenseCreateInstallmentstrategy = ExpenseCreateInstallmentstrategy;
