"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
class Expense {
    constructor(props) {
        this.props = props;
    }
    static create(input) {
        var _a, _b;
        if (!input.nome) {
            throw new Error("Nome é obrigatório.");
        }
        const props = {
            id: input.id,
            nome: input.nome,
            vencimento: input.vencimento,
            replicar: input.replicar,
            customerId: input.customerId,
            tipoLancamento: input.tipoLancamento,
            range: {
                inicio: ((_a = input.range) === null || _a === void 0 ? void 0 : _a.inicio) || undefined,
                fim: ((_b = input.range) === null || _b === void 0 ? void 0 : _b.fim) || undefined
            },
            meses: input.meses
        };
        return props;
    }
    static with(props) {
        return props;
    }
    get expense() {
        return this.props;
    }
}
exports.Expense = Expense;
