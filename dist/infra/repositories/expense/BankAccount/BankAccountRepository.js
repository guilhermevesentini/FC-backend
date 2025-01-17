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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountRepositoryPrisma = void 0;
const uuid_1 = require("uuid");
class BankAccountRepositoryPrisma {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    static build(prismaClient) {
        return new BankAccountRepositoryPrisma(prismaClient);
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.contaPrincipal) {
                yield this.prismaClient.bankAccount.updateMany({
                    where: {
                        customerId: input.customerId,
                        contaPrincipal: true
                    },
                    data: { contaPrincipal: false }
                });
            }
            const account = yield this.prismaClient.bankAccount.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    agencia: input.agencia,
                    conta: input.conta,
                    nome: input.nome,
                    banco: input.banco,
                    nomeBanco: input.nomeBanco,
                    contaPrincipal: input.contaPrincipal,
                    saldo: input.saldo,
                    customerId: input.customerId
                }
            });
            return account;
        });
    }
    get(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.prismaClient.bankAccount.findMany({
                where: {
                    customerId: input.customerId
                }
            });
            return account;
        });
    }
    delete(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.expensesMonths.updateMany({
                where: {
                    customerId: input.customerId,
                    id: input.id, // Filtra as despesas pela conta a ser deletada
                },
                data: {
                    contaId: '',
                },
            });
            yield this.prismaClient.incomeMonths.updateMany({
                where: {
                    customerId: input.customerId,
                    id: input.id,
                },
                data: {
                    contaId: '',
                },
            });
            yield this.prismaClient.bankAccount.delete({
                where: {
                    customerId: input.customerId,
                    id: input.id
                }
            });
        });
    }
}
exports.BankAccountRepositoryPrisma = BankAccountRepositoryPrisma;
