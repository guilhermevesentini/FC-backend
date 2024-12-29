"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    constructor(props) {
        this.props = props;
    }
    static create(input) {
        const props = {
            agencia: input.agencia,
            conta: input.conta,
            nome: input.nome,
            banco: input.banco,
            nomeBanco: input.nomeBanco,
            contaPrincipal: input.contaPrincipal,
            saldo: input.saldo,
            id: input.id,
            customerId: input.customerId
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
exports.BankAccount = BankAccount;
