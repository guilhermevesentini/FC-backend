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
exports.IncomeRepositoryPrisma = void 0;
const uuid_1 = require("uuid");
class IncomeRepositoryPrisma {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    static build(prismaClient) {
        return new IncomeRepositoryPrisma(prismaClient);
    }
    create(income) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const incomeData = {
                id: (0, uuid_1.v4)(),
                nome: income.nome,
                recebimento: income.recebimento,
                tipoLancamento: income.tipoLancamento,
                inicio: (_a = income.range) === null || _a === void 0 ? void 0 : _a.inicio,
                fim: (_b = income.range) === null || _b === void 0 ? void 0 : _b.fim,
                replicar: income.replicar,
                customerId: income.customerId,
            };
            const months = (_c = income.meses) === null || _c === void 0 ? void 0 : _c.map((m) => ({
                id: (0, uuid_1.v4)(),
                mes: m.mes,
                ano: m.ano,
                valor: parseFloat(Number(m.valor).toFixed(2)),
                status: Number(m.status),
                incomeId: incomeData.id,
                contaId: m.contaId,
                descricao: m.descricao,
                customerId: m.customerId,
                recebimento: m.recebimento,
                observacao: m.observacao,
                categoria: m.categoria
            }));
            yield this.prismaClient.incomes.create({
                data: incomeData
            });
            if (months) {
                yield this.prismaClient.incomeMonths.createMany({
                    data: months
                });
            }
        });
    }
    get(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(input.ano, input.mes - 1, 1);
            const endDate = new Date(input.ano, input.mes, 0);
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                console.error("Data inválida:", startDate, endDate);
                throw new Error("Data inválida fornecida.");
            }
            const incomes = yield this.prismaClient.incomes.findMany({
                where: {
                    customerId: input.customerId
                }
            });
            const months = yield this.prismaClient.incomeMonths.findMany({
                where: {
                    mes: input.mes,
                    ano: input.ano,
                    customerId: input.customerId,
                },
                select: {
                    id: true,
                    mes: true,
                    ano: true,
                    valor: true,
                    status: true,
                    descricao: true,
                    incomeId: true,
                    customerId: true,
                    recebimento: true,
                    observacao: true,
                    categoria: true,
                    contaId: true
                },
            });
            const formattedIncomes = incomes.map((income) => (Object.assign(Object.assign({}, income), { meses: months.map((mes) => {
                    return {
                        id: mes.id,
                        mes: mes.mes,
                        incomeId: mes.incomeId,
                        ano: mes.ano,
                        valor: mes.valor.toString(),
                        status: mes.status.toString(),
                        descricao: mes.descricao,
                        customerId: mes.customerId,
                        recebimento: mes.recebimento,
                        observacao: mes.observacao,
                        categoria: mes.categoria,
                        contaId: mes.contaId
                    };
                }) })));
            return formattedIncomes;
        });
    }
    edit(income) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const existingIncome = yield this.prismaClient.incomes.findUnique({
                where: {
                    id: income.incomeId
                },
            });
            if (!existingIncome) {
                throw new Error(`Receita não encontrada para o mês ${income.mes} e ano ${income.ano}`);
            }
            yield this.prismaClient.incomes.update({
                where: { id: existingIncome.id },
                data: {
                    nome: income.nome,
                    recebimento: income.recebimento,
                    tipoLancamento: income.tipoLancamento,
                    inicio: (_a = income.range) === null || _a === void 0 ? void 0 : _a.inicio,
                    fim: (_b = income.range) === null || _b === void 0 ? void 0 : _b.fim,
                    replicar: income.replicar,
                },
            });
            yield this.editMonth(income);
        });
    }
    editMonth(mes) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingIncomeMonth = yield this.prismaClient.incomeMonths.findUnique({
                where: {
                    id: mes.id,
                    mes: Number(mes.mes)
                },
            });
            if (!existingIncomeMonth) {
                throw new Error(`Receita não encontrada para o mês ${mes.mes} e ano ${mes.ano}`);
            }
            const valor = parseFloat(Number(mes.valor).toFixed(2));
            yield this.prismaClient.incomeMonths.update({
                where: {
                    id: existingIncomeMonth.id,
                },
                data: {
                    valor: valor,
                    descricao: mes.descricao,
                    observacao: mes.observacao,
                    recebimento: mes.recebimento,
                    status: Number(mes.status),
                    categoria: mes.categoria,
                    ano: mes.ano,
                    mes: mes.mes,
                    contaId: mes.contaId
                },
            });
        });
    }
    delete(customerId, id, mes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mes) {
                yield this.prismaClient.incomeMonths.deleteMany({
                    where: {
                        customerId: customerId,
                        incomeId: id,
                        mes: mes,
                    },
                });
            }
            else {
                yield this.prismaClient.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                    yield prisma.incomeMonths.deleteMany({
                        where: {
                            customerId: customerId,
                            incomeId: id,
                        },
                    });
                    yield prisma.incomes.delete({
                        where: {
                            customerId,
                            id,
                        },
                    });
                }));
            }
        });
    }
}
exports.IncomeRepositoryPrisma = IncomeRepositoryPrisma;
