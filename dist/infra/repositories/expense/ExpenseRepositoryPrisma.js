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
exports.ExpenseRepositoryPrisma = void 0;
const uuid_1 = require("uuid");
class ExpenseRepositoryPrisma {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    static build(prismaClient) {
        return new ExpenseRepositoryPrisma(prismaClient);
    }
    // Criar a despesa principal e os meses associados
    create(expense, monthsData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!expense.customerId)
                throw new Error('Erro ao autenticar usuário');
            const expenseData = {
                id: (0, uuid_1.v4)(),
                nome: expense.nome,
                vencimento: expense.vencimento,
                tipoLancamento: expense.tipoLancamento,
                inicio: (_a = expense.range) === null || _a === void 0 ? void 0 : _a.inicio,
                fim: (_b = expense.range) === null || _b === void 0 ? void 0 : _b.fim,
                replicar: expense.replicar,
                customerId: expense.customerId,
            };
            if (!monthsData.length)
                throw new Error('Ocorreu um problema ao criar os meses');
            if (!expenseData.id)
                throw new Error('Não é possível criar os meses por conta de identificação.');
            const months = monthsData === null || monthsData === void 0 ? void 0 : monthsData.map((m) => ({
                id: (0, uuid_1.v4)(),
                mes: m.mes,
                ano: m.ano,
                valor: parseFloat(Number(m.valor).toFixed(2)),
                contaId: m.contaId,
                status: Number(m.status),
                despesaId: expenseData.id,
                descricao: m.descricao,
                customerId: m.customerId,
                vencimento: m.vencimento,
                observacao: m.observacao,
                categoria: m.categoria
            }));
            const isInvalidMonth = months === null || months === void 0 ? void 0 : months.map((mes) => mes.mes >= 13 || mes.mes <= 0).some((item) => item == true);
            if (isInvalidMonth)
                throw new Error('Mês incorreto');
            try {
                yield this.prismaClient.expenses.create({
                    data: expenseData
                });
                if (months) {
                    yield this.prismaClient.expensesMonths.createMany({
                        data: months
                    });
                }
            }
            catch (err) {
                console.log('Erro ao criar despesa:', err);
                throw new Error('Erro ao criar despesa');
            }
            return Object.assign(Object.assign({}, expenseData), { meses: months === null || months === void 0 ? void 0 : months.map((m) => (Object.assign(Object.assign({}, m), { valor: m.valor.toString(), status: m.status.toString() }))) });
        });
    }
    get(mes, ano, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!customerId)
                throw new Error('Erro ao autenticar usuário');
            const expenses = yield this.prismaClient.expenses.findMany({
                where: {
                    customerId,
                }
            });
            const months = yield this.prismaClient.expensesMonths.findMany({
                where: {
                    mes,
                    ano,
                    customerId,
                },
                select: {
                    id: true,
                    mes: true,
                    ano: true,
                    valor: true,
                    status: true,
                    descricao: true,
                    despesaId: true,
                    customerId: true,
                    vencimento: true,
                    observacao: true,
                    categoria: true,
                    contaId: true,
                },
            });
            const formattedExpenses = expenses.map((expense) => {
                const filteredMonths = months.filter((mes) => mes.despesaId === expense.id);
                const mappedMonths = filteredMonths.map((mes) => ({
                    id: mes.id,
                    mes: mes.mes,
                    despesaId: mes.despesaId,
                    ano: mes.ano,
                    contaId: mes.contaId,
                    valor: mes.valor.toString(),
                    status: mes.status.toString(),
                    descricao: mes.descricao,
                    customerId: mes.customerId,
                    vencimento: mes.vencimento,
                    observacao: mes.observacao,
                    categoria: mes.categoria,
                }));
                return Object.assign(Object.assign({}, expense), { meses: mappedMonths });
            });
            return formattedExpenses;
        });
    }
    // Editar uma despesa existente
    edit(expense) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!expense.customerId)
                throw new Error('Erro ao autenticar usuário');
            const existingExpense = yield this.prismaClient.expenses.findUnique({
                where: {
                    id: expense.despesaId
                },
            });
            if (!existingExpense) {
                throw new Error(`Despesa não encontrada para o mês ${expense.mes} e ano ${expense.ano}`);
            }
            yield this.prismaClient.expenses.update({
                where: { id: existingExpense.id },
                data: {
                    nome: expense.nome,
                    vencimento: expense.vencimento,
                    tipoLancamento: expense.tipoLancamento,
                    inicio: (_a = expense.range) === null || _a === void 0 ? void 0 : _a.inicio,
                    fim: (_b = expense.range) === null || _b === void 0 ? void 0 : _b.fim,
                    replicar: expense.replicar,
                },
            });
            yield this.editMonth(expense);
        });
    }
    // Editar um mês específico
    editMonth(mes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mes || mes.mes >= 13 || mes.mes <= 0)
                throw new Error('Mês incorreto');
            const existingExpenseMonth = yield this.prismaClient.expensesMonths.findUnique({
                where: {
                    id: mes.id,
                    mes: Number(mes.mes),
                },
            });
            if (!existingExpenseMonth) {
                throw new Error(`Despesa não encontrada para o mês ${mes.mes} e ano ${mes.ano}`);
            }
            const valor = parseFloat(Number(mes.valor).toFixed(2));
            yield this.prismaClient.expensesMonths.update({
                where: {
                    id: existingExpenseMonth.id,
                },
                data: {
                    valor: valor,
                    descricao: mes.descricao,
                    observacao: mes.observacao,
                    vencimento: mes.vencimento,
                    status: Number(mes.status),
                    categoria: mes.categoria,
                    ano: mes.ano,
                    mes: mes.mes,
                    contaId: mes.contaId
                },
            });
        });
    }
    editAll(expense, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!customerId)
                throw new Error('Erro ao autenticar usuário');
            const { id, nome, vencimento, replicar, meses, tipoLancamento, range } = expense;
            // Atualizar a despesa principal
            yield this.prismaClient.expenses.update({
                where: { id: id, customerId },
                data: {
                    nome,
                    tipoLancamento,
                    vencimento,
                    inicio: range === null || range === void 0 ? void 0 : range.inicio,
                    fim: range === null || range === void 0 ? void 0 : range.fim,
                    replicar,
                },
            });
            const isInvalidMonth = meses === null || meses === void 0 ? void 0 : meses.map((mes) => mes.mes >= 13 || mes.mes <= 0).some((item) => item == true);
            if (isInvalidMonth)
                throw new Error('Mes incorreto');
            if (meses && meses.length >= 1) {
                // Atualizar os meses associados à despesa
                for (const mes of meses) {
                    yield this.prismaClient.expensesMonths.updateMany({
                        where: {
                            despesaId: id,
                            customerId,
                            ano: mes.ano,
                            mes: mes.mes,
                        },
                        data: {
                            valor: parseFloat(Number(mes.valor).toFixed(2)),
                            status: Number(mes.status),
                            descricao: mes.descricao,
                            categoria: mes.categoria,
                            observacao: mes.observacao,
                            vencimento: mes.vencimento,
                        },
                    });
                }
            }
        });
    }
    // Deletar uma despesa ou um mês específico
    delete(customerId, id, mes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!customerId || !id)
                throw new Error('Houve um erro ao deletar');
            if (mes == 99) {
                yield this.prismaClient.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                    yield prisma.expensesMonths.deleteMany({
                        where: {
                            customerId: customerId,
                            despesaId: id,
                        },
                    });
                    yield prisma.expenses.delete({
                        where: {
                            customerId,
                            id,
                        },
                    });
                }));
            }
            else {
                yield this.prismaClient.expensesMonths.deleteMany({
                    where: {
                        customerId: customerId,
                        despesaId: id,
                        mes: mes,
                    },
                });
                const months = yield this.prismaClient.expensesMonths.findMany({
                    where: {
                        despesaId: id,
                    },
                    select: {
                        id: true,
                        mes: true,
                        ano: true,
                        valor: true,
                        status: true,
                        descricao: true,
                        despesaId: true,
                        customerId: true,
                        vencimento: true,
                        observacao: true,
                        categoria: true,
                        contaId: true,
                    },
                });
                if (months.length == 0) {
                    yield this.prismaClient.expenses.deleteMany({
                        where: {
                            customerId,
                            id: id,
                        },
                    });
                }
            }
        });
    }
}
exports.ExpenseRepositoryPrisma = ExpenseRepositoryPrisma;
